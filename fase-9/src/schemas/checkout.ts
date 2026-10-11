import { z } from "zod";

// Valida formato/tamanho dos campos de `DadosCheckout` (ver src/tipos.ts) —
// nunca lógica de negócio real (ex.: dígito verificador de CPF). O tipo do
// domínio continua sendo o manual em tipos.ts, não `z.infer` deste schema.
export const CheckoutSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.email("E-mail inválido"),
  cpf: z.string().length(11, "CPF inválido"),
  endereco: z.object({
    cep: z.string().min(1, "CEP obrigatório"),
    logradouro: z.string().min(1, "Logradouro obrigatório"),
    numero: z.string().min(1, "Número obrigatório"),
    cidade: z.string().min(1, "Cidade obrigatória"),
    estado: z.string().min(1, "Estado obrigatório"),
  }),
  formaPagamento: z.enum(["cartaoCredito", "pix", "boleto"], "Forma de pagamento obrigatória"),
});
