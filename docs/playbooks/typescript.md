# Playbook: TypeScript neste projeto

Este guia mostra como usar TypeScript no dia a dia deste curso. Para o
"porquê" da escolha (e o que deliberadamente evitamos), veja
`docs/adr/0002-typescript.md`.

## Comandos comuns

De dentro da pasta da fase:

```bash
npm run build      # tsc -b (checa tipos de todo o projeto) + vite build
npx tsc -b         # roda só a checagem de tipos, sem gerar o bundle
npx tsc -b --watch # checagem de tipos em modo watch, útil enquanto edita
```

O `dev` (Vite) não checa tipos — ele só transpila. Se você quer saber se
seu código está tipando certo sem esperar o build inteiro, rode `npx tsc -b`
isoladamente.

## Convenções adotadas neste projeto

- **Tipos simples, sem generics avançados.** Este é um curso de React, não
  de TypeScript — evite tipos condicionais, mapped types elaborados ou
  generics com múltiplos parâmetros. Se um tipo está difícil de ler, ele
  provavelmente está complexo demais para o objetivo didático.
- **O contrato de domínio mora em `src/tipos.ts`.** Setor, fileira,
  poltrona, teatro, item de carrinho — todo tipo que representa um
  conceito do domínio da aplicação fica centralizado ali, não espalhado
  entre componentes.
- **Duas configurações de `tsconfig`, já prontas e não precisam mudar**:
  `tsconfig.app.json` (código de `src/`, roda no navegador, inclui `lib:
  DOM`) e `tsconfig.node.json` (o próprio `vite.config.ts`, roda em
  Node). O `tsconfig.json` da raiz só referencia os dois via
  `references`. Não é necessário editar nenhum dos três para o dia a dia
  do curso.
- **`verbatimModuleSyntax: true`**: imports de tipos precisam usar
  `import type`, não `import`. Ex.: `import type { Setor } from
  '../tipos'`. Isso deixa explícito, ao ler o import, o que é tipo (some
  em runtime) e o que é valor (existe em runtime).
- **`noUnusedLocals` e `noUnusedParameters` ligados**: variáveis e
  parâmetros declarados e não usados são erro de compilação, não só um
  aviso do editor. Prefixe com `_` (ex.: `_evento`) um parâmetro que você
  precisa declarar mas não vai usar.

## Erros comuns e como resolver

- **`error TS1484: '...' is a type and must be imported using a
  type-only import`**: troque `import { Foo }` por `import type { Foo }`
  quando `Foo` é só um tipo/interface. É o `verbatimModuleSyntax` cobrando
  a separação explícita.
- **`error TS6133: '...' is declared but its value is never read`**: sobrou
  um import, variável ou parâmetro sem uso. Remova, ou prefixe o parâmetro
  com `_` se ele precisa existir na assinatura da função mesmo sem ser
  usado (ex.: em um `map((item, _indice) => ...)`).
- **"Property does not exist on type X"**: normalmente é um sinal real de
  bug (acessando um campo que não existe naquele objeto), não um TypeScript
  "chato demais". Antes de usar `as any` para calar o erro, confira o tipo
  em `src/tipos.ts` — provavelmente o campo tem outro nome ou está em um
  nível diferente do objeto.
- **Tentação de usar `any` para "resolver rápido"**: evite. Se o tipo
  correto está difícil de escrever, é mais provável que a estrutura de
  dados precise de ajuste do que o tipo precise virar `any`. `any`
  desliga a checagem de tipos exatamente no lugar onde ela mais ajuda.
- **Editor mostra erro mas o build passa (ou vice-versa)**: geralmente é
  cache do TS Server do editor desatualizado. Reinicie o TS Server da IDE
  (na maioria dos editores, um comando como "Restart TS Server") antes de
  desconfiar de inconsistência real entre editor e `tsc`.
