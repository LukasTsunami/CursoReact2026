# Passo a passo: fase-7 → fase-8

Esta fase parte de uma cópia integral da `fase-7` e adiciona o holdTimer e
as rotas de checkout (US8 do spec). Ao final, `fase-1..8.test.tsx` ficam
verdes; `fase-9.test.tsx` continua vermelho.

1. **Atualize `CarrinhoModal.tsx`**:
   - `useState<number>(() => Date.now())` para `agora`.
   - Um `useEffect` que reseta `agora` sempre que `expiraEm` muda (senão a
     contagem começa errada — `expiraEm` é calculado no momento da
     compra, que pode ser bem depois do primeiro mount da modal).
   - O `useEffect` do holdTimer: `setInterval` de 1000ms que chama
     `liberarAssentos()` quando `Date.now() >= expiraEm`, ou atualiza
     `agora` caso contrário; `clearInterval` no cleanup.
   - Calcule `segundosRestantes`/`minutos`/`segundos` a partir de
     `expiraEm - agora` e mostre `"Expira em {mm}:{ss}"`.
   - Adicione o link `<Link to="/checkout" onClick={fecharCarrinho}>`
     ("Finalizar compra") — fecha a modal ao navegar, para não sobrepor
     o conteúdo da página de checkout.

2. **Crie `CheckoutPagina.tsx`** (esqueleto): `<h1>Checkout</h1>` + total
   lido da store (`useCarrinho((estado) => estado.itens)`), já ajustado
   por meia-entrada.

3. **Crie `SucessoPagina.tsx`** (placeholder — conteúdo real na fase-9).

4. **Atualize `App.tsx`**: adicione as rotas `/checkout` e `/sucesso`.

5. **Escreva os ADR/playbook do React Router** em
   `docs/adr/0006-react-router.md` e `docs/playbooks/react-router.md`.

6. **Cuidado com fake timers nos testes**: como na fase-6, `vi.useFakeTimers()`
   precisa estar ativo **antes** do `render(...)` para que o `setInterval`
   do holdTimer (e o da fase-6) seja registrado nos timers falsos. Use
   `fireEvent.click` (não `userEvent.click`) para clicar enquanto os
   timers estão falsos.

7. **Rode `npm test`**: `fase-1.test.tsx` até `fase-8.test.tsx` devem
   ficar verdes; `fase-9.test.tsx` continua vermelho. Rode `npm run build`
   para confirmar que compila sem erro de TypeScript.

**Checkpoint**: FR-012..FR-014 completos; o carrinho sobrevive à troca de
rota.
