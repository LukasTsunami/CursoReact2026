import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCarrinho } from "../stores/carrinho";

const formatarPreco = (preco: number) => `R$ ${preco.toFixed(2).replace(".", ",")}`;

const CarrinhoModal = () => {
  const {
    itens,
    expiraEm,
    carrinhoAberto,
    alternarMeiaEntrada,
    fecharCarrinho,
    liberarAssentos,
  } = useCarrinho();
  const [agora, setAgora] = useState(() => Date.now());

  // `expiraEm` é calculado no momento da compra, que pode acontecer bem
  // depois do primeiro mount deste componente — sem isso, `agora` fica
  // "velho" e a contagem regressiva começa errada.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAgora(Date.now());
  }, [expiraEm]);

  // holdTimer: contagem regressiva do prazo de reserva, sem useRef (regra
  // do curso). Quando o tempo acaba, libera as poltronas automaticamente.
  useEffect(() => {
    if (expiraEm === null) {
      return;
    }

    const intervalo = setInterval(() => {
      if (Date.now() >= expiraEm) {
        liberarAssentos();
        return;
      }
      setAgora(Date.now());
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, [expiraEm, liberarAssentos]);

  if (!carrinhoAberto) {
    return null;
  }

  const total = itens.reduce(
    (soma, item) => soma + (item.meiaEntrada ? item.precoBase / 2 : item.precoBase),
    0,
  );

  const segundosRestantes =
    expiraEm === null ? 0 : Math.max(0, Math.ceil((expiraEm - agora) / 1000));
  const minutos = Math.floor(segundosRestantes / 60);
  const segundos = segundosRestantes % 60;
  const contagemFormatada = `${minutos}:${segundos.toString().padStart(2, "0")}`;

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
      <p className="carrinho-modal__contagem">Expira em {contagemFormatada}</p>
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
      <Link
        to="/checkout"
        className="carrinho-modal__finalizar"
        onClick={fecharCarrinho}
      >
        Finalizar compra
      </Link>
    </div>
  );
};

export default CarrinhoModal;
