# 0009 - Testes com Vitest + Testing Library

## Status

Accepted

## Contexto

O curso usa a mesma suíte de 9 arquivos de teste (`fase-1.test.tsx` até
`fase-9.test.tsx`) replicada em todas as 10 pastas do projeto, servindo como
critério objetivo e executável de corretude por fase (Principle II — Testes
Como Juiz): os arquivos 1..N devem passar e N+1..9 devem falhar em cada
pasta `fase-N`, confirmado rodando `npm test` de verdade, nunca presumido.

Isso exige uma ferramenta de teste que rode rápido o suficiente para ser
executada a cada iteração dentro de uma aula, que integre bem com o Vite (já
escolhido como build tool — ver `docs/adr/0001-vite.md`), e que empurre o
aluno para escrever testes que reflitam como um usuário de verdade interage
com a tela, já que boa parte do valor pedagógico do curso é justamente
ensinar a testar componentes React de forma acessível.

## Decisão

Usar **Vitest** como test runner, com **Testing Library**
(`@testing-library/react`, `@testing-library/jest-dom`,
`@testing-library/user-event`) e **jsdom** como ambiente DOM.

Vitest reaproveita a configuração do Vite (mesmo `vite.config.ts`, mesma
transformação de TS/JSX), então não existe uma configuração de build
paralela a manter. Testing Library força queries acessíveis (`getByRole`,
`getByLabelText`, `aria-label`) em vez de seletores por classe/`data-testid`
soltos, o que é o padrão de qualidade de teste que o curso quer ensinar.
`user-event` simula interação de usuário (clique, digitação) de forma mais
realista que disparar eventos DOM manualmente. Comportamento assíncrono
como polling (fase-6+) e o `holdTimer` da reserva (fase-8+) é controlado com
`vi.useFakeTimers()`, evitando testes lentos ou instáveis por depender de
tempo real.

## Consequências

- **Positivas**: um único comando (`npm test`) roda a suíte com a mesma
  velocidade do dev server do Vite; os testes documentam o comportamento
  esperado do ponto de vista do usuário (papel/label/texto visível), não de
  detalhes de implementação; fácil detectar regressão de acessibilidade
  (se um elemento não tem `role`/label acessível, a query falha).
- **Negativas**: exige que o aluno aprenda a pensar em "papel ARIA" em vez
  de simplesmente pegar um elemento por classe CSS, o que tem uma curva de
  aprendizado inicial; `jsdom` não é um navegador real — comportamentos
  muito específicos de layout/CSS não são cobertos por esses testes.

## Alternativas consideradas

- **Jest**: rejeitado — exigiria uma configuração de transformação paralela
  à do Vite (Babel ou `ts-jest`), duplicando manutenção sem ganho relevante
  para o escopo do curso.
- **Cypress/Playwright** (para os testes de fase, não só como menção de
  panorama): rejeitado — testes E2E reais são mais lentos e não servem bem
  como "juiz" rodado a cada `npm test` dentro do ritmo de uma aula.

## Quando reconsiderar

Cypress/Playwright fariam sentido para testar o fluxo real entre páginas
depois que o projeto tivesse rotas de verdade em produção (navegação,
persistência entre páginas, etc.) — mas isso está fora do escopo de um
curso que quer feedback rápido a cada `npm test`. Se o projeto deixasse de
ser um material didático de fases isoladas e passasse a ser um produto com
fluxos críticos de ponta a ponta, valeria reconsiderar complementar (não
substituir) a suíte atual com testes E2E.
