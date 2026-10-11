# fase-9 — Concluir a compra (checkout) (US9)

Última fase: o formulário completo de checkout, com validação por campo,
submissão via MSW e uma tela de sucesso com o resumo do pedido. Projeto
final do curso.

## O que esta fase adiciona sobre a fase-8

- **`src/schemas/checkout.ts`**: `CheckoutSchema` (Zod) valida
  formato/tamanho dos campos de `DadosCheckout` — nunca lógica de negócio
  real (sem dígito verificador de CPF). `DadosCheckout` continua sendo o
  tipo manual de `src/tipos.ts`, não `z.infer` do schema.
- **`CheckoutPagina`** ganha o formulário completo: React Hook Form +
  `zodResolver`, campos `nome`/`email`/`cpf`/`endereco.*`/
  `formaPagamento`, erro específico por campo, redirect para `/teatros`
  se o carrinho estiver vazio ao acessar a rota direto.
- Ao confirmar, `POST /api/pedidos` (MSW) e redirect para `/sucesso`; se a
  submissão falhar, uma mensagem de erro simples aparece na própria
  página (sem travar a tela).
- **`SucessoPagina`** ganha o resumo real: `<h1>Pedido confirmado</h1>` +
  "Meus Ingressos" — lista dos itens comprados (setor, fileira, número).

## Como rodar

```bash
npm install
npm run dev
npm test        # fase-1..9 verdes (suíte inteira)
npm run build   # deve compilar sem erro de TypeScript
```

## Critério final

Esta é a última fase: `npm test` deve mostrar os 9 arquivos de teste, os
34 testes, todos verdes — nenhum vermelho.
