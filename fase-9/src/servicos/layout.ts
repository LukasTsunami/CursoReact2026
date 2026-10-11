import type { GlobalLayoutData } from "../tipos";

export async function buscarLayout(teatroId?: string): Promise<GlobalLayoutData> {
  const url = teatroId ? `/api/layout?teatroId=${teatroId}` : "/api/layout";
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Falha ao carregar o layout do teatro");
  }

  return (await resposta.json()) as GlobalLayoutData;
}
