# Playbook: Vitest + Testing Library neste projeto

Guia prático de como os testes são escritos e rodados no curso "Escolha de
Poltronas de Teatro". Para o porquê da escolha (vs. Jest, vs. Cypress), ver
`docs/adr/0009-testing-library.md`.

## Como rodar

Dentro de qualquer pasta `fase-N/`:

```bash
npm install
npm test
```

O critério de corretude do curso: na pasta `fase-N`, os arquivos
`fase-1.test.tsx` até `fase-N.test.tsx` devem passar (verde) e
`fase-(N+1).test.tsx` até `fase-9.test.tsx` devem falhar (vermelho) — isso é
esperado e faz parte do material didático, não é um bug. Na `fase-0`, os 9
arquivos falham; na `fase-9`, todos passam.

## Convenções de query: sempre prefira acessibilidade

Ordem de preferência ao escolher como pegar um elemento na tela (a mesma
recomendada pela própria Testing Library):

1. `getByRole` (ex.: `getByRole("button", { name: "Confirmar" })`)
2. `getByLabelText` (campos de formulário)
3. `getByText` (texto visível, quando não há papel/label claro)
4. `getByTestId` — **último recurso**, só quando nenhum dos anteriores é
   viável (ex.: elemento puramente visual sem papel semântico)

Se um componente só pode ser testado com `data-testid`, isso normalmente é
sinal de que falta um `aria-label` ou `role` explícito no componente —
prefira corrigir a acessibilidade do componente a recorrer ao `testId`.

## `user-event` em vez de `fireEvent`

Use `@testing-library/user-event` para simular interação (clique, digitar,
tab) — ele dispara a sequência completa de eventos que um usuário real
gera (`pointerdown`, `mousedown`, `focus`, etc.), diferente de `fireEvent`
que dispara um único evento sintético:

```ts
const user = userEvent.setup();
await user.click(screen.getByRole("button", { name: "Selecionar A1" }));
await user.type(screen.getByLabelText("CPF"), "12345678900");
```

## `jest-dom`: matchers que deixam a asserção legível

`@testing-library/jest-dom` adiciona matchers como `toBeInTheDocument()`,
`toBeDisabled()`, `toHaveTextContent()`. Prefira esses matchers a checagens
manuais de atributo/classe:

```ts
expect(screen.getByRole("button", { name: "Confirmar" })).toBeDisabled();
```

## Tempo simulado: `vi.useFakeTimers()`

Dois fluxos do curso dependem de tempo passando: o polling de disponibilidade
a cada 5s (fase-6+) e o `holdTimer` da reserva de poltronas (fase-8+). Em
vez de esperar tempo real nos testes (lento e instável), use timers falsos:

```ts
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it("expira a reserva após o tempo limite", async () => {
  render(<Teatro />);
  vi.advanceTimersByTime(5 * 60 * 1000); // avança 5 minutos "instantaneamente"
  // ...asserção do estado pós-expiração
});
```

Atenção: `vi.advanceTimersByTime` é síncrono e pode não disparar
`act()`/re-render automaticamente — combine com `await screen.findBy...`
(que já espera por atualizações) ou envolva o avanço em
`act(() => { vi.advanceTimersByTime(...) })` quando necessário.

## MSW nos testes (a partir da fase-5)

Os testes que dependem de `GET /api/layout` ou `POST /api/pedidos` usam
`setupServer` (mesmos handlers de `src/mocks/handlers.ts`) — ver
`docs/playbooks/msw.md` para os detalhes de setup/reset entre testes.

## Erros comuns

- **"Unable to find role ..."**: o elemento existe no DOM mas não tem o
  papel ARIA esperado — confira se é o elemento HTML certo (`<button>` em
  vez de `<div onClick>`) antes de trocar a query.
- **"Warning: An update to X inside a test was not wrapped in act(...)"**:
  geralmente sinal de uma atualização de estado assíncrona (ex.: resposta
  do MSW, timer) que o teste não esperou terminar — use `await
  screen.findBy...` (que aguarda) em vez de `getBy...` (que é síncrono) para
  qualquer coisa que aparece depois de um `fetch` ou timer.
- **Teste trava/nunca termina com fake timers**: normalmente falta
  `vi.useRealTimers()` no `afterEach`, ou o teste usa `await` sem nenhum
  `vi.advanceTimersByTime` correspondente para destravar uma Promise que
  depende de um timer.
- **`getByText` falha por texto quebrado em múltiplos elementos**: quando o
  texto está fragmentado por markup (ex.: `<span>` dentro do texto), use uma
  função matcher (`getByText((content, node) => ...)`) em vez de tentar
  bater a string exata.
