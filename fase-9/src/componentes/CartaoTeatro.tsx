import { Link } from "react-router-dom";
import type { GlobalLayoutData } from "../tipos";

type CartaoTeatroProps = {
  teatro: GlobalLayoutData;
};

const CartaoTeatro = ({ teatro }: CartaoTeatroProps) => {
  return (
    <Link to={`/teatros/${teatro.teatroId}`} className="cartao-teatro">
      <h3>{teatro.nome}</h3>
      <p>{teatro.descricao}</p>
      <span className="cartao-teatro__nota">{teatro.nota} ★</span>
    </Link>
  );
};

export default CartaoTeatro;
