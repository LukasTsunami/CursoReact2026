import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
import { handlers, resetSimulacaoDeCompradores } from "../mocks/handlers";
import "@testing-library/jest-dom/vitest";

// Sem `test.globals` no vite.config.ts, a limpeza automática de
// @testing-library/react não é registrada sozinha — cada teste precisa
// desmontar o componente renderizado antes do próximo começar.
afterEach(() => {
  cleanup();
});

// Servidor MSW global (a partir da fase-5, quando PaginaTeatro passa a
// buscar dados via `fetch`) — os mesmos handlers de src/mocks/handlers.ts
// usados no navegador. Testes que precisam de um cenário diferente (erro,
// outro teatro) importam `server` daqui e usam `server.use(...)` só para
// aquele teste.
export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  resetSimulacaoDeCompradores();
});
afterAll(() => {
  server.close();
});
