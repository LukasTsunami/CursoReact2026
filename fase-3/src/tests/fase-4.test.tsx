import { render, screen, within } from "@testing-library/react";
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

async function clicaEConfirmaQueNaoSeleciona(nomeAcessivel: string) {
  const user = userEvent.setup();
  await user.click(await screen.findByRole("button", { name: nomeAcessivel }));

  expect(
    screen.getByRole("button", { name: nomeAcessivel }),
  ).toBeInTheDocument();
  expect(screen.getByText("Poltronas selecionadas: 0")).toBeInTheDocument();
}

describe("fase-4: respeitar regras de disponibilidade e acesso", () => {
  it("não permite selecionar poltrona ocupada", async () => {
    abrirPaginaDoTeatro();
    await clicaEConfirmaQueNaoSeleciona("Poltrona A102, ocupada");
  });

  it("não permite selecionar poltrona bloqueada", async () => {
    abrirPaginaDoTeatro();
    await clicaEConfirmaQueNaoSeleciona("Poltrona C153, bloqueada");
  });

  it("não permite selecionar poltrona quebrada", async () => {
    abrirPaginaDoTeatro();
    await clicaEConfirmaQueNaoSeleciona("Poltrona A104, quebrada");
  });

  it("não permite selecionar poltrona reservada individualmente", async () => {
    abrirPaginaDoTeatro();
    await clicaEConfirmaQueNaoSeleciona("Poltrona C155, reservada");
  });

  it("não permite selecionar nenhuma poltrona de uma fileira reservada para convidados especiais", async () => {
    abrirPaginaDoTeatro();
    await clicaEConfirmaQueNaoSeleciona("Poltrona B100, disponível");
  });

  it("não permite selecionar nenhuma poltrona de uma fileira em manutenção", async () => {
    abrirPaginaDoTeatro();
    await clicaEConfirmaQueNaoSeleciona("Poltrona D150, disponível");
  });

  it("não permite selecionar nenhuma poltrona de um setor embargado", async () => {
    abrirPaginaDoTeatro();
    await clicaEConfirmaQueNaoSeleciona("Poltrona E550, disponível");
  });

  it("permite selecionar uma poltrona de acessibilidade normalmente, mantendo sua marcação própria", async () => {
    const user = userEvent.setup();
    abrirPaginaDoTeatro();

    await user.click(
      await screen.findByRole("button", {
        name: "Poltrona A100, disponível, acessível",
      }),
    );

    expect(
      await screen.findByRole("button", {
        name: "Poltrona A100, disponível, acessível, selecionada",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Poltronas selecionadas: 1")).toBeInTheDocument();
  });

  it("mostra o tipo de acesso de cada setor numa legenda", async () => {
    abrirPaginaDoTeatro();

    const legenda = await screen.findByRole("region", { name: /legenda/i });
    expect(within(legenda).getByText("Livre")).toBeInTheDocument();
    expect(within(legenda).getByText("Pagante")).toBeInTheDocument();
    expect(within(legenda).getByText("Exclusivo Bradesco")).toBeInTheDocument();
  });
});
