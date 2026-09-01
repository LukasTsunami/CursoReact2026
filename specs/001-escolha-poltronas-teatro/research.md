# Research: Escolha de Poltronas de Teatro

Nenhum `NEEDS CLARIFICATION` restou no Technical Context — a stack e as
restrições já vêm fixadas pela constituição do projeto e pelo prompt
original do curso. Este documento registra a decisão e as alternativas
consideradas para cada tecnologia, servindo de base direta para os ADRs em
`docs/adr/`.

## Build tool & dev server

**Decision**: Vite
**Rationale**: dev server instantâneo (esbuild) e HMR rápido, essencial para
demonstrar mudanças ao vivo em sala; configuração mínima para React+TS;
suporta `import.meta.env` usado para ligar/desligar o MSW.
**Alternatives considered**: Create React App (descontinuado, build lento),
Webpack manual (configuração pesada demais para o ritmo de uma aula), Next.js
(traz SSR/roteamento próprio que conflita com o objetivo de ensinar React
Router isoladamente na aula 4).
**Quando reconsiderar**: se o projeto precisasse de SSR/SSG por SEO ou
performance de carga inicial — fora de escopo para uma SPA didática.

## Linguagem

**Decision**: TypeScript, com tipos simples (sem generics avançados)
**Rationale**: os tipos do domínio documentam o contrato de dados sem exigir
uma aula de TypeScript; substitui `PropTypes` por checagem em tempo de
compilação.
**Alternatives considered**: JavaScript puro + PropTypes (rejeitado
explicitamente pela constituição — Principle III); TypeScript com tipos
avançados/genéricos (rejeitado — Principle V, foge do escopo didático).
**Quando reconsiderar**: em um time onde ninguém mais vai manter o projeto
em TS, ou onde o contrato de dados muda com tanta frequência que os tipos
viram atrito em vez de documentação.

## Mock de API

**Decision**: MSW (Mock Service Worker)
**Rationale**: intercepta `fetch` no nível de rede real (Service Worker no
navegador, mesmo handler nos testes via `setupServer`), permitindo ensinar
`fetch`/`useEffect` sem precisar de um backend de verdade.
**Alternatives considered**: mocks manuais de `fetch` com `vi.fn()` (não
reflete tráfego de rede real, exige duplicar lógica de mock entre navegador e
teste); `json-server` (processo externo separado, complica o passo
"`npm install && npm run dev`" de cada fase).
**Quando reconsiderar**: se existisse um backend real para apontar — MSW
existe justamente porque não há um.

## Atualizações imutáveis

**Decision**: Immer (`produce`)
**Rationale**: elimina a pirâmide de spreads aninhados ao atualizar um
assento dentro de uma fileira dentro de um setor — o problema documentado na
aula 2 do curso.
**Alternatives considered**: spread manual em todos os níveis (mantido
deliberadamente na fase-3 só para demonstrar a dor antes do refactor da
fase-4); bibliotecas de state management com Immer embutido substituindo o
`useState` local (rejeitado — a régua de estado do curso exige `useState`
local para seleção em andamento).
**Quando reconsiderar**: se o nível de aninhamento fosse raso o suficiente
para o spread manual continuar legível — nesse caso Immer seria uma
dependência a mais sem ganho real.

## Estado global (carrinho)

**Decision**: Zustand
**Rationale**: API mínima (`create`, actions, selectors) sem boilerplate de
Redux, permitindo que a modal do carrinho leia o estado fora da árvore do
`Teatro` sem Context.
**Alternatives considered**: Redux Toolkit (verboso demais para o tempo de
aula disponível); Context API como gerenciador de estado global (rejeitado
pela constituição — Context é só injeção estática, não gerenciador de
estado); Jotai/MobX (ecossistema menos difundido, mencionados apenas como
panorama na aula 4, não adotados no projeto).
**Quando reconsiderar**: se o projeto precisasse de time-travel debugging
ou de um middleware de auditoria maduro — aí a verbosidade do Redux Toolkit
passaria a compensar.

## Roteamento

**Decision**: React Router, instalado e configurado desde a `fase-0`
(`BrowserRouter` + `Routes` respondendo em `/` e `/teatros/:nomeDoTeatro`,
ambas renderizando `PaginaTeatro`), mas só ensinado como conceito na aula 4
(fase-8), quando as rotas `/checkout` e `/sucesso` são adicionadas.
**Rationale**: padrão de mercado para SPA em React; permite demonstrar
navegação entre a tela de seleção, o checkout e a confirmação com o
carrinho sobrevivendo à troca de rota (prova de estado global). Configurar
desde a fase-0 segue o mesmo padrão já usado para o MSW nesta feature
(biblioteca presente e funcional cedo, virando matéria de aula só depois) —
decisão explícita do usuário do curso, não uma escolha arquitetural nova.
**Alternatives considered**: roteamento manual via estado (`useState` de
"página atual") ou parsing manual de `window.location` — rejeitado por não
representar a prática real do ecossistema, que é o objetivo didático da
aula 4, e por já haver um precedente (MSW) para "biblioteca configurada
antes de virar aula" funcionar bem neste curso.
**Quando reconsiderar**: em uma aplicação com de fato só uma tela — o
Router existe aqui porque o projeto sempre teve mais de uma rota (mesmo
antes de a navegação virar conteúdo de aula).

## Formulário e validação (checkout)

**Decision**: React Hook Form + Zod (via `@hookform/resolvers`)
**Rationale**: `register`/`handleSubmit` com componentes não controlados
evita re-render a cada tecla (contraste direto com a demo do "jeito ruim"
na aula 4); Zod complementa os tipos estáticos com validação em runtime dos
dados que entram de fora (submissão do usuário).
**Alternatives considered**: `useState` por campo (rejeitado — é a
demonstração do problema, não a solução ensinada); Formik (mais verboso,
comunidade migrando para RHF); Yup no lugar de Zod (Zod tem melhor inferência
de tipos TS, alinhado à Principle V).
**Quando reconsiderar**: React Hook Form — se o formulário precisasse de
campos totalmente controlados/reativos a cada tecla (ex.: máscara complexa
recalculada em tempo real). Zod — se o schema precisasse ser compartilhado
com um backend real em outra linguagem (aí um formato agnóstico como JSON
Schema faria mais sentido).

## Testes

**Decision**: Vitest + Testing Library (react, jest-dom, user-event) + jsdom
**Rationale**: Vitest integra nativamente com Vite (mesma config, mesma
velocidade); Testing Library força queries acessíveis (`getByRole`,
`aria-label`), que é o padrão de qualidade de teste que o curso quer
ensinar; `vi.useFakeTimers()` cobre polling e holdTimer sem testes lentos ou
instáveis.
**Alternatives considered**: Jest (exigiria configuração paralela à do Vite,
duplicando manutenção); Cypress/Playwright para os testes de fase
(rejeitado — testes E2E são mais lentos e não servem bem como "juiz" rodado
a cada `npm test` dentro de uma aula).
**Quando reconsiderar**: Cypress/Playwright fariam sentido para testar o
fluxo real entre páginas depois que o projeto tivesse rotas — algo fora do
escopo de um curso que quer feedback rápido a cada `npm test`.

## Estratégia de fases idênticas exceto o diff

**Decision**: cada `fase-N` é criada copiando o conteúdo integral de
`fase-N-1` e aplicando somente o diff descrito na tabela de fases do
`prompt.md`, na ordem fase-0 → fase-9.
**Rationale**: é a única forma de garantir mecanicamente a Principle I
(`diff -r fase-N fase-N+1` mostra só o que mudou) sem depender de disciplina
manual durante a implementação.
**Alternatives considered**: gerar cada fase independentemente do zero
(alto risco de divergência de nomes/formatação entre fases, quebrando o
ponto de resgate que a Principle I exige).

## Critério de corretude verde/vermelho por fase

**Decision**: a mesma suíte de 9 arquivos de teste (`fase-1.test.tsx` até
`fase-9.test.tsx`) é copiada para todas as 10 pastas; a corretude de cada
pasta é validada rodando `npm test` de verdade e conferindo que os arquivos
1..N passam e N+1..9 falham (todos falham na fase-0, todos passam na
fase-9).
**Rationale**: é o mecanismo definido na Principle II (Testes Como Juiz) e
no prompt original — não pode ser presumido, só confirmado por execução.
**Alternatives considered**: suíte cumulativa que cresce a cada fase, sem os
testes das fases futuras presentes (rejeitado — perde o valor de mostrar ao
aluno exatamente o que ainda falta implementar, um recurso pedagógico
explícito do curso).
