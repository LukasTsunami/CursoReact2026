---

description: "Task list for feature implementation"
---

# Tasks: Escolha de Poltronas de Teatro

**Input**: Design documents from `/specs/001-escolha-poltronas-teatro/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-mock.md, contracts/rotas-ui.md, quickstart.md

**Tests**: obrigatórios — Principle II da constituição ("Testes Como Juiz") é NON-NEGOTIABLE.

**Organization**: cada fase de tarefas corresponde 1:1 a uma pasta `fase-N` e a
uma User Story do spec.md (US1 = fase-1 ... US9 = fase-9). Isso é possível
porque o próprio produto é entregue como incrementos numerados idênticos às
prioridades da spec. `fase-1` (Tela Inicial + Listagem) foi inserida antes do
mapa de poltronas para introduzir listagem/roteamento com uma curva de
aprendizado mais leve; todas as fases seguintes empurraram seu número em +1
em relação à versão anterior deste documento.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivo diferente, sem dependência de tarefa incompleta)
- **[Story]**: US1..US9, mapeando para fase-1..fase-9
- Caminhos de arquivo exatos em cada descrição

## Phase 1: Setup

- [ ] T001 Create root README.md skeleton (overview do curso, tabela das 10 fases — fase-0 a fase-9, como rodar cada pasta) at `README.md`
- [ ] T002 [P] Create `docs/adr/` directory at `docs/adr/.gitkeep`
- [ ] T003 [P] Create `docs/playbooks/` directory at `docs/playbooks/.gitkeep`

**Checkpoint**: estrutura de documentação pronta para receber ADRs/playbooks a partir da Foundational phase.

## Phase 2: Foundational (fase-0 — BLOQUEIA todas as User Stories)

- [ ] T004 Scaffold Vite + React + TypeScript project in `fase-0/` (`package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`)
- [ ] T005 [P] Configure ESLint com Standard Style in `fase-0/eslint.config.js`
- [ ] T006 [P] Configure Prettier in `fase-0/.prettierrc`
- [ ] T007 [P] Add `.vscode/settings.json` e `.vscode/extensions.json` recomendados para React in `fase-0/.vscode/`
- [ ] T008 [P] Create `Header` component (sem menu populado ainda — o link para `/teatros` só entra na fase-1) in `fase-0/src/componentes/Header.tsx`
- [ ] T009 [P] Create `Footer` component in `fase-0/src/componentes/Footer.tsx`
- [ ] T010 Configure React Router (`BrowserRouter`+`Routes`) com rotas `/` → `PaginaInicial`, `/teatros` → `PaginaListaTeatros`, `/teatros/:nomeDoTeatro` → `PaginaTeatro` (resolve FR-022; ver `contracts/rotas-ui.md` — não é ensinado até a fase-8, só funciona) in `fase-0/src/main.tsx`
- [ ] T011 [P] Define os tipos do domínio, incluindo `descricao`/`nota` em `GlobalLayoutData`, per `data-model.md` in `fase-0/src/tipos.ts`
- [ ] T012 [P] Create `layout-classico.json` fixture (teatroId `teatro-municipal-de-sao-paulo`, nome `Teatro Municipal de São Paulo`) cobrindo todos os casos de status/regra em `fase-0/src/dados/layout-classico.json`
- [ ] T013 [P] Create `teatros.json` — array com os 4 teatros de exemplo (nome/descricao/nota/formato preenchidos para todos; `setores` completo só no `teatro-municipal-de-sao-paulo`, os demais com `setores: []` até serem preenchidos nas fases seguintes) in `fase-0/src/dados/teatros.json`
- [ ] T014 [P] Configure MSW handlers (não usados pela UI ainda) per `contracts/api-mock.md` in `fase-0/src/mocks/handlers.ts` and `fase-0/src/mocks/browser.ts`
- [ ] T015 Render `PaginaInicial`, `PaginaListaTeatros` e `PaginaTeatro` placeholders (cada uma dentro do layout `Header`+`Footer`), montadas pelas rotas já configuradas (T010) in `fase-0/src/paginas/PaginaInicial.tsx`, `fase-0/src/paginas/PaginaListaTeatros.tsx`, `fase-0/src/paginas/PaginaTeatro.tsx` and `fase-0/src/App.tsx`
- [ ] T016 [P] Write `fase-1.test.tsx` (tela inicial + listagem de teatros, US1) in `fase-0/src/tests/fase-1.test.tsx`
- [ ] T017 [P] Write `fase-2.test.tsx` (renderização estática do teatro, US2) in `fase-0/src/tests/fase-2.test.tsx`
- [ ] T018 [P] Write `fase-3.test.tsx` (seleção básica, US3) in `fase-0/src/tests/fase-3.test.tsx`
- [ ] T019 [P] Write `fase-4.test.tsx` (regras de negócio, acessibilidade, US4) in `fase-0/src/tests/fase-4.test.tsx`
- [ ] T020 [P] Write `fase-5.test.tsx` (dados via MSW, loading/erro, múltiplos teatros, US5) in `fase-0/src/tests/fase-5.test.tsx`
- [ ] T021 [P] Write `fase-6.test.tsx` (polling, cleanup, useContext, US6) in `fase-0/src/tests/fase-6.test.tsx`
- [ ] T022 [P] Write `fase-7.test.tsx` (carrinho Zustand, meia-entrada, US7) in `fase-0/src/tests/fase-7.test.tsx`
- [ ] T023 [P] Write `fase-8.test.tsx` (holdTimer, expiração, rotas de checkout, US8) in `fase-0/src/tests/fase-8.test.tsx`
- [ ] T024 [P] Write `fase-9.test.tsx` (checkout RHF+Zod, US9) in `fase-0/src/tests/fase-9.test.tsx`
- [ ] T025 Verify fase-0 correctness: `npm install && npm test` (os 9 arquivos DEVEM falhar) e `npm run build` (compila sem erro de TS) in `fase-0/`
- [ ] T026 [P] Write ADR for Vite (incluindo seção "Quando reconsiderar", ver `research.md`) in `docs/adr/0001-vite.md`
- [ ] T027 [P] Write playbook for Vite in `docs/playbooks/vite.md`
- [ ] T028 [P] Write ADR for TypeScript (incluindo seção "Quando reconsiderar", ver `research.md`) in `docs/adr/0002-typescript.md`
- [ ] T029 [P] Write playbook for TypeScript in `docs/playbooks/typescript.md`
- [ ] T030 [P] Write ADR for MSW (incluindo seção "Quando reconsiderar", ver `research.md`) in `docs/adr/0003-msw.md`
- [ ] T031 [P] Write playbook for MSW in `docs/playbooks/msw.md`
- [ ] T032 [P] Write ADR for Testing Library (incluindo seção "Quando reconsiderar", ver `research.md`) in `docs/adr/0009-testing-library.md`
- [ ] T033 [P] Write playbook for Testing Library in `docs/playbooks/testing-library.md`

- [ ] T034 [P] Write `fase-0/README.md` explaining that this folder is the boilerplate/starting point (Vite+TS, MSW configured but unused, full red test suite) at `fase-0/README.md`

**Checkpoint**: `fase-0` roda, os 9 arquivos de teste vermelhos, suíte completa existe e será apenas copiada (nunca reescrita) pelas fases seguintes.

## Phase 3: US1 - Navegar da tela inicial até um teatro (fase-1) 🎯 MVP

**Goal**: tela inicial com hero "Reserve seu assento" + seções fake de Prova Social e Selos de Confiança; listagem de teatros em `/teatros` com banners (título, descrição, nota); navegação até a página de um teatro específico.

**Independent Test**: abrir `fase-1` em `/`, ver a home; clicar no menu para `/teatros`, ver os cards de teatro; clicar num card e chegar em `/teatros/teatro-municipal-de-sao-paulo`; `fase-1.test.tsx` verde.

- [ ] T035 [US1] Copy `fase-0/` into `fase-1/` as starting point
- [ ] T036 [US1] Build `PaginaInicial`: hero "Reserve seu assento" (com imagens de teatro e ópera como plano de fundo, placeholder de banco de imagens gratuito em `fase-1/src/assets/`) + seção Prova Social (fake) + seção Selos de Confiança (fake) in `fase-1/src/paginas/PaginaInicial.tsx`
- [ ] T037 [P] [US1] Build grade "bento grid" de tipos de espetáculo (ópera, teatro, dança, apresentação musical — ex.: violão) com CSS grid puro e imagens placeholder, sem link/interação (resolve FR-027) in `fase-1/src/paginas/PaginaInicial.tsx` and `fase-1/src/assets/`
- [ ] T038 [P] [US1] Build `CartaoTeatro` component (banner com título, descrição e nota exibida como texto simples, ex.: "4.7 ★" — sem componente de estrelas configurável, resolve FR-026 e Principle "Sem Complexidade Não Ensinada") in `fase-1/src/componentes/CartaoTeatro.tsx`
- [ ] T039 [US1] Build `PaginaListaTeatros` lendo `teatros.json` e renderizando um `CartaoTeatro` por teatro, cada um linkando para `/teatros/:teatroId` in `fase-1/src/paginas/PaginaListaTeatros.tsx`
- [ ] T040 [US1] Add link de menu para `/teatros` no `Header` (já existente desde a fase-0) in `fase-1/src/componentes/Header.tsx`
- [ ] T041 [US1] Verify fase-1 correctness: `npm test` (fase-1 verde, fase-2..9 vermelhos) e `npm run build` in `fase-1/`
- [ ] T042 [P] [US1] Write `fase-1/README.md` explaining what this specific phase contains at `fase-1/README.md`
- [ ] T043 [US1] Write `fase-1/PASSO-A-PASSO.md`

**Checkpoint**: fluxo de navegação inicial (home → listagem → teatro) funciona; listagem/roteamento introduzidos antes do mapa de poltronas.

## Phase 4: US2 - Visualizar o mapa do teatro (fase-2)

**Goal**: teatro completo renderizado a partir de JSON local, reconhecível visualmente, dentro da `PaginaTeatro` já acessível via `/teatros/:nomeDoTeatro`.

**Independent Test**: abrir `fase-2` em `/teatros/teatro-municipal-de-sao-paulo`, ver palco/setores/fileiras/poltronas nas posições do JSON; `fase-1` e `fase-2.test.tsx` verdes.

- [ ] T044 [US2] Copy `fase-1/` into `fase-2/` as starting point
- [ ] T045 [US2] Implement `Teatro` component com `<svg>`/`viewBox` in `fase-2/src/componentes/Teatro.tsx`
- [ ] T046 [P] [US2] Implement `Setor` component in `fase-2/src/componentes/Setor.tsx`
- [ ] T047 [P] [US2] Implement `Fileira` component (Fragment, `map`/`key`) in `fase-2/src/componentes/Fileira.tsx`
- [ ] T048 [P] [US2] Implement `Assento` component posicionado por `coordinateX`/`coordinateY`/`angulo` in `fase-2/src/componentes/Assento.tsx`
- [ ] T049 [US2] Wire `PaginaTeatro` para renderizar `Teatro` a partir do JSON local importado (`layout-classico.json`) in `fase-2/src/paginas/PaginaTeatro.tsx`
- [ ] T050 [US2] Verify fase-2 correctness: `npm test` (fase-1,2 verdes, fase-3..9 vermelhos) e `npm run build` in `fase-2/`
- [ ] T051 [P] [US2] Write `fase-2/README.md` explaining what this specific phase contains at `fase-2/README.md`
- [ ] T052 [US2] Write `fase-2/PASSO-A-PASSO.md`

**Checkpoint**: fase-2 é um incremento completo e demonstrável sozinho.

## Phase 5: US3 - Selecionar poltronas disponíveis (fase-3)

**Goal**: clique em poltrona disponível seleciona/desmarca com destaque visual e mostra número/preço/detalhes.

**Independent Test**: clicar poltronas em `fase-3`, ver toggle de seleção e o painel com número/preço/detalhes da poltrona clicada; `fase-1..3.test.tsx` verdes.

- [ ] T053 [US3] Copy `fase-2/` into `fase-3/` as starting point
- [ ] T054 [US3] Add `poltronasSelecionadas` (`useState`) e callback `aoSelecionar` in `fase-3/src/componentes/Teatro.tsx`
- [ ] T055 [P] [US3] Thread `aoSelecionar` prop through `Setor` in `fase-3/src/componentes/Setor.tsx`
- [ ] T056 [P] [US3] Thread `aoSelecionar` prop through `Fileira` in `fase-3/src/componentes/Fileira.tsx`
- [ ] T057 [US3] Add `onClick`, toggle com spread/filter e estilo de destaque in `fase-3/src/componentes/Assento.tsx`
- [ ] T058 [US3] Show número, preço e detalhes (acessibilidade, status) da poltrona ao selecioná-la (resolve FR-021), num painel/tooltip in `fase-3/src/componentes/DetalhesPoltrona.tsx` and `fase-3/src/componentes/Teatro.tsx`
- [ ] T059 [US3] Verify fase-3 correctness: `npm test` (fase-1..3 verdes, fase-4..9 vermelhos) e `npm run build` in `fase-3/`
- [ ] T060 [P] [US3] Write `fase-3/README.md` explaining what this specific phase contains at `fase-3/README.md`
- [ ] T061 [US3] Write `fase-3/PASSO-A-PASSO.md`

**Checkpoint**: fase-3 entrega a interação central da tela.

## Phase 6: US4 - Respeitar regras de disponibilidade e acesso (fase-4)

**Goal**: status, regras herdadas, acessibilidade, tipo de acesso visível e estado derivado, com Immer.

**Independent Test**: tentar selecionar poltronas indisponíveis/reservadas/embargadas em `fase-4` e confirmar recusa; ver cor por `tipoAcesso` e legenda; `fase-1..4.test.tsx` verdes.

- [ ] T062 [US4] Copy `fase-3/` into `fase-4/` as starting point
- [ ] T063 [US4] Add rendering por `status` e guarda de seleção in `fase-4/src/componentes/Assento.tsx`
- [ ] T064 [P] [US4] Compute `regrasHerdadas` (`embargado`, `tipoAcesso`) descendo mesclado in `fase-4/src/componentes/Setor.tsx` and `fase-4/src/componentes/Fileira.tsx`
- [ ] T065 [P] [US4] Add marcação visual própria de acessibilidade in `fase-4/src/componentes/Assento.tsx`
- [ ] T066 [P] [US4] Colorir cada `Setor` por `tipoAcesso` (livre/pagante/exclusivoBradesco) e criar componente `Legenda` mapeando cor → tipoAcesso, renderizado no `Teatro` (resolve FR-006) in `fase-4/src/componentes/Setor.tsx` and `fase-4/src/componentes/Legenda.tsx`
- [ ] T067 [US4] Compute estado derivado (`quantidade`, total) no render in `fase-4/src/componentes/Teatro.tsx`
- [ ] T068 [US4] Refactor toggle e atualizações aninhadas com Immer `produce()` in `fase-4/src/componentes/Teatro.tsx`
- [ ] T069 [P] [US4] Write ADR for Immer (incluindo seção "Quando reconsiderar", ver `research.md`) in `docs/adr/0004-immer.md`
- [ ] T070 [P] [US4] Write playbook for Immer in `docs/playbooks/immer.md`
- [ ] T071 [US4] Verify fase-4 correctness: `npm test` (fase-1..4 verdes, fase-5..9 vermelhos) e `npm run build` in `fase-4/`
- [ ] T072 [P] [US4] Write `fase-4/README.md` explaining what this specific phase contains at `fase-4/README.md`
- [ ] T073 [US4] Write `fase-4/PASSO-A-PASSO.md`

**Checkpoint**: todas as regras de negócio visuais da spec (FR-002..FR-006, FR-017) estão cobertas.

## Phase 7: US5 - Carregar dados dinamicamente e trocar de teatro (fase-5)

**Goal**: layout vem de `GET /api/layout` via MSW, com loading/erro e múltiplos teatros.

**Independent Test**: em `fase-5`, ver loading ao abrir, erro simulado, e troca de teatro mudando o layout; `fase-1..5.test.tsx` verdes.

- [ ] T074 [US5] Copy `fase-4/` into `fase-5/` as starting point
- [ ] T075 [US5] Activate MSW handler for `GET /api/layout` e criar `buscarLayout` in `fase-5/src/servicos/layout.ts`
- [ ] T076 [US5] Read the `:nomeDoTeatro` route param via `useParams` in `PaginaTeatro` e repassar como `teatroId` para `buscarLayout` (resolve a ligação rota↔dado de `contracts/rotas-ui.md`) in `fase-5/src/paginas/PaginaTeatro.tsx`
- [ ] T077 [US5] Fetch layout via `useEffect` + async/await, com estados de loading/erro in `fase-5/src/paginas/PaginaTeatro.tsx`
- [ ] T078 [P] [US5] Add fixture `layout-redondo.json` (prioridade desta fase) e o handler correspondente in `fase-5/src/dados/` and `fase-5/src/mocks/handlers.ts`; `layout-funil.json` e `layout-multiAndar.json` ficam como extensão opcional de baixa prioridade nesta fase — podem ser adiados sem bloquear o checkpoint
- [ ] T079 [US5] Add seletor (`<select>`) trocando `teatroId` in `fase-5/src/paginas/PaginaTeatro.tsx`
- [ ] T080 [US5] Verify fase-5 correctness: `npm test` (fase-1..5 verdes, fase-6..9 vermelhos) e `npm run build` in `fase-5/`
- [ ] T081 [P] [US5] Write `fase-5/README.md` explaining what this specific phase contains at `fase-5/README.md`
- [ ] T082 [US5] Write `fase-5/PASSO-A-PASSO.md`

**Checkpoint**: aplicação passa a ser orientada a dados (FR-007, FR-008).

## Phase 8: US6 - Ser avisado em tempo real (fase-6)

**Goal**: polling com cleanup atualiza disponibilidade sozinho; `useContext` para `cadeirasEstofadas`.

**Independent Test**: em `fase-6`, aguardar o intervalo de polling e ver poltronas mudarem de status sem ação do usuário; poltrona selecionada que fica indisponível é desmarcada; `fase-1..6.test.tsx` verdes.

- [ ] T083 [US6] Copy `fase-5/` into `fase-6/` as starting point
- [ ] T084 [US6] Add segundo `useEffect` com `setInterval` (5s) + cleanup chamando `buscarLayout` in `fase-6/src/paginas/PaginaTeatro.tsx`
- [ ] T085 [US6] Add simulação de outros compradores, determinística sob teste, no handler MSW in `fase-6/src/mocks/handlers.ts`
- [ ] T086 [US6] Remover da seleção poltronas que ficaram indisponíveis e sinalizar ao usuário in `fase-6/src/componentes/Teatro.tsx`
- [ ] T087 [P] [US6] Add `TeatroContext` fornecendo `cadeirasEstofadas`, consumido em `Assento` in `fase-6/src/contexto/TeatroContext.tsx` and `fase-6/src/componentes/Assento.tsx`
- [ ] T088 [US6] Verify fase-6 correctness: `npm test` (fase-1..6 verdes, fase-7..9 vermelhos) e `npm run build` in `fase-6/`
- [ ] T089 [P] [US6] Write `fase-6/README.md` explaining what this specific phase contains at `fase-6/README.md`
- [ ] T090 [US6] Write `fase-6/PASSO-A-PASSO.md`

**Checkpoint**: versão final da TELA (sem carrinho/checkout) está completa (FR-009, FR-010).

## Phase 9: US7 - Adicionar poltronas ao carrinho (fase-7)

**Goal**: store Zustand de carrinho, com meia-entrada autodeclarada; modal fora da árvore do Teatro.

**Independent Test**: em `fase-7`, selecionar poltronas, clicar Comprar, ver modal com itens e total corretos; marcar um item como meia-entrada e ver o total recalculado; `fase-1..7.test.tsx` verdes.

- [ ] T091 [US7] Copy `fase-6/` into `fase-7/` as starting point
- [ ] T092 [US7] Create `useCarrinho` Zustand store (`itens`, `expiraEm`, `carrinhoAberto`, `adicionarAoCarrinho`, `liberarAssentos`) in `fase-7/src/stores/carrinho.ts`
- [ ] T093 [US7] Add botão "Comprar" chamando `adicionarAoCarrinho(poltronasSelecionadas)` in `fase-7/src/componentes/Teatro.tsx`
- [ ] T094 [US7] Create `CarrinhoModal` montada no `App`, fora da árvore do Teatro, lendo da store in `fase-7/src/componentes/CarrinhoModal.tsx`
- [ ] T095 [US7] Add toggle `meiaEntrada` por item do carrinho (autodeclarado, sem captura de documento) recalculando o total (item pela metade do `precoBase`) — resolve FR-017 in `fase-7/src/stores/carrinho.ts` and `fase-7/src/componentes/CarrinhoModal.tsx`
- [ ] T096 [P] [US7] Write ADR for Zustand (incluindo seção "Quando reconsiderar", ver `research.md`) in `docs/adr/0005-zustand.md`
- [ ] T097 [P] [US7] Write playbook for Zustand in `docs/playbooks/zustand.md`
- [ ] T098 [US7] Verify fase-7 correctness: `npm test` (fase-1..7 verdes, fase-8,9 vermelhos) e `npm run build` in `fase-7/`
- [ ] T099 [P] [US7] Write `fase-7/README.md` explaining what this specific phase contains at `fase-7/README.md`
- [ ] T100 [US7] Write `fase-7/PASSO-A-PASSO.md`

**Checkpoint**: FR-011 e FR-017 (via meia-entrada) e US7 completos — a "intenção de compra" existe.

## Phase 10: US8 - Reserva com prazo e navegação (fase-8)

**Goal**: holdTimer com expiração + liberação; React Router (já configurado desde a fase-0 em `/`, `/teatros` e `/teatros/:nomeDoTeatro`) ganha `/checkout` e `/sucesso`, e vira conteúdo de aula pela primeira vez.

**Independent Test**: em `fase-8`, ver contagem regressiva, deixar expirar e confirmar liberação; navegar entre `/teatros/...`, `/checkout` e `/sucesso` mantendo o carrinho; `fase-1..8.test.tsx` verdes.

- [ ] T101 [US8] Copy `fase-7/` into `fase-8/` as starting point
- [ ] T102 [US8] Add holdTimer countdown (`useEffect` + `useState` + `setInterval`, sem `useRef`) lendo `expiraEm` in `fase-8/src/componentes/CarrinhoModal.tsx`
- [ ] T103 [US8] Call `liberarAssentos` ao expirar in `fase-8/src/componentes/CarrinhoModal.tsx`
- [ ] T104 [US8] Add rotas `/checkout` (esqueleto) e `/sucesso` às rotas já existentes per `contracts/rotas-ui.md` — esta é a primeira vez que o React Router (presente desde a fase-0) vira matéria de aula in `fase-8/src/main.tsx` and `fase-8/src/paginas/`
- [ ] T105 [P] [US8] Write ADR for React Router (incluindo seção "Quando reconsiderar", ver `research.md`) in `docs/adr/0006-react-router.md`
- [ ] T106 [P] [US8] Write playbook for React Router in `docs/playbooks/react-router.md`
- [ ] T107 [US8] Verify fase-8 correctness: `npm test` (fase-1..8 verdes, fase-9 vermelho) e `npm run build` in `fase-8/`
- [ ] T108 [P] [US8] Write `fase-8/README.md` explaining what this specific phase contains at `fase-8/README.md`
- [ ] T109 [US8] Write `fase-8/PASSO-A-PASSO.md`

**Checkpoint**: FR-012..FR-014 completos; carrinho sobrevive à troca de rota.

## Phase 11: US9 - Concluir a compra (checkout) (fase-9)

**Goal**: checkout completo com React Hook Form + Zod, `POST /api/pedidos`, redirect para `/sucesso`.

**Independent Test**: em `fase-9`, preencher checkout com erro de campo (bloqueado) e depois válido (confirma pedido e mostra resumo); `fase-1..9.test.tsx` (suíte inteira) verdes.

- [ ] T110 [US9] Copy `fase-8/` into `fase-9/` as starting point
- [ ] T111 [US9] Define `CheckoutSchema` com Zod (`nome`, `email`, `cpf`, `endereco`, `formaPagamento`) in `fase-9/src/schemas/checkout.ts`
- [ ] T112 [US9] Build formulário de checkout com React Hook Form + `zodResolver`, itens vindos da store (incluindo total já ajustado por meia-entrada); se `itens` estiver vazio ao acessar `/checkout` diretamente, redireciona para `/teatros` (resolve edge case "checkout sem item no carrinho") in `fase-9/src/paginas/CheckoutPagina.tsx`
- [ ] T113 [US9] Add handler MSW para `POST /api/pedidos` per `contracts/api-mock.md` in `fase-9/src/mocks/handlers.ts`
- [ ] T114 [US9] Submit do pedido e redirect para `/sucesso` com resumo; se `POST /api/pedidos` retornar erro, exibir mensagem simples de erro na própria `CheckoutPagina` sem travar a tela (resolve edge case "envio do checkout falha") in `fase-9/src/paginas/CheckoutPagina.tsx` and `fase-9/src/paginas/SucessoPagina.tsx`
- [ ] T115 [US9] Show "Meus Ingressos" — lista simples dos itens comprados (setor, fileira, número) dentro do resumo da `SucessoPagina` in `fase-9/src/paginas/SucessoPagina.tsx`
- [ ] T116 [P] [US9] Write ADR for React Hook Form (incluindo seção "Quando reconsiderar", ver `research.md`) in `docs/adr/0007-react-hook-form.md`
- [ ] T117 [P] [US9] Write playbook for React Hook Form in `docs/playbooks/react-hook-form.md`
- [ ] T118 [P] [US9] Write ADR for Zod (incluindo seção "Quando reconsiderar", ver `research.md`) in `docs/adr/0008-zod.md`
- [ ] T119 [P] [US9] Write playbook for Zod in `docs/playbooks/zod.md`
- [ ] T120 [US9] Verify fase-9 correctness: `npm test` (suíte inteira verde) e `npm run build` in `fase-9/`
- [ ] T121 [P] [US9] Write `fase-9/README.md` explaining what this specific phase contains at `fase-9/README.md`
- [ ] T122 [US9] Write `fase-9/PASSO-A-PASSO.md`

**Checkpoint**: projeto final completo — todos os FRs e US da spec atendidos.

## Phase 12: Polish & Cross-Cutting Concerns

- [ ] T123 Finalize root `README.md` com instruções de execução confirmadas e tabela final de fases at `README.md`
- [ ] T124 Run `diff -rq` entre cada par de fases consecutivas e confirmar que só os arquivos esperados mudam (Principle I)
- [ ] T125 Revisar todos os `fase-N/PASSO-A-PASSO.md` contra o diff real entre pastas
- [ ] T126 Produzir sumário final: árvore de pastas, contagem de testes verdes/vermelhos por pasta, pendências (se houver)

## Dependencies & Execution Order

- **Setup (Phase 1)** → sem dependências, pode começar imediatamente.
- **Foundational (Phase 2)** → depende do Setup; BLOQUEIA todas as User Stories (fase-0 é a base copiada por todas as demais).
- **User Stories (Phase 3-11)** → estritamente sequenciais entre si: US2 depende de US1 completo (copia `fase-1/`), US3 depende de US2, ..., US9 depende de US8. Isso é exigido pela Principle I (cada fase é a anterior + diff) — não é possível paralelizar fases entre si, apenas tarefas `[P]` dentro da mesma fase.
- **Polish (Phase 12)** → depende de todas as User Stories completas.

## Parallel Execution Examples

Dentro da Foundational (Phase 2), após T004-T015 (scaffold) estarem prontos, os 9 arquivos de teste (T016-T024) e os 4 pares ADR+playbook (T026-T033) podem ser feitos em paralelo entre si.

Dentro de cada User Story, tarefas marcadas `[P]` (ex.: T045-T047 em US2, T063-T065 em US4, T104-T105 em US8) tocam arquivos diferentes e podem ser feitas em paralelo — mas só depois que a tarefa de "copy fase-(N-1) into fase-N" daquela fase estiver concluída, e antes da tarefa de verificação (`npm test`/`npm run build`) daquela fase.

## Implementation Strategy

**MVP = US1 (fase-1)**: navegação inicial (home + listagem de teatros) já entrega valor de demonstração e introduz listagem/roteamento com curva de aprendizado leve. **MVP do produto central = US1+US2 (fase-2)**: mapa do teatro visível, acessível a partir da listagem. **MVP mínimo de interação = US1+US2+US3 (fase-3)**: seleção funcionando é o menor incremento que já parece um produto completo.

Entrega incremental recomendada: Setup → Foundational → US1 → US2 → US3 → US4 → US5 → US6 → US7 → US8 → US9 → Polish, validando o critério verde/vermelho (Principle II) a cada checkpoint antes de avançar para a próxima fase — nunca pular a verificação real de testes.

Em US5 (fase-5), apenas o layout `redondo` é obrigatório para o checkpoint desta fase; `funil` e `multiAndar` podem ser adicionados depois sem bloquear o progresso para US6.
