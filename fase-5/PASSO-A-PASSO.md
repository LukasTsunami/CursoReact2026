# Passo a passo: fase-4 → fase-5

Esta fase parte de uma cópia integral da `fase-4` e troca o JSON local por
dados vindos da API mockada (US5 do spec). Ao final, `fase-1..5.test.tsx`
ficam verdes; `fase-6.test.tsx` até `fase-9.test.tsx` continuam vermelhos.

1. **Crie `src/servicos/layout.ts`**: `buscarLayout(teatroId?: string)`
   faz `fetch("/api/layout" + (teatroId ? "?teatroId=..." : ""))` e lança
   `Error` se `!resposta.ok`.

2. **Crie `src/dados/layout-redondo.json`**: fixture completo do
   `teatro-amazonas` (`formato: "redondo"`), com cada assento no mesmo
   formato da fase-2 (`coordinateX`/`coordinateY`, `largura`, `altura`,
   `rotacao`).

3. **Atualize `src/mocks/handlers.ts`**: o handler de `GET /api/layout`
   lê `teatroId` da query string e devolve o layout correspondente (mapa
   `teatroId → layout`), com o layout clássico como padrão.

4. **Reescreva `PaginaTeatro.tsx`**: leia `nomeDoTeatro` via `useParams`;
   `useState` para `layout`/`carregando`/`erro`; `useEffect` (dependente
   de `nomeDoTeatro`) chamando `buscarLayout` dentro de `async/await` com
   `try/catch/finally`. Renderize o texto de carregamento, o texto de
   erro, ou o `<select>` + `<Teatro>` quando o layout chega.

5. **Adicione o `<select id="seletor-teatro">`**: uma `<option>` por
   teatro de `teatros.json`; o `onChange` chama `navigate(`/teatros/
   ${teatroId}`)` — a própria troca de rota já dispara o efeito de busca
   de novo (não precisa de lógica extra).

6. **Corrija a infraestrutura de teste**: mova o servidor MSW para
   `src/tests/setup.ts` (`export const server = setupServer(...handlers)`
   com `beforeAll`/`afterEach`/`afterAll` globais, usando os handlers
   reais de `src/mocks/handlers.ts`). Atualize `fase-5.test.tsx` até
   `fase-9.test.tsx` para importar esse `server` compartilhado (em vez de
   criar o seu próprio) e usar `server.use(...)` só para os cenários que
   precisam de uma resposta diferente da padrão.

7. **Inicie o worker do MSW no navegador**: rode `npx msw init public/
   --save` (gera `public/mockServiceWorker.js` e registra
   `"msw.workerDirectory"` no `package.json`). Em `src/main.tsx`, importe
   `worker` de `./mocks/browser.ts`, chame `await worker.start({
   onUnhandledRequest: "bypass" })` e só monte a árvore React depois disso
   resolver — sem isso, `npm run dev` mostra "Falha ao carregar o layout
   do teatro" (o `fetch` não tem nada para interceptá-lo fora dos testes).

8. **Rode `npm test`**: `fase-1.test.tsx` até `fase-5.test.tsx` devem
   ficar verdes; `fase-6.test.tsx` até `fase-9.test.tsx` continuam
   vermelhos. Rode `npm run build` para confirmar que compila sem erro de
   TypeScript, e `npm run dev` para confirmar que o mapa carrega de
   verdade no navegador.

**Checkpoint**: a aplicação passa a ser orientada a dados (FR-007, FR-008).
