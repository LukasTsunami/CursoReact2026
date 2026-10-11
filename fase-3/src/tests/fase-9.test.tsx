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
  http.post("/api/pedidos", async ({ request }) => {
    const corpo = await request.json();
    return HttpResponse.json(
      {
        id: "pedido-001",
        criadoEm: new Date().toISOString(),
        ...(corpo as object),
      },
      { status: 201 },
    );
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

async function chegarNoCheckout(user: ReturnType<typeof userEvent.setup>) {
  abrirPaginaDoTeatro();
  await screen.findByRole("img", { name: /teatro municipal de são paulo/i });
  await user.click(
    screen.getByRole("button", { name: "Poltrona A101, disponível" }),
  );
  await user.click(screen.getByRole("button", { name: "Comprar" }));
  const modal = await screen.findByRole("dialog", { name: /carrinho/i });
  await user.click(
    within(modal).getByRole("link", { name: /finalizar compra/i }),
  );
  await screen.findByRole("heading", { name: /checkout/i });
}

async function preencherFormularioValido(
  user: ReturnType<typeof userEvent.setup>,
) {
  await user.type(screen.getByLabelText("Nome"), "Maria Silva");
  await user.type(screen.getByLabelText("E-mail"), "maria@example.com");
  await user.type(screen.getByLabelText("CPF"), "12345678900");
  await user.type(screen.getByLabelText("CEP"), "01310-100");
  await user.type(screen.getByLabelText("Logradouro"), "Avenida Paulista");
  await user.type(screen.getByLabelText("Número"), "1000");
  await user.type(screen.getByLabelText("Cidade"), "São Paulo");
  await user.type(screen.getByLabelText("Estado"), "SP");
  await user.selectOptions(screen.getByLabelText("Forma de pagamento"), "Pix");
}

describe("fase-9: concluir a compra (checkout)", () => {
  it("mostra um erro específico e bloqueia o envio quando um campo é inválido", async () => {
    const user = userEvent.setup();
    await chegarNoCheckout(user);
    await preencherFormularioValido(user);

    await user.clear(screen.getByLabelText("E-mail"));
    await user.type(screen.getByLabelText("E-mail"), "nao-e-um-email");
    await user.click(screen.getByRole("button", { name: "Confirmar pedido" }));

    expect(await screen.findByText("E-mail inválido")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /pedido confirmado/i }),
    ).not.toBeInTheDocument();
  });

  it("confirma o pedido e mostra o resumo da compra quando todos os campos são válidos", async () => {
    const user = userEvent.setup();
    await chegarNoCheckout(user);
    await preencherFormularioValido(user);

    await user.click(screen.getByRole("button", { name: "Confirmar pedido" }));

    expect(
      await screen.findByRole("heading", { name: /pedido confirmado/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/meus ingressos/i)).toBeInTheDocument();
    expect(screen.getByText(/plateia esquerdo · a2/i)).toBeInTheDocument();
  });
});
