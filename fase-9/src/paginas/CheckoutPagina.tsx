import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CheckoutSchema } from "../schemas/checkout";
import { useCarrinho } from "../stores/carrinho";
import type { DadosCheckout } from "../tipos";

const formatarPreco = (preco: number) => `R$ ${preco.toFixed(2).replace(".", ",")}`;

const CheckoutPagina = () => {
  const itens = useCarrinho((estado) => estado.itens);
  const navigate = useNavigate();
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DadosCheckout>({
    resolver: zodResolver(CheckoutSchema),
  });

  // Acessar /checkout direto, sem nada no carrinho, não faz sentido —
  // manda o visitante de volta para a listagem.
  useEffect(() => {
    if (itens.length === 0) {
      navigate("/teatros");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = itens.reduce(
    (soma, item) => soma + (item.meiaEntrada ? item.precoBase / 2 : item.precoBase),
    0,
  );

  const aoSubmeter = async (dados: DadosCheckout) => {
    setErroEnvio(null);
    try {
      const resposta = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, itens }),
      });
      if (!resposta.ok) {
        throw new Error("Não foi possível confirmar o pedido");
      }
      navigate("/sucesso");
    } catch {
      setErroEnvio("Não foi possível confirmar o pedido");
    }
  };

  return (
    <main className="pagina-checkout">
      <h1>Checkout</h1>
      <p>Total: {formatarPreco(total)}</p>
      <form onSubmit={handleSubmit(aoSubmeter)} noValidate>
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input id="nome" {...register("nome")} />
          {errors.nome && <p role="alert">{errors.nome.message}</p>}
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail</label>
          <input id="email" {...register("email")} />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>

        <div className="campo">
          <label htmlFor="cpf">CPF</label>
          <input id="cpf" {...register("cpf")} />
          {errors.cpf && <p role="alert">{errors.cpf.message}</p>}
        </div>

        <div className="campo">
          <label htmlFor="cep">CEP</label>
          <input id="cep" {...register("endereco.cep")} />
          {errors.endereco?.cep && <p role="alert">{errors.endereco.cep.message}</p>}
        </div>

        <div className="campo">
          <label htmlFor="logradouro">Logradouro</label>
          <input id="logradouro" {...register("endereco.logradouro")} />
          {errors.endereco?.logradouro && (
            <p role="alert">{errors.endereco.logradouro.message}</p>
          )}
        </div>

        <div className="campo">
          <label htmlFor="numero">Número</label>
          <input id="numero" {...register("endereco.numero")} />
          {errors.endereco?.numero && (
            <p role="alert">{errors.endereco.numero.message}</p>
          )}
        </div>

        <div className="campo">
          <label htmlFor="cidade">Cidade</label>
          <input id="cidade" {...register("endereco.cidade")} />
          {errors.endereco?.cidade && (
            <p role="alert">{errors.endereco.cidade.message}</p>
          )}
        </div>

        <div className="campo">
          <label htmlFor="estado">Estado</label>
          <input id="estado" {...register("endereco.estado")} />
          {errors.endereco?.estado && (
            <p role="alert">{errors.endereco.estado.message}</p>
          )}
        </div>

        <div className="campo">
          <label htmlFor="formaPagamento">Forma de pagamento</label>
          <select id="formaPagamento" {...register("formaPagamento")}>
            <option value="cartaoCredito">Cartão de Crédito</option>
            <option value="pix">Pix</option>
            <option value="boleto">Boleto</option>
          </select>
          {errors.formaPagamento && (
            <p role="alert">{errors.formaPagamento.message}</p>
          )}
        </div>

        {erroEnvio !== null && <p role="alert">{erroEnvio}</p>}

        <button type="submit">Confirmar pedido</button>
      </form>
    </main>
  );
};

export default CheckoutPagina;
