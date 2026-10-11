import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Configurado desde a fase-0, mas só iniciado (`worker.start()`) a partir
// da fase-5 — mesmo padrão adotado para o React Router nesta feature.
export const worker = setupWorker(...handlers);
