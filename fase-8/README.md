# fase-8 — Reserva com prazo e navegação entre páginas (US8)

Esta fase adiciona a contagem regressiva da reserva (holdTimer), a
liberação automática das poltronas quando o prazo expira, e as rotas
`/checkout` e `/sucesso` — o React Router, presente desde a fase-0, vira
conteúdo de aula pela primeira vez.

## O que esta fase adiciona sobre a fase-7

- **`CarrinhoModal`** ganha o holdTimer: `useEffect` + `useState` +
  `setInterval` (sem `useRef`) mostrando "Expira em mm:ss"; quando o
  tempo acaba, chama `liberarAssentos()` da store automaticamente.
- **Rotas novas**: `/checkout` (`CheckoutPagina`, esqueleto — o formulário
  completo é a fase-9) e `/sucesso` (`SucessoPagina`, placeholder). Essas
  rotas já usam o mesmo `React Router` configurado desde a fase-0.
- O link "Finalizar compra" na modal fecha o carrinho (`fecharCarrinho`) e
  navega para `/checkout` — os itens continuam na store Zustand, então
  `CheckoutPagina` já mostra o total correto.

## Como rodar

```bash
npm install
npm run dev
npm test        # fase-1..8 verdes; fase-9 vermelho
npm run build   # deve compilar sem erro de TypeScript
```
