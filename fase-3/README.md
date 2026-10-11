# fase-3 — Selecionar poltronas disponíveis (US3)

Esta fase adiciona a interação central da tela: clicar numa poltrona
seleciona/desmarca ela, com destaque visual e um painel de detalhes.

## O que esta fase adiciona sobre a fase-2

- **`Teatro`** ganha `poltronasSelecionadas` via `useState` (lifting state
  up) e o callback `aoSelecionar`, que desce por prop drilling através de
  `Setor` → `Fileira` até `Assento` (regra de estado do curso).
- **`Assento`** ganha `onClick`; o toggle usa spread/filter (a versão
  "ingênua" — o refactor com Immer só acontece na fase-4) e o `aria-label`
  passa a incluir `", selecionada"` quando aplicável.
- **`DetalhesPoltrona`** (novo componente): mostra número, preço e status
  da última poltrona selecionada (resolve FR-021).
- Um contador simples "Poltronas selecionadas: N" (estado derivado,
  calculado no render a partir do array — nunca duplicado em outro
  `useState`).
- **Mapa fiel à foto**: `layout-classico.json` traz as **650 poltronas**
  desenhadas em `teatro-municipal-de-sao-paulo.png` (12 blocos; Plateia
  com fileiras A–H e J, como na foto). Cada `Assento` tem centro
  (`coordinateX`/`coordinateY`), `largura`/`altura` e `rotacao`, medidos
  sobre a imagem; o botão cobre exatamente a poltrona, inclusive a
  inclinação dos setores laterais. A numeração segue a da foto por bloco
  (Plateia Esquerdo 100–109, Central 150–159, Direito 120–129, Frisa
  200/300/400, Camarote 500/550/600, Galeria 700/750/800), sequencial
  da esquerda para a direita.

## O que ainda não existe

- Ainda não há guarda de seleção: clicar numa poltrona ocupada, bloqueada,
  de fileira reservada ou de setor embargado também alterna a seleção
  (imperfeição proposital — a regra de negócio chega na fase-4).

## Como rodar

```bash
npm install
npm run dev
npm test        # fase-1..3 verdes; fase-4..9 vermelhos
npm run build   # deve compilar sem erro de TypeScript
```
