# Passo a passo: fase-5 → fase-6

Esta fase parte de uma cópia integral da `fase-5` e adiciona a atualização
em tempo real (US6 do spec). Ao final, `fase-1..6.test.tsx` ficam verdes;
`fase-7.test.tsx` até `fase-9.test.tsx` continuam vermelhos.

1. **Crie `src/contexto/TeatroContext.tsx`**: `createContext(false)` —
   sem hook customizado por cima, só o Context puro.

2. **Atualize `Teatro.tsx`**: envolva a lista de `Setor` com
   `<TeatroContext.Provider value={layout.cadeirasEstofadas}>`.

3. **Atualize `Assento.tsx`**: `useContext(TeatroContext)` direto (sem
   passar por `Setor`/`Fileira`), usado numa classe CSS
   (`assento--estofada`).

4. **Adicione o segundo `useEffect` em `PaginaTeatro.tsx`**:
   `setInterval` de 5000ms chamando `buscarLayout(nomeDoTeatro)` de novo e
   atualizando o `layout`; `clearInterval` no cleanup. Erros do polling
   são ignorados silenciosamente (a tela continua com o último layout
   válido).

5. **Atualize `src/mocks/handlers.ts`**: adicione
   `comOutrosCompradores(layout)`, que a partir da 2ª chamada por teatro
   marca algumas poltronas `"disponivel"` como `"ocupado"` — determinístico
   (baseado no número da chamada), nunca `Math.random()`. Exporte também
   `resetSimulacaoDeCompradores()`, chamada no `afterEach` global de
   `src/tests/setup.ts` (senão o contador soma entre testes do mesmo
   arquivo e "vaza" mutações pra testes que não esperam por elas).

6. **Adicione o `useEffect` em `Teatro.tsx`** que roda quando `layout`
   muda: filtra `poltronasSelecionadas` cujo assento correspondente não
   está mais `"disponivel"`, remove essas da seleção (via Immer) e monta
   uma mensagem de aviso por poltrona removida.

7. **Escreva os testes com cuidado com fake timers**: `vi.useFakeTimers()`
   precisa estar ativo **antes** do `render(...)` (senão o
   `setInterval` do componente é registrado nos timers reais, e avançar o
   relógio falso não faz nada). Depois de avançar o relógio, dê alguns
   ticks de `vi.advanceTimersByTimeAsync(0)` para o `fetch` via MSW
   terminar de resolver. Para clicar numa poltrona enquanto os timers
   estão falsos, use `fireEvent.click` em vez de `userEvent.click` (que
   trava nesse cenário).

8. **Rode `npm test`**: `fase-1.test.tsx` até `fase-6.test.tsx` devem
   ficar verdes; `fase-7.test.tsx` até `fase-9.test.tsx` continuam
   vermelhos. Rode `npm run build` para confirmar que compila sem erro de
   TypeScript.

**Checkpoint**: versão final da tela (sem carrinho/checkout) está
completa (FR-009, FR-010).
