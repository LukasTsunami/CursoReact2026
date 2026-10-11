import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../App";

const abrirPaginaDoTeatro = () =>
  render(
    <MemoryRouter initialEntries={["/teatros/teatro-municipal-de-sao-paulo"]}>
      <App />
    </MemoryRouter>,
  );

describe("fase-3: selecionar poltronas disponíveis", () => {
  it("inicia sem nenhuma poltrona selecionada", async () => {
    abrirPaginaDoTeatro();

    expect(
      await screen.findByText("Poltronas selecionadas: 0"),
    ).toBeInTheDocument();
  });

  it("seleciona uma poltrona disponível ao clicar nela", async () => {
    const user = userEvent.setup();
    abrirPaginaDoTeatro();

    const poltrona = await screen.findByRole("button", {
      name: "Poltrona A100, disponível, acessível",
    });
    await user.click(poltrona);

    expect(
      await screen.findByRole("button", {
        name: "Poltrona A100, disponível, acessível, selecionada",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Poltronas selecionadas: 1")).toBeInTheDocument();
  });

  it("desmarca a poltrona ao clicar nela novamente", async () => {
    const user = userEvent.setup();
    abrirPaginaDoTeatro();

    const poltrona = await screen.findByRole("button", {
      name: "Poltrona A100, disponível, acessível",
    });
    await user.click(poltrona);
    await user.click(
      await screen.findByRole("button", {
        name: "Poltrona A100, disponível, acessível, selecionada",
      }),
    );

    expect(
      await screen.findByRole("button", {
        name: "Poltrona A100, disponível, acessível",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Poltronas selecionadas: 0")).toBeInTheDocument();
  });

  it("mostra número, preço e detalhes da poltrona ao selecioná-la", async () => {
    const user = userEvent.setup();
    abrirPaginaDoTeatro();

    const poltrona = await screen.findByRole("button", {
      name: "Poltrona A100, disponível, acessível",
    });
    await user.click(poltrona);

    expect(
      await screen.findByText(
        "Poltrona A100 — R$ 120,00 — disponível, acessível",
      ),
    ).toBeInTheDocument();
  });
});
