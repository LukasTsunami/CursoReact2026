# Playbook: MSW (Mock Service Worker) neste projeto

Guia prático de como o MSW é usado no curso "Escolha de Poltronas de
Teatro". Para o porquê da escolha (vs. mocks manuais, vs. `json-server`),
ver `docs/adr/0003-msw.md`.

## O que já vem pronto desde a `fase-0`

```
src/mocks/
├── handlers.ts   # definição das rotas mockadas (GET /api/layout, POST /api/pedidos)
└── browser.ts    # setupWorker para o navegador
```

Esses arquivos existem em **todas** as fases (0 a 9), mas só passam a ser
usados pela UI a partir da fase-5 (o mesmo padrão já usado para o React
Router: biblioteca configurada cedo, virando conteúdo de aula depois). Até
lá, os dados vêm de JSON local em `src/dados/`.

## Como as rotas mockadas funcionam

`src/mocks/handlers.ts` define os handlers com a API do MSW v2
(`http.get`, `http.post`, `HttpResponse.json`):

```ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/layout", () => {
    return HttpResponse.json(layoutPadrao);
  }),
  http.post("/api/pedidos", async ({ request }) => {
    const corpo = await request.json();
    // ...monta e retorna o pedido criado
    return HttpResponse.json(pedido, { status: 201 });
  }),
];
```

O contrato completo de cada rota (query params, formato de resposta,
respostas de erro simuladas) está documentado em
`specs/001-escolha-poltronas-teatro/contracts/api-mock.md` — consulte esse
arquivo antes de alterar um handler.

## Navegador vs. testes: o mesmo handler, dois "runtimes"

- **No navegador** (a partir da fase-5): `src/mocks/browser.ts` chama
  `setupWorker(...handlers)`. O worker precisa ser iniciado uma vez, cedo,
  antes da árvore React montar (ex.: em `main.tsx`, condicionado a
  `import.meta.env`, para não rodar em produção).
- **Nos testes** (Vitest + Testing Library, todas as fases a partir da 5):
  use `setupServer(...handlers)` de `msw/node` num arquivo de setup global,
  chamando `server.listen()` em `beforeAll`, `server.resetHandlers()` em
  `afterEach` e `server.close()` em `afterAll`. Os **mesmos** `handlers`
  de `src/mocks/handlers.ts` são reaproveitados — não duplique a lógica de
  mock entre navegador e teste.

## Simulando erro e comportamento assíncrono num teste específico

Quando um teste precisa exercitar o estado de erro (ex.: "layout falhou ao
carregar", FR-007) ou uma resposta diferente da padrão, sobrescreva o
handler só para aquele teste com `server.use(...)`:

```ts
server.use(
  http.get("/api/layout", () => {
    return HttpResponse.json({ mensagem: "Falha ao carregar o layout do teatro" }, { status: 500 });
  }),
);
```

Isso evita criar handlers alternativos permanentes em `handlers.ts` só para
cobrir um caso de teste.

## Polling (fase-6+): cuidado com não-determinismo

O handler de `GET /api/layout` marca aleatoriamente algumas poltronas como
`"ocupado"`/`"bloqueado"` a cada chamada de polling, simulando outros
compradores (US6). **Sob teste, esse sorteio precisa ser determinístico**
(seed fixa ou flag injetável no handler) — senão a suíte fica instável (um
teste que passa às vezes e falha às vezes). Combine com
`vi.useFakeTimers()` para controlar o intervalo de 5s sem esperar tempo
real passar.

## Erros comuns

- **"Service Worker não registrado" no navegador**: normalmente falta rodar
  `npx msw init public/` (gera o `mockServiceWorker.js` estático) ou o
  worker não foi `start()`-ado antes da primeira chamada `fetch`.
- **Teste "vaza" estado entre casos**: esqueceu de chamar
  `server.resetHandlers()` em `afterEach` — um `server.use(...)` de um
  teste continua ativo no teste seguinte.
- **Handler não intercepta a chamada no teste**: confira se o `fetch` usa a
  mesma URL relativa (`/api/layout`) que o handler declara; MSW não
  intercepta se a URL não bater exatamente (incluindo query params, se o
  handler os validar).
- **Mock "funciona no navegador mas não no teste" (ou vice-versa)**: sinal
  de que alguém criou um mock paralelo em vez de reaproveitar
  `src/mocks/handlers.ts` — sempre importe os handlers compartilhados, não
  recrie.
