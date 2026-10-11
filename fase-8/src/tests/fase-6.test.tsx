import { fireEvent, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import layoutClassicoJson from "../dados/layout-classico.json";
import App from "../App";
import { server } from "./setup";
import type { GlobalLayoutData } from "../tipos";

const layoutClassico = layoutClassicoJson as GlobalLayoutData;

function clonarComA101Ocupado(): GlobalLayoutData {
  const copia: GlobalLayoutData = JSON.parse(JSON.stringify(layoutClassico));
  copia.setores.find((s) => s.id === "plateia-esquerdo")!.fileiras.find((f) => f.nome === "A")!.assentos[1].status = "ocupado";
  return copia;
}

afterEach(() => {
  vi.useRealTimers();
});

const abrirPaginaDoTeatro = () =>
  render(
    <MemoryRouter initialEntries={["/teatros/teatro-municipal-de-sao-paulo"]}>
      <App />
    </MemoryRouter>,
  );

// O `fetch` via MSW passa por mais de um "tick" de microtask antes de
// resolver; um único `advanceTimersByTimeAsync(0)` às vezes não é
// suficiente para o React re-renderizar com o resultado.
async function esperarPromessasPendentes() {
  for (let i = 0; i < 5; i += 1) {
    await vi.advanceTimersByTimeAsync(0);
  }
}

describe("fase-6: ser avisado em tempo real sobre mudanças de disponibilidade", () => {
  it("atualiza a disponibilidade das poltronas automaticamente após o intervalo de polling", async () => {
    let numeroDaChamada = 0;
    server.use(
      http.get("/api/layout", () => {
        numeroDaChamada += 1;
        return HttpResponse.json(
          numeroDaChamada === 1 ? layoutClassico : clonarComA101Ocupado(),
        );
      }),
    );

    vi.useFakeTimers();
    abrirPaginaDoTeatro();
    await esperarPromessasPendentes();

    expect(
      screen.getByRole("button", { name: "Poltrona A101, disponível" }),
    ).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(5000);
    await esperarPromessasPendentes();

    expect(
      screen.getByRole("button", { name: "Poltrona A101, ocupada" }),
    ).toBeInTheDocument();
  });

  it("remove da seleção uma poltrona que ficou indisponível antes da compra, avisando o usuário", async () => {
    let numeroDaChamada = 0;
    server.use(
      http.get("/api/layout", () => {
        numeroDaChamada += 1;
        return HttpResponse.json(
          numeroDaChamada === 1 ? layoutClassico : clonarComA101Ocupado(),
        );
      }),
    );

    vi.useFakeTimers();
    abrirPaginaDoTeatro();
    await esperarPromessasPendentes();

    fireEvent.click(
      screen.getByRole("button", { name: "Poltrona A101, disponível" }),
    );
    expect(screen.getByText("Poltronas selecionadas: 1")).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(5000);
    await esperarPromessasPendentes();

    expect(screen.getByText("Poltronas selecionadas: 0")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A poltrona A101 não está mais disponível e foi removida da sua seleção.",
      ),
    ).toBeInTheDocument();
  });
});
