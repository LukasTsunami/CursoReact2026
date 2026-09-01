# Contrato: Rotas de UI (React Router)

Resolve FR-022, FR-023, FR-024, FR-025. Diferente de `contracts/api-mock.md`
(contrato de rede), este documento descreve o contrato de navegação exposto
ao usuário — as URLs que a aplicação responde e o que cada uma renderiza,
por fase.

## Rotas desde a fase-0

| Rota | Renderiza | Parâmetro |
|---|---|---|
| `/` | `PaginaInicial` (hero "Reserve seu assento" + Prova Social + Selos de Confiança) | — |
| `/teatros` | `PaginaListaTeatros` (cartões de teatro: título, descrição, nota) | — |
| `/teatros/:nomeDoTeatro` | `PaginaTeatro` (layout com `Header` + `Teatro` + `Footer`) | `nomeDoTeatro` é o slug do teatro (mesmo valor de `GlobalLayoutData.teatroId`, ver `data-model.md`) |

**Importante — não é uma aula ainda**: o React Router já fica configurado
em `fase-0/src/main.tsx` (mesmo padrão do MSW: presente e funcionando desde
o início, mas só vira conteúdo de aula na fase-8 — ver Principle "Sem
Complexidade Não Ensinada" item 18 na constituição, que continua proibindo
qualquer coisa além do `BrowserRouter`+`Routes`+`Route` mais simples: sem
loaders, sem lazy loading, sem rotas aninhadas).

- Nas fases 0, `/`, `/teatros` e `/teatros/:nomeDoTeatro` já respondem, mas
  todas mostram apenas placeholders.
- Na fase-1 (US1), `/` e `/teatros` ganham conteúdo real (tela inicial e
  listagem); `/teatros/:nomeDoTeatro` continua placeholder até a fase-2.
- Na fase-2 (US2), `/teatros/:nomeDoTeatro` passa a renderizar o mapa do
  teatro a partir do JSON local — mas o parâmetro `:nomeDoTeatro` ainda não
  é lido por ninguém (sempre mostra o mesmo teatro de exemplo,
  `teatro-municipal-de-sao-paulo`).
- Na fase-5 (US5), `PaginaTeatro` passa a ler `:nomeDoTeatro` via
  `useParams` e repassar como `teatroId` para `buscarLayout` — é aqui que a
  URL específica de cada teatro passa a carregar dados diferentes de fato.

## Rotas adicionadas na fase-8

| Rota | Renderiza |
|---|---|
| `/checkout` | `CheckoutPagina` (esqueleto até a fase-9) |
| `/sucesso` | `SucessoPagina` |

A fase-8 não "introduz" o React Router — ele já existia desde a fase-0.
Ela introduz o **conceito** de rotas para o aluno (é aqui que a aula explica
o que já estava rodando) e adiciona as duas rotas novas do fluxo de compra.

## Layout compartilhado

`PaginaInicial`, `PaginaListaTeatros`, `PaginaTeatro`, `CheckoutPagina` e
`SucessoPagina` compartilham a mesma composição de `Header` + conteúdo +
`Footer` desde que existam (`Header`/`Footer` existem desde a fase-0, junto
com as três primeiras páginas). O `Header` ganha o item de menu para
`/teatros` (resolve FR-024) na fase-1, quando `PaginaListaTeatros` passa a
existir de fato.

## Dados por página

- `PaginaListaTeatros` lê `fase-N/src/dados/teatros.json` (array de
  `GlobalLayoutData`, ver `data-model.md`) e renderiza um `CartaoTeatro`
  por item, usando apenas `teatroId`, `nome`, `descricao` e `nota` — não
  depende de `setores` estar preenchido.
- `PaginaTeatro` usa `layout-classico.json` (fases 2–4) e depois
  `GET /api/layout` (fase-5+, ver `contracts/api-mock.md`).
