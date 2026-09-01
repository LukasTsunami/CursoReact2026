# Curso React: Escolha de Poltronas de Teatro

## Overview

Este é um curso **100% hands-on** de React focado em um projeto incremental: a construção de uma aplicação de escolha e compra de poltronas de teatro.

**Objetivo pedagógico**: introduzir React (componentes, props, estado, efeitos) e o ecossistema moderno (roteamento, fetch, gerenciamento de estado, validação de formulários) através de incrementos sucessivos, cada um entregando valor real e testável.

**Stack utilizada**:
- **Vite** + **React** 18 + **TypeScript** (tipos do domínio embutidos)
- **ESLint** (Standard Style) + **Prettier** (formatação automática)
- **React Router** (roteamento SPA)
- **Testing Library** + **MSW** (testes e mock de API)
- **Immer** (imutabilidade segura)
- **Zustand** (gerenciamento de estado global)
- **React Hook Form** + **Zod** (validação de formulários)
- **.vscode** com recomendações de extensões e settings para o time
- **Conventional Commits** (padrão de mensagens)

Cada fase (pasta `fase-N`) é um projeto completo, autossuficiente e funcionável. O aluno pode começar em qualquer fase abrindo a pasta e rodando `npm install && npm run dev`.

---

## Fases do Curso

| Fase | Nome / Goal | Como Rodar |
|------|-------------|-----------|
| **fase-0** | Foundational (Boilerplate) — Vite + TS, assets, CSS, SVGs, MSW, React Router (placeholders), suíte de testes (toda vermelha), ADRs e playbooks | `cd fase-0 && npm install && npm run dev` |
| **fase-1** | **US1** — Navegar da home até um teatro — tela inicial com hero "Reserve seu assento" + prova social + selos de confiança; listagem de teatros em `/teatros` com cards (título, descrição, nota); navegação até `/teatros/:teatroId` | `cd fase-1 && npm install && npm run dev` |
| **fase-2** | **US2** — Visualizar o mapa do teatro — teatro completo renderizado de JSON local (SVG), reconhecível visualmente (palco, setores, fileiras, poltronas nas posições corretas) | `cd fase-2 && npm install && npm run dev` |
| **fase-3** | **US3** — Selecionar poltronas disponíveis — clique seleciona/desmarca com destaque visual; painel mostrando número, preço e detalhes da poltrona selecionada | `cd fase-3 && npm install && npm run dev` |
| **fase-4** | **US4** — Respeitar regras de disponibilidade e acesso — status (disponível, ocupado, bloqueado, etc.), regras herdadas (setor embargado, acesso exclusivo), acessibilidade (PCD), refator com Immer | `cd fase-4 && npm install && npm run dev` |
| **fase-5** | **US5** — Carregar dados dinamicamente — layout vem de `GET /api/layout` via MSW; loading/erro; suporte a múltiplos teatros (troca de `teatroId` refaz o fetch) | `cd fase-5 && npm install && npm run dev` |
| **fase-6** | **US6** — Ser avisado em tempo real — polling (5s) atualiza disponibilidade sozinho; poltronas selecionadas que ficam indisponíveis são desmarcadas; `useContext` fornece `cadeirasEstofadas` | `cd fase-6 && npm install && npm run dev` |
| **fase-7** | **US7** — Adicionar poltronas ao carrinho — store Zustand com `itens`, `expiraEm`, `adicionarAoCarrinho`; modal do carrinho fora da árvore do Teatro; toggle de meia-entrada (autodeclarada) recalculando total | `cd fase-7 && npm install && npm run dev` |
| **fase-8** | **US8** — Reserva com prazo e navegação — holdTimer com contagem regressiva; expiração libera assentos; React Router vira conteúdo de aula (rotas `/checkout` e `/sucesso` adicionadas); Zustand como cola entre páginas | `cd fase-8 && npm install && npm run dev` |
| **fase-9** | **US9** — Concluir a compra (checkout) — formulário com React Hook Form + Zod (`nome`, `email`, `cpf`, `endereço`, `formaPagamento`); `POST /api/pedidos`; redirect para `/sucesso` com resumo dos ingressos; edge cases (carrinho vazio, erro no submit) | `cd fase-9 && npm install && npm run dev` |

---

## Como Executar

### Desenvolvimento

Cada fase é uma pasta independente com seu próprio `package.json` e `npm` environment.

```bash
# Entra na fase desejada
cd fase-N

# Instala dependências (primeira vez)
npm install

# Inicia servidor de desenvolvimento (Vite)
npm run dev
```

O servidor fica acessível em `http://localhost:5173` (ou a porta que Vite listar no console).

### Testes

```bash
# Na fase desejada, rodar toda a suíte
cd fase-N
npm test
```

Cada fase contém testes específicos (`fase-1.test.tsx`, `fase-2.test.tsx`, etc.). Os testes servem como **juiz** — um teste verde confirma que aquela fase foi implementada corretamente.

### Build para produção

```bash
cd fase-N
npm run build
```

Produz a saída otimizada em `fase-N/dist/`.

---

## Estrutura do Projeto

```
.
├── README.md (este arquivo)
├── docs/
│   ├── adr/              # Architecture Decision Records (por quê de cada tech)
│   └── playbooks/        # Como cada tecnologia foi configurada
├── fase-0/               # Boilerplate (base de todas as fases)
├── fase-1/               # US1: Navegação + Listagem
├── fase-2/               # US2: Renderização do Teatro
├── fase-3/               # US3: Seleção de Poltronas
├── fase-4/               # US4: Regras de Negócio
├── fase-5/               # US5: Dados de API
├── fase-6/               # US6: Tempo Real (Polling)
├── fase-7/               # US7: Carrinho (Zustand)
├── fase-8/               # US8: Reserva com Prazo
├── fase-9/               # US9: Checkout Completo
└── specs/
    └── 001-escolha-poltronas-teatro/  # Documentação (spec, data-model, etc.)
```

---

## Para Saber Mais

- **ADRs** (Architecture Decision Records): em `/docs/adr/`, explicam o porquê de cada tecnologia (Vite, TypeScript, MSW, Immer, Zustand, React Router, React Hook Form, Zod, Testing Library).
- **Playbooks**: em `/docs/playbooks/`, explicam o passo a passo de como cada tecnologia foi configurada.
- **Spec do Projeto**: em `/specs/001-escolha-poltronas-teatro/`, documentação completa (requisitos, data model, contratos de API, etc.).

---

## Checkpoints & Princípios

**Princípio II — Testes Como Juiz**: cada fase tem uma suíte de testes integrada. Um teste verde = aquela fase foi implementada corretamente. Um teste vermelho = falta fazer.

**Princípio I — Cada Fase é a Anterior + Diff Mínimo**: cada pasta `fase-N` começa como cópia da `fase-(N-1)`, e apenas os arquivos necessários para aquela US são modificados. Isso permite ao aluno:
- Fazer `diff fase-N fase-(N+1)` e ver exatamente o que mudou
- Abrir qualquer pasta e "resgatar" seu progresso se ficar pra trás

---

**Pronto para começar?** Abra `/fase-0`, rode `npm install && npm run dev`, e boa sorte!
