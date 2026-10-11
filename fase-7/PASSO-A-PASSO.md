# Passo a passo: fase-6 → fase-7

Esta fase parte de uma cópia integral da `fase-6` e adiciona o carrinho
(US7 do spec). Ao final, `fase-1..7.test.tsx` ficam verdes; `fase-8.test.tsx`
e `fase-9.test.tsx` continuam vermelhos.

1. **Thread `setorNome`**: `Setor.tsx` passa `setorNome={setor.nome}` para
   `Fileira`, que inclui no `aoSelecionar(setorId, setorNome, fileiraId,
   fileiraNome, assento)` — necessário para o carrinho exibir o nome do
   setor.

2. **Crie `src/stores/carrinho.ts`**: `create<EstadoCarrinho>((set) =>
   ({...}))`, sem middleware. `adicionarAoCarrinho` seta `itens` (a
   partir das poltronas selecionadas), `expiraEm = Date.now() + 5 * 60 *
   1000` e `carrinhoAberto = true`.

3. **Crie `CarrinhoModal.tsx`**: `role="dialog"` + `aria-label="Carrinho"`;
   retorna `null` quando `!carrinhoAberto`. Lista os itens e um checkbox
   "Meia-entrada" por item, chamando `alternarMeiaEntrada`. O total soma
   `meiaEntrada ? precoBase / 2 : precoBase` de cada item.

4. **Monte `<CarrinhoModal />` no `App.tsx`**, como irmã das `Routes` — não
   dentro de `PaginaTeatro`/`Teatro`.

5. **Atualize `Teatro.tsx`**: adicione o botão "Comprar", desabilitado
   quando não há nada selecionado; ao clicar, chama
   `adicionarAoCarrinho(poltronasSelecionadas)` (lida via
   `useCarrinho((estado) => estado.adicionarAoCarrinho)`) e zera a
   seleção local (`poltronasSelecionadas`/`ultimaSelecionada`).

6. **Adicione o CSS** (`.teatro__comprar`, `.carrinho-modal*`).

7. **Escreva os ADR/playbook do Zustand** em `docs/adr/0005-zustand.md` e
   `docs/playbooks/zustand.md`.

8. **Rode `npm test`**: `fase-1.test.tsx` até `fase-7.test.tsx` devem
   ficar verdes; `fase-8.test.tsx` e `fase-9.test.tsx` continuam
   vermelhos. Rode `npm run build` para confirmar que compila sem erro de
   TypeScript.

**Checkpoint**: FR-011 e FR-017 (via meia-entrada) e US7 completos — a
"intenção de compra" existe.
