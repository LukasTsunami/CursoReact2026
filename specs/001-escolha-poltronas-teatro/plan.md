# Implementation Plan: Escolha de Poltronas de Teatro

**Branch**: `001-escolha-poltronas-teatro` | **Date**: 2026-08-31 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-escolha-poltronas-teatro/spec.md`

## Summary

Entregar um repositório didático de curso de React em 10 pastas independentes
(`fase-0` a `fase-9`), cada uma um SPA completo de "escolha de poltronas de
teatro" que roda e testa sozinho. Cada fase adiciona uma camada de valor sobre
a anterior (tela inicial + listagem → mapa estático → seleção → regras de
negócio → dados via API mockada → tempo real → carrinho → reserva com prazo e
navegação → checkout), seguindo exatamente a stack fixa definida na
constituição do projeto e usando a mesma suíte de testes em todas as fases
como critério objetivo de corretude (verde até a fase corrente, vermelho
depois). Documentação (ADRs, playbooks, passo-a-passo, e um README por fase)
é parte do entregável, não um anexo opcional.

## Technical Context

**Language/Version**: TypeScript (modo estrito do `tsc`, mas com tipos
simples — sem generics avançados nem utility types exóticos), ES2020+

**Primary Dependencies**: Vite, React 18+, MSW, Immer, Zustand, React Router,
React Hook Form + Zod (+ `@hookform/resolvers`). React Router é instalado e
configurado (`BrowserRouter`+`Routes`) já na fase-0 — mesmo padrão do MSW
(presente e funcional desde o início, mas só vira conteúdo de aula na
fase-8; ver `contracts/rotas-ui.md` e a Sync Impact Report desta feature).

**Storage**: N/A — não há persistência real; MSW simula as respostas de
`GET /api/layout` e `POST /api/pedidos` em memória, resetadas a cada carga

**Testing**: Vitest + Testing Library (`@testing-library/react`,
`jest-dom`, `user-event`) + jsdom, com `vi.useFakeTimers()` para polling e
holdTimer

**Target Platform**: navegador web moderno (evergreen), sem suporte a IE;
projeto roda localmente via `npm run dev` (Vite dev server)

**Project Type**: aplicação web front-end pura (SPA), replicada como 10
incrementos independentes — não há backend real, só o mock do MSW

**Performance Goals**: responsividade padrão de SPA (feedback de clique
percebido como instantâneo); polling de disponibilidade a cada 5s; sem metas
de throughput/carga — escala é a de uma demo didática, não de produção

**Constraints**: nenhuma biblioteca fora da stack fixa (Principle III);
proibido `useRef` e `PropTypes` em qualquer fase; código idêntico entre
fases consecutivas exceto o diff da fase (Principle I); tipos legíveis sem
sofisticação de TS (Principle V); comentários didáticos curtos só na
primeira ocorrência de um conceito por fase

**Scale/Scope**: 10 pastas de projeto completo; 4 layouts de teatro
(clássico, redondo, funil, multi-andar) com 2–3 setores, 4–6 fileiras por
setor, 8–14 poltronas por fileira; suíte de testes com 9 arquivos
(`fase-1`..`fase-9`) reaplicada em cada pasta

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Avaliação |
|---|---|
| I. Fase Independente e Incremental | PASS — estrutura definida abaixo cria 10 pastas com `package.json` próprio; diff mínimo garantido pelo processo de materialização incremental (fase-0 → fase-9) |
| II. Testes Como Juiz (NON-NEGOTIABLE) | PASS — mesma suíte (`src/tests/fase-1..9.test.tsx`) replicada em cada pasta; critério verde/vermelho por fase será confirmado por execução real em cada tarefa de implementação, nunca presumido |
| III. Stack Fechada | PASS — Technical Context lista exatamente as tecnologias da constituição; nenhuma dependência adicional introduzida no design |
| IV. Domínio em Português, React em Inglês | PASS — `data-model.md` usa os nomes oficiais (`Teatro`, `Setor`, `Fileira`, `Assento`, etc.); APIs React permanecem em inglês |
| V. TypeScript Simples e Didático | PASS — tipos em `data-model.md` são planos, sem generics; nenhuma abstração de tipo introduzida além do necessário para documentar o domínio |
| VI. Documentação Rastreável | PASS — estrutura de diretórios inclui `docs/adr/`, `docs/playbooks/`, `PASSO-A-PASSO.md` e `README.md` por fase como artefatos de primeira classe do plano |

Nenhuma violação identificada. Seção de Complexity Tracking não se aplica.

## Project Structure

### Documentation (this feature)

```text
specs/001-escolha-poltronas-teatro/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
docs/
├── adr/                        # um ADR por tecnologia (Contexto → Decisão → Alternativas → Consequências)
│   ├── 0001-vite.md
│   ├── 0002-typescript.md
│   ├── 0003-msw.md
│   ├── 0004-immer.md
│   ├── 0005-zustand.md
│   ├── 0006-react-router.md
│   ├── 0007-react-hook-form.md
│   ├── 0008-zod.md
│   └── 0009-testing-library.md
└── playbooks/                  # um playbook por tecnologia (passo a passo + porquê de cada config)
    ├── vite.md
    ├── typescript.md
    ├── msw.md
    ├── immer.md
    ├── zustand.md
    ├── react-router.md
    ├── react-hook-form.md
    ├── zod.md
    └── testing-library.md

fase-0/ .. fase-9/               # cada pasta é um projeto Vite completo e independente
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .vscode/                    # a partir da fase-0, replicado em todas
├── README.md                   # explica o que ESTA fase contém e como rodá-la (todas as fases, não só fase-0)
├── PASSO-A-PASSO.md            # como sair da fase anterior e chegar nesta
├── src/
│   ├── main.tsx                 # BrowserRouter+Routes desde a fase-0 (ver contracts/rotas-ui.md); só vira aula na fase-8
│   ├── App.tsx
│   ├── tipos.ts                # StatusAssento, Assento, Fileira, Setor, TipoAcesso, GlobalLayoutData (com descricao/nota)
│   ├── dados/                  # JSON de layout(s) e de teatros.json (listagem) local(is)
│   ├── componentes/
│   │   ├── Teatro.tsx           # a partir da fase-2
│   │   ├── Setor.tsx            # a partir da fase-2
│   │   ├── Fileira.tsx          # a partir da fase-2
│   │   ├── Assento.tsx          # a partir da fase-2
│   │   ├── CartaoTeatro.tsx     # a partir da fase-1 (banner da listagem)
│   │   ├── Header.tsx           # desde a fase-0 (menu para /teatros a partir da fase-1)
│   │   └── Footer.tsx           # desde a fase-0
│   ├── mocks/                  # handlers MSW (existe desde fase-0, usado a partir da fase-5)
│   │   ├── handlers.ts
│   │   └── browser.ts
│   ├── servicos/                # funções de acesso a dados (ex.: buscarLayout) — a partir da fase-5
│   ├── contexto/                # TeatroContext — a partir da fase-6
│   ├── stores/                  # useCarrinho (Zustand) — a partir da fase-7
│   ├── paginas/                 # PaginaInicial/PaginaListaTeatros/PaginaTeatro desde a fase-0; CheckoutPagina/SucessoPagina a partir da fase-8
│   │   ├── PaginaInicial.tsx     # "/" — hero + Prova Social + Selos de Confiança (conteúdo real a partir da fase-1)
│   │   ├── PaginaListaTeatros.tsx # "/teatros" — cartões de teatro (conteúdo real a partir da fase-1)
│   │   └── PaginaTeatro.tsx      # "/teatros/:nomeDoTeatro" — layout (Header+Teatro+Footer), mapa real a partir da fase-2
│   └── tests/
│       ├── fase-1.test.tsx
│       ├── fase-2.test.tsx
│       ├── fase-3.test.tsx
│       ├── fase-4.test.tsx
│       ├── fase-5.test.tsx
│       ├── fase-6.test.tsx
│       ├── fase-7.test.tsx
│       ├── fase-8.test.tsx
│       └── fase-9.test.tsx

README.md                        # raiz: o que é o curso, tabela de fases, como rodar
```

**Structure Decision**: coleção de 10 SPAs independentes lado a lado
(`fase-0`..`fase-9`) na raiz do repositório, sem código compartilhado entre
elas (Principle I exige isolamento total — cada uma tem seu próprio
`node_modules`/`package.json`). Documentação técnica cross-fase
(`docs/adr`, `docs/playbooks`) vive na raiz porque descreve decisões válidas
para todas as fases; cada fase, além disso, tem seu próprio `README.md`
explicando o que aquela pasta especificamente contém (complementar ao
`README.md` raiz e ao `PASSO-A-PASSO.md` da fase). Cada fase carrega sua
própria cópia de `src/tests/fase-1..9.test.tsx` (a mesma suíte lógica,
ajustada apenas quando a fase introduz a funcionalidade testada) para
viabilizar o critério verde/vermelho da Principle II.

## Complexity Tracking

*Não aplicável — nenhuma violação da Constitution Check.*
