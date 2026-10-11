# Passo a passo: fase-8 → fase-9

Esta fase parte de uma cópia integral da `fase-8` e completa o checkout
(US9 do spec). Ao final, a suíte inteira (`fase-1..9.test.tsx`) fica
verde — é a última fase do curso.

1. **Adicione `EnderecoEntrega`, `FormaPagamento` e `DadosCheckout`** em
   `src/tipos.ts` (per `data-model.md`) — os tipos manuais oficiais do
   domínio para o checkout.

2. **Crie `src/schemas/checkout.ts`**: `CheckoutSchema` com Zod
   (`z.object`, `z.email(...)`, `z.enum(...)`), com mensagem de erro por
   campo. Não use `z.infer` para gerar `DadosCheckout` — o tipo manual
   de `tipos.ts` continua sendo a fonte de verdade.

3. **Reescreva `CheckoutPagina.tsx`**: `useForm<DadosCheckout>({
   resolver: zodResolver(CheckoutSchema) })`; um `<div className="campo">`
   por campo, com `register("caminho")` e a mensagem de erro
   (`errors.campo?.message`) logo abaixo quando existir. Um `useEffect`
   redireciona para `/teatros` se o carrinho estiver vazio ao montar a
   página.

4. **Implemente `aoSubmeter`**: `POST /api/pedidos` (via `fetch`, com o
   corpo dos dados do formulário + `itens` do carrinho); se a resposta
   não for `ok`, mostra uma mensagem de erro simples na própria página
   (sem travar a tela); se for, `navigate("/sucesso")`.

5. **Complete `SucessoPagina.tsx`**: `<h1>Pedido confirmado</h1>` + seção
   "Meus Ingressos" listando os itens do carrinho (lidos direto da store
   Zustand — sobrevivem à navegação sem precisar de `location.state`).

6. **Escreva os ADR/playbook do React Hook Form e do Zod** em
   `docs/adr/0007-react-hook-form.md`, `docs/adr/0008-zod.md`,
   `docs/playbooks/react-hook-form.md`, `docs/playbooks/zod.md`.

7. **Rode `npm test`**: a suíte inteira (`fase-1.test.tsx` até
   `fase-9.test.tsx`) deve ficar verde. Rode `npm run build` para
   confirmar que compila sem erro de TypeScript.

**Checkpoint**: projeto final completo — todos os FRs e User Stories da
spec atendidos.
