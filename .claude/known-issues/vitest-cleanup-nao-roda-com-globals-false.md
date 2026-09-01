# Testing Library não faz cleanup automático entre testes (vitest `globals: false`)

**Data**: 2026-08-31

## Sintoma e como reproduzir

Em um arquivo de teste com mais de um `render(...)` da mesma árvore/texto (ex.:
dois testes que ambos renderizam `<App><PaginaInicial /></App>`), queries como
`screen.getByText(/algum texto/i)` ou `screen.getByRole(...)` passam a falhar
com `TestingLibraryElementError: Found multiple elements with the text: ...`,
mesmo que cada teste individualmente só renderize o elemento uma vez.

Reproduzido em `fase-1/src/tests/fase-1.test.tsx`: o 1º teste passava sozinho,
mas o 2º teste (que também dá `render` em `/`) via 2 elementos "Ópera" na
tela — um do teste atual e um "vazado" do teste anterior que nunca foi
desmontado do DOM.

## Causa raiz

`@testing-library/react` só registra cleanup automático entre testes se
detectar um `afterEach` global (`typeof afterEach === 'function'` no escopo
global — ver `node_modules/@testing-library/react/dist/index.js`). O projeto
usa `vitest.config.ts` com `test.globals: false` (decisão deliberada para não
poluir o escopo global com `describe`/`it`/`expect` implícitos), então esse
`afterEach` nunca existe como global e o auto-cleanup nunca dispara — o DOM
de um teste vaza para o próximo teste do mesmo arquivo.

Esse é um problema estrutural herdado de `fase-0/vitest-setup.ts` e
`fase-0/vitest.config.ts`, copiados para todas as fases seguintes — qualquer
`*.test.tsx` com mais de um `render()` pode ser afetado.

## Correção aplicada

Import explícito de `afterEach` do `vitest` e `cleanup` do
`@testing-library/react`, chamando `afterEach(cleanup)` manualmente no setup
global de testes (`vitest-setup.ts`), em vez de depender da detecção
automática:

```ts
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(cleanup)
```

Aplicado em `fase-1/vitest-setup.ts`. Como cada fase é uma cópia física da
anterior (Principle I do projeto), **este mesmo fix precisa ser propagado
para `fase-0/vitest-setup.ts` e replicado manualmente em qualquer fase já
copiada antes desta correção**, para que o problema não seja "redescoberto"
fase a fase.
