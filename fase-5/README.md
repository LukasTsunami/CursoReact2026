# fase-5 — Carregar dados dinamicamente e trocar de teatro (US5)

Esta fase troca o JSON local importado por dados vindos de `GET
/api/layout` via MSW, com estados de carregamento/erro e suporte a
múltiplos teatros.

## O que esta fase adiciona sobre a fase-4

- **`src/servicos/layout.ts`**: `buscarLayout(teatroId?)` — `fetch` direto
  (sem cliente HTTP genérico), lança erro se a resposta não for `ok`.
- **`PaginaTeatro`** passa a ler `:nomeDoTeatro` via `useParams` e buscar
  o layout com `useEffect` + `async/await`, com estados `carregando` e
  `erro` locais (sem Error Boundary, sem retry — só o loading/erro simples
  que a fase pede).
- Um `<select>` (rotulado "Escolher teatro") navega para
  `/teatros/:teatroId` ao trocar de opção — a própria mudança de rota
  dispara o efeito de busca de novo.
- **`src/dados/layout-redondo.json`**: fixture do Teatro Amazonas
  (`formato: "redondo"`), servido por `GET /api/layout?teatroId=
  teatro-amazonas`. Cada assento segue o formato introduzido na fase-2
  (centro, `largura`, `altura` e `rotacao`).
- **`src/mocks/handlers.ts`** passa a responder por `teatroId` de verdade
  (antes só devolvia sempre o layout clássico).
- **`src/main.tsx`** agora inicia o `worker` do MSW (`worker.start(...)`)
  antes de montar a árvore React — este projeto não tem backend real,
  então o worker precisa estar ouvindo mesmo em "produção" para o app
  funcionar de verdade no navegador (`npm run dev`/`npm run preview`),
  não só nos testes. Rode `npx msw init public/ --save` uma vez por fase
  (a partir desta) para gerar o `public/mockServiceWorker.js` que o
  worker precisa.
- **Correção de infraestrutura de teste**: o servidor MSW dos testes
  passou a viver em `src/tests/setup.ts` (`beforeAll`/`afterEach`/
  `afterAll` globais, usando os mesmos handlers do app) em vez de cada
  arquivo `fase-N.test.tsx` criar o seu próprio — é exatamente o padrão já
  descrito em `docs/playbooks/msw.md`. Isso é necessário porque, a partir
  desta fase, `PaginaTeatro` sempre busca dados pela rede — mesmo os
  testes de fases anteriores (que não mexem com MSW) precisam de um
  servidor ouvindo por baixo.

## Como rodar

```bash
npm install
npm run dev
npm test        # fase-1..5 verdes; fase-6..9 vermelhos
npm run build   # deve compilar sem erro de TypeScript
```
