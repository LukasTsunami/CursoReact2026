import type { GlobalLayoutData } from "../tipos";
import Setor from "./Setor";

type TeatroProps = {
  layout: GlobalLayoutData;
};

const Teatro = ({ layout }: TeatroProps) => {
  return (
    <div className="teatro">
      <img
        src={layout.imagemUrl}
        alt={`Mapa do teatro ${layout.nome}`}
        className="teatro__imagem"
      />
      {layout.setores.map((setor) => (
        <Setor key={setor.id} setor={setor} />
      ))}
    </div>
  );
};

export default Teatro;
