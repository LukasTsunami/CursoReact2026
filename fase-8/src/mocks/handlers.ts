import { http, HttpResponse } from "msw";
import layoutClassicoJson from "../dados/layout-classico.json";
import layoutRedondoJson from "../dados/layout-redondo.json";
import type { GlobalLayoutData } from "../tipos";

const layoutClassico = layoutClassicoJson as GlobalLayoutData;
const layoutRedondo = layoutRedondoJson as GlobalLayoutData;

const layoutsPorTeatroId: Record<string, GlobalLayoutData> = {
  [layoutClassico.teatroId]: layoutClassico,
  [layoutRedondo.teatroId]: layoutRedondo,
};

// Simula outros compradores reservando poltronas entre uma chamada de
// polling e outra. Determinístico (baseado no número da chamada, nunca em
// Math.random()) para não deixar os testes de fase-6 instáveis.
let chamadasPorTeatro = new Map<string, number>();

// Usado só nos testes (ver src/tests/setup.ts, `afterEach`): sem isso, o
// contador de chamadas continuaria subindo de um teste para o outro
// dentro do mesmo arquivo, e a simulação acabaria mexendo em poltronas
// que outro teste não esperava que mudassem de status.
export function resetSimulacaoDeCompradores() {
  chamadasPorTeatro = new Map<string, number>();
}

function comOutrosCompradores(layout: GlobalLayoutData): GlobalLayoutData {
  const chamada = (chamadasPorTeatro.get(layout.teatroId) ?? 0) + 1;
  chamadasPorTeatro.set(layout.teatroId, chamada);

  if (chamada <= 1) {
    return layout;
  }

  const copia: GlobalLayoutData = JSON.parse(JSON.stringify(layout));
  let indice = 0;
  for (const setor of copia.setores) {
    for (const fileira of setor.fileiras) {
      for (const assento of fileira.assentos) {
        if (assento.status === "disponivel") {
          indice += 1;
          if (indice % 7 === chamada % 7) {
            assento.status = "ocupado";
          }
        }
      }
    }
  }
  return copia;
}

export const handlers = [
  http.get("/api/layout", ({ request }) => {
    const url = new URL(request.url);
    const teatroId = url.searchParams.get("teatroId");
    const layout = (teatroId !== null && layoutsPorTeatroId[teatroId]) || layoutClassico;
    return HttpResponse.json(comOutrosCompradores(layout));
  }),

  http.post("/api/pedidos", async ({ request }) => {
    const corpo = await request.json();
    return HttpResponse.json(
      {
        id: "pedido-001",
        criadoEm: new Date().toISOString(),
        ...(typeof corpo === "object" && corpo !== null ? corpo : {}),
      },
      { status: 201 },
    );
  }),
];
