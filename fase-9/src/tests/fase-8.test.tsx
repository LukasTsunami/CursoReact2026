import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";

afterEach(() => {
  vi.useRealTimers();
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

// O `fetch` via MSW passa por mais de um "tick" de microtask antes de
// resolver; um único `advanceTimersByTimeAsync(0)` às vezes não é
// suficiente para o React re-renderizar com o resultado.
async function esperarPromessasPendentes() {
  for (let i = 0; i < 5; i += 1) {
    await vi.advanceTimersByTimeAsync(0);
  }
}

describe("fase-8: reserva com prazo e navegação entre páginas", () => {
  it("mostra uma contagem regressiva do prazo de reserva", async () => {
    const user = userEvent.setup();
    abrirPaginaDoTeatro();
    const modal = await selecionarESolicitarCompra(user);

    expect(within(modal).getByText(/Expira em 5:00/)).toBeInTheDocument();
  });

  it("libera as poltronas quando o prazo de reserva expira", async () => {
    // `vi.useFakeTimers()` precisa estar ativo antes de qualquer efeito
    // registrar seu `setInterval` (carregamento inicial e o holdTimer da
    // modal) — senão avançar o relógio falso não afeta timers reais.
    vi.useFakeTimers();
    abrirPaginaDoTeatro();
    await esperarPromessasPendentes();

    fireEvent.click(
      screen.getByRole("button", { name: "Poltrona A101, disponível" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Comprar" }));

    expect(
      screen.getByRole("dialog", { name: /carrinho/i }),
    ).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(5 * 60 * 1000);
    await esperarPromessasPendentes();

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
