# fase-7 — Adicionar poltronas ao carrinho e ver resumo (US7)

Esta fase adiciona o carrinho: depois de selecionar poltronas, o usuário
clica em "Comprar" e vê um resumo com os itens e o total, podendo marcar
qualquer item como meia-entrada.

## O que esta fase adiciona sobre a fase-6

- **`src/stores/carrinho.ts`**: store Zustand (`useCarrinho`) com `itens`,
  `expiraEm`, `carrinhoAberto` e as actions `adicionarAoCarrinho`,
  `alternarMeiaEntrada`, `fecharCarrinho`, `liberarAssentos`.
- **`Teatro`** ganha o botão "Comprar", que chama
  `adicionarAoCarrinho(poltronasSelecionadas)` e limpa a seleção local
  (as poltronas "saem" do modo seleção e "entram" no carrinho).
- **`CarrinhoModal`** (novo componente): montada direto no `App`, **fora**
  da árvore do `Teatro` — lê o estado direto da store, sem receber nada
  por prop. Lista os itens (`"{setor} · {fileira}{número} · {preço}"`),
  um checkbox "Meia-entrada" por item (recalcula o total pela metade do
  preço daquele item) e o total.
- `Setor`/`Fileira` passam a threadear também `setorNome` (além de
  `fileiraNome`) até o callback de seleção, para o carrinho conseguir
  exibir o nome do setor.

## Como rodar

```bash
npm install
npm run dev
npm test        # fase-1..7 verdes; fase-8..9 vermelhos
npm run build   # deve compilar sem erro de TypeScript
```
