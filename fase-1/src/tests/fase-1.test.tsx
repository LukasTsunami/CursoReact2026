import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("fase-1: navegar da tela inicial até um teatro", () => {
  it("mostra a chamada principal 'Reserve seu assento' na tela inicial", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /reserve seu assento/i }),
    ).toBeInTheDocument();
  });

  it("mostra as seções de Prova Social e Selos de Confiança na tela inicial", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /prova social/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /selos de confiança/i }),
    ).toBeInTheDocument();
  });

  it("mostra a grade com os tipos de espetáculo (ópera, teatro, dança, apresentação musical)", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("img", { name: "Ópera" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Teatro" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Dança" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Apresentação Musical" }),
    ).toBeInTheDocument();
  });

  it("leva o visitante até a listagem de teatros pelo menu", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    const cabecalho = screen.getByRole("banner");
    await user.click(within(cabecalho).getByRole("link", { name: /teatros/i }));

    expect(
      await screen.findByRole("link", {
        name: /teatro municipal de são paulo/i,
      }),
    ).toBeInTheDocument();
  });

  it("lista um cartão por teatro, com título, descrição e nota", async () => {
    render(
      <MemoryRouter initialEntries={["/teatros"]}>
        <App />
      </MemoryRouter>,
    );

    const cartao = await screen.findByRole("link", {
      name: /teatro municipal de são paulo/i,
    });

    expect(
      within(cartao).getByText(/palco de ópera, balé e concertos/i),
    ).toBeInTheDocument();
    expect(within(cartao).getByText("4.7 ★")).toBeInTheDocument();

    // os outros 3 teatros de exemplo também aparecem na listagem
    expect(
      screen.getByRole("link", { name: /teatro amazonas/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /teatro municipal do rio de janeiro/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /teatro castro alves/i }),
    ).toBeInTheDocument();
  });

  it("ao clicar num teatro da listagem, navega até a página daquele teatro", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/teatros"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      await screen.findByRole("link", {
        name: /teatro municipal de são paulo/i,
      }),
    );

    // a listagem não aparece mais — chegamos numa página diferente
    expect(
      screen.queryByRole("link", { name: /teatro amazonas/i }),
    ).not.toBeInTheDocument();
  });
});
