# fase-0 — Boilerplate

Esta é a pasta base de onde todas as fases seguintes (`fase-1` a `fase-9`)
são copiadas. Ela não implementa nenhuma funcionalidade de negócio ainda —
é só a fundação sobre a qual cada fase constrói seu incremento.

## O que já existe aqui

- **Vite + React 18 + TypeScript**, configurado e rodando.
- **React Router** (`BrowserRouter` + `Routes`) já respondendo em `/`,
  `/teatros` e `/teatros/:nomeDoTeatro` — mas todas as três rotas mostram
  apenas um placeholder de texto ("em construção"). Isso só vira conteúdo
  de aula na fase-8; ver `specs/001-escolha-poltronas-teatro/contracts/rotas-ui.md`.
- **MSW** configurado em `src/mocks/` (`handlers.ts`, `browser.ts`), mas
  ainda não iniciado nem chamado por nenhuma tela — só passa a ser usado de
  fato a partir da fase-5.
- **Tipos do domínio** completos em `src/tipos.ts`
  (`StatusAssento`, `Assento`, `Fileira`, `TipoAcesso`, `Setor`,
  `GlobalLayoutData`).
- **Dados de exemplo** em `src/dados/`: `layout-classico.json` (o teatro
  completo, com todos os casos de status/regra de negócio já presentes) e
  `teatros.json` (os 4 teatros exibidos na listagem, cada um com nome,
  descrição e nota).
- **`Header`/`Footer`** minimalistas (o `Header` ainda não tem o link para
  `/teatros` — isso entra na fase-1).
- **Suíte de testes completa** em `src/tests/` (`fase-1.test.tsx` até
  `fase-9.test.tsx`) — a mesma suíte que será reaproveitada em todas as
  fases seguintes. Aqui na fase-0, **todos os 9 arquivos falham**, porque
  nenhuma funcionalidade de negócio foi implementada ainda. Isso é o
  esperado, não é um bug (ver Principle II da constituição do projeto).

## Como rodar

```bash
npm install
npm run dev     # abre em http://localhost:5173
npm test        # os 9 arquivos de teste devem falhar
npm run build   # deve compilar sem erro de TypeScript
```

## Próximo passo

A fase-1 (`../fase-1/`) copia esta pasta inteira e adiciona a tela inicial
real e a listagem de teatros (US1) — ver
`specs/001-escolha-poltronas-teatro/tasks.md`.
