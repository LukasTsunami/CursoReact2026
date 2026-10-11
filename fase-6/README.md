# fase-6 — Ser avisado em tempo real sobre mudanças de disponibilidade (US6)

Esta fase adiciona polling: a cada 5s, o app busca o layout de novo para
simular outros compradores reservando poltronas, sem que o usuário precise
recarregar a página.

## O que esta fase adiciona sobre a fase-5

- **`PaginaTeatro`** ganha um segundo `useEffect`, com `setInterval` (5s) +
  `clearInterval` no cleanup, buscando o layout de novo a cada tick
  (FR-009). Falhas de uma chamada de polling isolada não derrubam a tela.
- **`src/mocks/handlers.ts`** passa a simular outros compradores: a partir
  da segunda chamada de `GET /api/layout` para o mesmo teatro, algumas
  poltronas antes `"disponivel"` viram `"ocupado"` — de forma
  **determinística** (baseada no número da chamada, nunca em
  `Math.random()`), para os testes não ficarem instáveis.
- **`Teatro`** ganha um `useEffect` que roda sempre que `layout` muda:
  confere se alguma poltrona selecionada deixou de estar `"disponivel"` e,
  se sim, remove ela da seleção e mostra um aviso (FR-010).
- **`TeatroContext`** (novo, em `src/contexto/`): fornece
  `cadeirasEstofadas` do `Teatro` direto para o `Assento`, sem passar por
  `Setor`/`Fileira` — exemplo de injeção estática via Context, não
  gerenciador de estado.

## Nota sobre os testes desta fase

Combinar `userEvent` com `vi.useFakeTimers()` trava indefinidamente neste
ambiente (o clique nunca resolve) — os testes desta fase usam
`fireEvent.click` no lugar de `userEvent.click` especificamente onde os
dois precisam conviver na mesma chamada.

## Como rodar

```bash
npm install
npm run dev
npm test        # fase-1..6 verdes; fase-7..9 vermelhos
npm run build   # deve compilar sem erro de TypeScript
```
