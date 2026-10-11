import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
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
  vi.useRealTimers();
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

async function selecionarESolicitarCompra(
  user: ReturnType<typeof userEvent.setup>,
) {
  await screen.findByRole("img", { name: /teatro municipal de são paulo/i });
  await user.click(
    screen.getByRole("button", { name: "Poltrona A101, disponível" }),
  );
  await user.click(screen.getByRole("button", { name: "Comprar" }));
  return screen.findByRole("dialog", { name: /carrinho/i });
}

describe("fase-8: reserva com prazo e navegação entre páginas", () => {
  it("mostra uma contagem regressiva do prazo de reserva", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    abrirPaginaDoTeatro();
    await vi.advanceTimersByTimeAsync(0);

    const modal = await selecionarESolicitarCompra(user);

    expect(within(modal).getByText(/Expira em 5:00/)).toBeInTheDocument();
  });

  it("libera as poltronas quando o prazo de reserva expira", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    abrirPaginaDoTeatro();
    await vi.advanceTimersByTimeAsync(0);

    await selecionarESolicitarCompra(user);
    await vi.advanceTimersByTimeAsync(5 * 60 * 1000);

    expect(
      screen.queryByRole("dialog", { name: /carrinho/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Poltrona A101, disponível" }),
    ).toBeInTheDocument();
  });

  it("mantém os itens do carrinho ao navegar da tela do teatro para o checkout", async () => {
    const user = userEvent.setup();
    abrirPaginaDoTeatro();

    const modal = await selecionarESolicitarCompra(user);
    await user.click(
      within(modal).getByRole("link", { name: /finalizar compra/i }),
    );

    expect(
      await screen.findByRole("heading", { name: /checkout/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Total: R$ 120,00")).toBeInTheDocument();
  });
});
