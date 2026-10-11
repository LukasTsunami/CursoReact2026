# fase-1 — Navegar da tela inicial até um teatro (US1)

Esta fase adiciona a porta de entrada do produto: uma tela inicial de
divulgação e a listagem de teatros disponíveis, com navegação até a página
de um teatro específico (que continua sendo um placeholder até a fase-2).

## O que esta fase adiciona sobre a fase-0

- **`PaginaInicial`** com hero "Reserve seu assento" (fundo ilustrativo de
  teatro/ópera), uma grade "bento" com os tipos de espetáculo (ópera,
  teatro, dança, apresentação musical) e as seções fake de Prova Social e
  Selos de Confiança.
- **`CartaoTeatro`**: um cartão por teatro (título, descrição, nota),
  usado pela listagem.
- **`PaginaListaTeatros`**: lê `src/dados/teatros.json` e renderiza um
  `CartaoTeatro` por item; cada cartão leva para `/teatros/:teatroId`.
- **`Header`** ganha o link de menu para `/teatros`.
- Ilustrações decorativas em `src/assets/` (SVGs simples — placeholders,
  sem link para conteúdo dinâmico).

## O que ainda não existe

- O mapa do teatro (`/teatros/:nomeDoTeatro`) continua sendo só um
  placeholder de texto — isso é a fase-2.

## Como rodar

```bash
npm install
npm run dev     # abre em http://localhost:5173
npm test        # fase-1.test.tsx verde; fase-2..9 vermelhos
npm run build   # deve compilar sem erro de TypeScript
```
