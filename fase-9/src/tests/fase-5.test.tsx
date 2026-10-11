import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../App";
import { server } from "./setup";

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
    ).toHaveLength(5);
  });
});
