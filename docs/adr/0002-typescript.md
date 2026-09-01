# ADR 0002: Usar TypeScript com tipos simples

## Status

Accepted

## Contexto

O projeto precisa de uma forma de documentar e validar em tempo de
compilação o contrato de dados do domínio (teatros, setores, fileiras,
poltronas, carrinho, etc.), que atravessa vários componentes e mocks de
API. A constituição do projeto (Principle III) rejeita explicitamente
`PropTypes` como alternativa. Ao mesmo tempo, o público-alvo é uma turma
de curso que está aprendendo React — não uma turma de TypeScript avançado
— então o uso de generics e tipos avançados também foi rejeitado
explicitamente (Principle V), para não desviar o foco pedagógico da aula.

Alternativas avaliadas:

- **JavaScript puro + PropTypes**: rejeitado pela constituição do projeto
  (Principle III) — checagem em runtime é mais fraca e menos didática do
  que checagem em tempo de compilação.
- **TypeScript com tipos avançados/genéricos**: rejeitado pela
  constituição (Principle V) — foge do escopo didático do curso, que quer
  ensinar React, não teoria de tipos.

## Decisão

Usar **TypeScript, com tipos simples** (sem generics avançados) em todo o
projeto.

Motivos principais:

- Os tipos do domínio (`src/tipos.ts`) documentam o contrato de dados sem
  exigir uma aula inteira de TypeScript.
- Substitui `PropTypes` por checagem em tempo de compilação, alinhado à
  constituição do projeto.

## Consequências

- Todo componente e toda função de domínio ganham tipagem estática,
  reduzindo uma classe inteira de bugs (campo digitado errado, `undefined`
  não tratado) antes mesmo de rodar o teste.
- O time evita deliberadamente padrões avançados de TS (generics
  complexos, tipos condicionais, mapped types elaborados) mesmo quando
  seriam "mais corretos" — a prioridade é legibilidade didática, não
  expressividade máxima do sistema de tipos.
- Novos arquivos de domínio devem seguir o mesmo estilo de tipos simples já
  presente em `src/tipos.ts`, para manter consistência entre fases.

## Quando reconsiderar

- Em um time onde ninguém mais vai manter o projeto em TypeScript depois
  do curso.
- Em um cenário onde o contrato de dados muda com tanta frequência que os
  tipos viram atrito (retrabalho constante) em vez de documentação útil.
