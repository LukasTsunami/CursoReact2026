import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import layoutClassicoJson from "../dados/layout-classico.json";
import App from "../App";
import type { GlobalLayoutData } from "../tipos";

const layoutClassico = layoutClassicoJson as GlobalLayoutData;

// Fixture pequena só para este teste comprovar que trocar de teatro troca o
// mapa exibido — o fixture completo do teatro redondo é criado na fase-5.
const layoutAmazonasDeTeste: GlobalLayoutData = {
  teatroId: "teatro-amazonas",
  nome: "Teatro Amazonas",
  descricao:
    "Ícone da Belle Époque no coração da floresta, sede do Festival Amazonas de Ópera.",
  nota: 4.6,
  formato: "redondo",
  cadeirasEstofadas: true,
  imagemUrl: "/assets/teatro-amazonas.png",
  setores: [
    {
      id: "plateia-unica",
      nome: "Plateia Única",
      embargado: false,
      tipoAcesso: "livre",
      fileiras: [
        {
          id: "plateia-unica-fila-a",
          nome: "A",
          reservada: false,
          emManutencao: false,
          assentos: [
            {
              numero: 1,
              preco: 80,
              acessibilidade: false,
              status: "disponivel",
              coordinateX: 40,
              coordinateY: 50,
              largura: 3,
              altura: 2,
              rotacao: 0,
            },
            {
              numero: 2,
              preco: 80,
              acessibilidade: false,
              status: "disponivel",
              coordinateX: 50,
              coordinateY: 50,
              largura: 3,
              altura: 2,
              rotacao: 0,
            },
            {
              numero: 3,
              preco: 80,
              acessibilidade: false,
              status: "disponivel",
              coordinateX: 60,
              coordinateY: 50,
              largura: 3,
              altura: 2,
              rotacao: 0,
            },
          ],
        },
      ],
    },
  ],
};

const server = setupServer(
  http.get("/api/layout", ({ request }) => {
    const url = new URL(request.url);
    const teatroId = url.searchParams.get("teatroId");
    if (teatroId === "teatro-amazonas") {
      return HttpResponse.json(layoutAmazonasDeTeste);
    }
    return HttpResponse.json(layoutClassico);
  }),
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

const abrirPaginaDoTeatro = () =>
  render(
    <MemoryRouter initialEntries={["/teatros/teatro-municipal-de-sao-paulo"]}>
      <App />
    </MemoryRouter>,
  );

describe("fase-5: carregar dados dinamicamente e trocar de teatro", () => {
  it("mostra um indicador de carregamento enquanto os dados não chegaram", () => {
    abrirPaginaDoTeatro();

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it("mostra uma mensagem de erro quando a busca do layout falha", async () => {
    server.use(
      http.get("/api/layout", () => {
        return HttpResponse.json(
          { mensagem: "Falha ao carregar o layout do teatro" },
          { status: 500 },
        );
      }),
    );

    abrirPaginaDoTeatro();

    expect(
      await screen.findByText("Falha ao carregar o layout do teatro"),
    ).toBeInTheDocument();
  });

  it("permite trocar de teatro e atualizar o mapa exibido", async () => {
    const user = userEvent.setup();
    abrirPaginaDoTeatro();

    await screen.findByRole("img", { name: /teatro municipal de são paulo/i });

    await user.selectOptions(
      screen.getByRole("combobox", { name: /escolher teatro/i }),
      "Teatro Amazonas",
    );

    expect(
      await screen.findByRole("img", { name: /teatro amazonas/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findAllByRole("button", { name: /^Poltrona/ }),
    ).toHaveLength(3);
  });
});
