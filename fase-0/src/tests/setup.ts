import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// Sem `test.globals` no vite.config.ts, a limpeza automática de
// @testing-library/react não é registrada sozinha — cada teste precisa
// desmontar o componente renderizado antes do próximo começar.
afterEach(() => {
  cleanup();
});
