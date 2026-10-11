import { useCarrinho } from "../stores/carrinho";

const formatarPreco = (preco: number) => `R$ ${preco.toFixed(2).replace(".", ",")}`;

const CheckoutPagina = () => {
  const itens = useCarrinho((estado) => estado.itens);
  const total = itens.reduce(
    (soma, item) => soma + (item.meiaEntrada ? item.precoBase / 2 : item.precoBase),
    0,
  );

  return (
    <main className="pagina-checkout">
      <h1>Checkout</h1>
      <p>Total: {formatarPreco(total)}</p>
    </main>
  );
};

export default CheckoutPagina;
