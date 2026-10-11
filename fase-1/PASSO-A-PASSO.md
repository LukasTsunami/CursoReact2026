# Passo a passo: fase-0 → fase-1

Esta fase parte de uma cópia integral da `fase-0` e adiciona a tela inicial
real e a listagem de teatros (US1 do spec). Ao final, `fase-1.test.tsx`
fica verde e `fase-2.test.tsx` até `fase-9.test.tsx` continuam vermelhos.

1. **Crie as ilustrações decorativas** em `src/assets/` (`opera.svg`,
   `teatro.svg`, `danca.svg`, `musical.svg`, `hero-fundo.svg`) — imagens
   ilustrativas simples, sem link para conteúdo dinâmico (FR-027).

2. **Escreva `PaginaInicial.tsx`** (`src/paginas/PaginaInicial.tsx`):
   - Uma seção `hero` com `<h1>Reserve seu assento</h1>` e um parágrafo de
     apoio, com `hero-fundo.svg` como imagem de fundo via
     `style={{ backgroundImage: ... }}`.
   - Uma seção `bento-espetaculos` com CSS grid puro, exibindo as 4
     imagens (`alt="Ópera"`, `"Teatro"`, `"Dança"`, `"Apresentação
     Musical"`) — sem link, apenas decorativas.
   - Uma seção `Prova Social` (`<h2>Prova Social</h2>` + depoimentos fake).
   - Uma seção `Selos de Confiança` (`<h2>Selos de Confiança</h2>` + lista
     de selos fake).

3. **Crie `CartaoTeatro.tsx`** (`src/componentes/CartaoTeatro.tsx`): recebe
   um `teatro: GlobalLayoutData` via prop e renderiza um `<Link>` para
   `/teatros/{teatroId}` com o nome (`<h3>`), a descrição e a nota (ex.:
   `"4.7 ★"`).

4. **Escreva `PaginaListaTeatros.tsx`**: importa `src/dados/teatros.json`
   (tipado como `GlobalLayoutData[]`) e renderiza um `CartaoTeatro` por
   teatro, com `key={teatro.teatroId}`.

5. **Atualize `Header.tsx`**: adicione um `<nav>` com um `<Link to="/teatros">
   Teatros</Link>` — este é o item de menu que resolve a FR-024.

6. **Adicione o CSS** correspondente em `src/index.css` (`.hero`,
   `.bento-espetaculos`, `.prova-social`, `.selos-confianca`,
   `.grade-teatros`, `.cartao-teatro`, `.cabecalho__menu`).

7. **Rode `npm test`**: `fase-1.test.tsx` deve ficar verde; `fase-2.test.tsx`
   até `fase-9.test.tsx` continuam vermelhos (o mapa do teatro ainda não
   existe). Rode `npm run build` para confirmar que compila sem erro de
   TypeScript.

**Checkpoint**: navegação inicial completa (home → listagem → placeholder
do teatro) funcionando de ponta a ponta.
