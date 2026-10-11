import { http, HttpResponse } from "msw";
import layoutClassicoJson from "../dados/layout-classico.json";
import type { GlobalLayoutData } from "../tipos";

// Ainda não chamado pela UI (a partir da fase-0) — só passa a ser usado
// de fato a partir da fase-5 (ver contracts/api-mock.md).
const layoutClassico = layoutClassicoJson as GlobalLayoutData;

export const handlers = [
  http.get("/api/layout", () => {
    return HttpResponse.json(layoutClassico);
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
