import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../App";

const abrirPaginaDoTeatro = () =>
  render(
    <MemoryRouter initialEntries={["/teatros/teatro-municipal-de-sao-paulo"]}>
      <App />
    </MemoryRouter>,
  );

describe("fase-2: visualizar o mapa do teatro", () => {
  it("renderiza a foto de fundo do teatro", async () => {
    abrirPaginaDoTeatro();

    expect(
      await screen.findByRole("img", {
        name: /teatro municipal de são paulo/i,
      }),
    ).toBeInTheDocument();
  });

  it("renderiza uma poltrona clicável para cada assento do layout (650 no total)", async () => {
    abrirPaginaDoTeatro();

    const poltronas = await screen.findAllByRole("button", {
      name: /^Poltrona/,
    });
    expect(poltronas).toHaveLength(650);
  });

  it("distingue visualmente poltronas de acessibilidade e poltronas indisponíveis", async () => {
    abrirPaginaDoTeatro();

    expect(
      await screen.findByRole("button", {
        name: "Poltrona A100, disponível, acessível",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Poltrona A102, ocupada" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Poltrona A104, quebrada" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Poltrona C153, bloqueada" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Poltrona C155, reservada" }),
    ).toBeInTheDocument();
  });
});
