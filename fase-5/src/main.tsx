import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { worker } from "./mocks/browser.ts";
import "./index.css";

// Este projeto não tem backend real — o MSW simula toda a API, inclusive
// no que seria "produção" (não há nada real para apontar). Por isso o
// worker é sempre iniciado, e a árvore React só monta depois dele estar
// pronto, para nenhum fetch inicial escapar sem ser interceptado.
async function habilitarMocks() {
  await worker.start({ onUnhandledRequest: "bypass" });
}

habilitarMocks().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
