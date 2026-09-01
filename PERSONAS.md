# Personas do Curso — Cobertura Didática

Documento gerado a partir de uma sessão de "grilling" para checar se a
didática do curso (constituição, spec, plano e tasks do repositório
`curso-react`) cobre diferentes perfis de aluno. Duas listas independentes
(sem cruzamento): **Eixo A** (modo de engajamento com a aula/repositório) e
**Eixo B** (experiência prévia com programação/React).

**Achado principal, transversal a várias personas**: parte do que cobre
lacunas didáticas hoje (mini-blocos de JS básico, painel de gerenciadores de
estado, "quando NÃO usar X") vive só no *slide deck* (`outlines.md`), que
está fora do escopo do que este projeto de spec-kit controla. Qualquer
persona que dependa **só do repositório** (sem ter visto os slides ou
assistido à aula) fica sem essas explicações. Ver A5, B1 e B4 abaixo.

## Eixo A — Modo de engajamento

### A1. Acompanha a aula e entende tudo

- **Descrição**: está na aula ao vivo, digitando junto, entendendo cada conceito na hora.
- **Necessidade principal**: o código ao vivo precisa bater exatamente com o que ela está digitando, sem desvio.
- **Frustração típica**: se o código da fase diverge do que o instrutor mostra (por alguma "melhoria" não pedida), ela perde a sincronia mesmo entendendo o conceito.
- **Cobertura**: **Boa.** A regra "Sem Complexidade Não Ensinada" (constitution.md, 23 itens + regra de fechamento) existe exatamente para isso — garante que o código de cada fase é o que um instrutor escreveria ao vivo, sem "boas práticas" que ela não reconheceria. Diff mínimo entre fases (Principle I) preserva o que ela já digitou. Comentários só na primeira ocorrência evitam ruído pra quem já entendeu.
- **Gap**: nenhum identificado.

### A2. Assiste mas está sempre atrasado

- **Descrição**: acompanha a aula, mas fica pra trás no ritmo — ainda está no passo N enquanto o instrutor já foi pro N+2.
- **Necessidade principal**: a redação do material (comentários no código, nomes, PASSO-A-PASSO) precisa mantê-la orientada mesmo perdendo alguns minutos, sem pressupor que ela acabou de ver o passo imediatamente anterior.
- **Frustração típica**: um comentário do tipo "// continuando o que fizemos" que pressupõe contexto recente e verbal.
- **Cobertura**: **Parcial.** A nomenclatura consistente (domínio PT / React EN, Principle IV) e os tipos como documentação (Principle V) ajudam a reconhecer o que está na tela mesmo sem ter acompanhado o passo exato.
- **Gap**: não existe hoje uma diretriz explícita de que comentários e PASSO-A-PASSO devem ser **autocontidos** (não podem pressupor que o leitor "acabou de ouvir" a explicação verbal do instrutor). A regra atual só cobre *quando* comentar (primeira ocorrência), não *como* redigir para quem chegou atrasado.

### A3. Perdeu uma parte da aula e abriu o projeto pra recuperar (durante a aula)

- **Descrição**: percebeu que ficou pra trás, abre o repositório no meio da aula pra tentar entender sozinha a parte perdida.
- **Necessidade principal**: abrir a pasta da fase certa e entender o que mudou e por quê, sem depender de ter ouvido a explicação.
- **Frustração típica**: abrir a fase errada (muito antiga ou ainda não ensinada) e não saber qual é a "atual".
- **Cobertura**: **Muito boa — é a persona-alvo original da Principle I.** O rationale da própria constituição diz literalmente: "um aluno que se perdeu precisa conseguir abrir qualquer pasta de fase e continuar dali". O `PASSO-A-PASSO.md` e o novo `README.md` por fase reforçam isso. O critério verde/vermelho da suíte de testes (Principle II) dá uma forma objetiva de confirmar "cheguei onde deveria".
- **Gap**: menor, e operacional (não é gap de artefato): nada no repositório indica automaticamente "qual fase corresponde ao momento atual da aula" — isso depende do instrutor anunciar em voz alta.

### A4. Revisa a aula anterior antes da aula de hoje

- **Descrição**: antes de a aula do dia começar, reabre o projeto da aula passada pra reforçar.
- **Necessidade principal**: repassar rápido "o que rolou" sem reler tudo do zero.
- **Frustração típica**: ter que diferenciar manualmente o que é novo daquela fase do que já vinha de antes.
- **Cobertura**: **Boa.** `PASSO-A-PASSO.md` narra exatamente o diff daquela fase; o `README.md` por fase resume o conteúdo; `diff -rq fase-N-1 fase-N` (documentado em `quickstart.md`) dá uma forma objetiva e exata de ver o que mudou.
- **Gap**: nenhum crítico.

### A5. Só tem o repositório, sem ter assistido a nenhuma aula

- **Descrição**: acesso só ao repositório público, sem contexto de slide ou instrutor.
- **Necessidade principal**: o repositório precisa ser autossuficiente.
- **Frustração típica**: ADR/playbook/PASSO-A-PASSO que pressupõem "como vimos na aula" sem repetir o contexto por escrito.
- **Cobertura**: **Parcial — maior gap real da avaliação.** A intenção já está declarada: Principle VI diz que ADRs e playbooks são "escritos para leitores iniciantes" e devem funcionar como "referência de consulta pós-curso" (não só script de aula). Mas nada hoje *garante* que o conteúdo evite depender de contexto que só existe nos slides (`outlines.md`), que está fora do nosso escopo de edição.
- **Recomendação**: adicionar, ao checklist de qualidade de ADR/playbook/PASSO-A-PASSO, um critério explícito: "compreensível por alguém que nunca assistiu a nenhuma aula do curso".

### A6. Pegou pra aprender tudo de uma vez (todas as fases em sequência)

- **Descrição**: baixou o repositório e passa pelas 10 fases seguidas, sem o espaçamento de uma aula por vez.
- **Necessidade principal**: a progressão entre fases precisa ser coerente e não repetitiva quando lida rápido e em sequência.
- **Frustração típica**: reler comentários explicativos parecidos (mas não idênticos) em fases consecutivas, algo que só incomoda quando lido tudo de uma vez.
- **Cobertura**: **Boa.** As 10 fases são desenhadas para leitura sequencial fase-0→fase-9; a tarefa de auditoria de diff entre todas as fases consecutivas (T112 em `tasks.md`) garante ausência de divergência de nomenclatura que confundiria uma leitura contínua.
- **Gap**: menor — risco de comentários didáticos redundantes entre fases (regra de "primeira ocorrência" é por fase, não global) quando lidos em sequência rápida. Baixa prioridade.

## Eixo B — Experiência prévia

### B1. Sabe HTML/CSS/JS básico, mas não React

- **Descrição**: confortável com a linguagem de base, nunca escreveu um componente React.
- **Necessidade principal**: os conceitos de ES6+ usados no projeto (arrow functions, destructuring, spread, template literals) precisam ser cobertos antes de aparecerem no código.
- **Frustração típica**: sintaxe de JSX/ES6 usada sem explicação, assumida como "básica".
- **Cobertura**: **Boa, mas vive fora do nosso escopo.** É a persona-alvo original do curso — o `outlines.md` dedica slides específicos a esses tópicos de JS antes de usá-los. A constituição reforça (proibição de sofisticação de TS — ela só precisa *ler* tipos, não escrevê-los).
- **Gap**: se essa persona for **também** A5 (self-study, sem slides), ela perde essas explicações de JS básico, porque elas só existem no slide deck, não no README/PASSO-A-PASSO do repositório. Combinação de risco: **B1 + A5**.

### B2. Já mexeu com React, mas raso

- **Descrição**: já fez um tutorial/projeto pequeno, conhece `useState`/JSX básico, nunca viu padrões mais avançados.
- **Necessidade principal**: não quer reexplicação do que já sabe — quer chegar rápido ao que é novo (Immer, Zustand, Context, Router, RHF+Zod).
- **Frustração típica**: comentários básicos demais atrapalhando o ritmo.
- **Cobertura**: **Boa.** "Comentário só na primeira ocorrência do conceito naquela fase" já evita reexplicar `useState`/props nas fases avançadas; a stack progressiva (uma novidade por fase) permite avançar rápido pelo que ela já sabe.
- **Gap**: nenhum crítico.

### B3. Dev experiente vindo de outra stack (backend, Vue, Angular etc.)

- **Descrição**: sênior, mas sem experiência prévia em React especificamente.
- **Necessidade principal**: entender o **porquê** das escolhas de arquitetura, não só o "como fazer".
- **Frustração típica**: convenções seguidas "porque sim", sem justificar a decisão frente ao que ela já conhece de outra stack.
- **Cobertura**: **Muito boa — a persona mais bem atendida.** Os ADRs (Contexto → Decisão → Alternativas consideradas → Consequências, Principle VI) foram desenhados exatamente pra essa pergunta ("por que Zustand e não Redux", etc.); `research.md` desta feature documenta alternativas consideradas para cada tecnologia com o mesmo espírito.
- **Gap**: nenhum.

### B4. Dev frontend que já trampa com React e quer aprender algo a mais

- **Descrição**: já usa React profissionalmente, busca algo além do básico.
- **Necessidade principal**: conteúdo de "mundo real" — trade-offs, quando NÃO usar cada peça da stack.
- **Frustração típica**: o curso inteiro sendo fundamentos básicos, sem nada de "big picture" pra ela aproveitar.
- **Cobertura**: **Parcial — segundo maior gap.** A Aula 5 do `outlines.md` cobre isso (painel de gerenciadores de estado, quando não usar Next.js, over-engineering) — mas de novo, só nos slides. Nos artefatos que este projeto controla (ADR, playbook, código), por desenho (regra "Sem Complexidade Não Ensinada"), só existe o caminho mínimo necessário — nenhum ADR discute os limites/quando NÃO seria a escolha certa em produção, só justifica a escolha feita.
- **Recomendação**: se algum dia os ADRs forem revisados, considerar uma seção opcional "quando reconsiderar essa escolha" — sem violar a regra de simplicidade do código em si, já que isso seria só documentação.

## Resumo de gaps priorizados

| # | Persona(s) | Gap | Prioridade | Status |
|---|---|---|---|---|
| 1 | A5 (+ B1, B4 combinadas) | Repositório depende de contexto que só existe nos slides (`outlines.md`), fora do nosso escopo de edição | Alta | **Resolvido parcialmente** — constitution.md v1.7.0 (Principle VI) agora exige que ADR/playbook/README/PASSO-A-PASSO sejam compreensíveis sem ter assistido a nenhuma aula. Não resolve o conteúdo que só existe nos slides em si (fora de escopo). |
| 2 | A2 | Falta diretriz de que comentários/PASSO-A-PASSO devem ser autocontidos (não pressupor contexto verbal recente) | Média | **Resolvido** — constitution.md v1.7.0 (Restrições Técnicas) proíbe comentários que pressupõem que o leitor "acabou de ver/fazer" algo na aula. |
| 3 | B4 | Nenhum ADR discute limites/quando não usar cada tecnologia | Baixa | **Resolvido** — constitution.md v1.8.0 exige uma 5ª seção "Quando reconsiderar" em todo ADR; `research.md` já tem essa análise para as 8 tecnologias (base direta para as ADRs). |
| 4 | A6 | Risco de comentários redundantes entre fases lidas em sequência rápida | Baixa | **Resolvido** — constitution.md v1.8.0 exige que comentários sobre um conceito recorrente em fase diferente reconheçam o padrão já visto e foquem só na diferença, em vez de reexplicar do zero. |

Os quatro gaps identificados nesta avaliação foram endereçados via emendas
à constituição (v1.7.0 e v1.8.0, ver Sync Impact Report em
`.specify/memory/constitution.md`). O item 1 permanece parcial por
natureza — o conteúdo que só existe nos slides do curso está fora do
escopo deste projeto de spec-kit.
