import { useCarrinho } from "../stores/carrinho";

const formatarPreco = (preco: number) => `R$ ${preco.toFixed(2).replace(".", ",")}`;

const CarrinhoModal = () => {
  const { itens, carrinhoAberto, alternarMeiaEntrada, fecharCarrinho } =
    useCarrinho();

  if (!carrinhoAberto) {
    return null;
  }

  const total = itens.reduce(
    (soma, item) => soma + (item.meiaEntrada ? item.precoBase / 2 : item.precoBase),
    0,
  );

  return (
    <div className="carrinho-modal" role="dialog" aria-label="Carrinho">
      <button
        type="button"
        className="carrinho-modal__fechar"
        aria-label="Fechar carrinho"
        onClick={fecharCarrinho}
      >
        ×
      </button>
      <h2>Carrinho</h2>
      <ul className="carrinho-modal__itens">
        {itens.map((item) => (
          <li key={`${item.setorId}-${item.fileiraId}-${item.numero}`}>
            <span>
              {item.setorNome} · {item.fileiraNome}
              {item.numero} · {formatarPreco(item.precoBase)}
            </span>
            <label>
              <input
                type="checkbox"
                checked={item.meiaEntrada}
                onChange={() => {
                  alternarMeiaEntrada(item.setorId, item.fileiraId, item.numero);
                }}
              />
              Meia-entrada
            </label>
          </li>
        ))}
      </ul>
      <p className="carrinho-modal__total">Total: {formatarPreco(total)}</p>
    </div>
  );
};

export default CarrinhoModal;
