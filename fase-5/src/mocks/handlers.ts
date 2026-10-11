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

export const handlers = [
  http.get("/api/layout", ({ request }) => {
    const url = new URL(request.url);
    const teatroId = url.searchParams.get("teatroId");
    const layout = (teatroId !== null && layoutsPorTeatroId[teatroId]) || layoutClassico;
    return HttpResponse.json(layout);
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
