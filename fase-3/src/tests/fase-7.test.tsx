import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import layoutClassicoJson from "../dados/layout-classico.json";
import App from "../App";
import type { GlobalLayoutData } from "../tipos";

const layoutClassico = layoutClassicoJson as GlobalLayoutData;

const server = setupServer(
  http.get("/api/layout", () => HttpResponse.json(layoutClassico)),
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

describe("fase-7: adicionar poltronas ao carrinho e ver resumo", () => {
  it("abre o carrinho com os itens selecionados e o total correto", async () => {
    const user = userEvent.setup();
    abrirPaginaDoTeatro();

    await screen.findByRole("img", { name: /teatro municipal de são paulo/i });
    await user.click(
      screen.getByRole("button", { name: "Poltrona A101, disponível" }),
    );
    await user.click(screen.getByRole("button", { name: "Comprar" }));

    const modal = await screen.findByRole("dialog", { name: /carrinho/i });
    expect(
      within(modal).getByText("Plateia Esquerdo · A101 · R$ 120,00"),
    ).toBeInTheDocument();
    expect(within(modal).getByText("Total: R$ 120,00")).toBeInTheDocument();
  });

  it("recalcula o total ao marcar um item do carrinho como meia-entrada", async () => {
    const user = userEvent.setup();
    abrirPaginaDoTeatro();

    await screen.findByRole("img", { name: /teatro municipal de são paulo/i });
    await user.click(
      screen.getByRole("button", { name: "Poltrona A101, disponível" }),
    );
    await user.click(screen.getByRole("button", { name: "Comprar" }));

    const modal = await screen.findByRole("dialog", { name: /carrinho/i });
    await user.click(
      within(modal).getByRole("checkbox", { name: /meia-entrada/i }),
    );

    expect(within(modal).getByText("Total: R$ 60,00")).toBeInTheDocument();
  });
});
