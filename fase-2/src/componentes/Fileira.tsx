import type { Fileira as FileiraType } from "../tipos";
import Assento from "./Assento";

type FileiraProps = {
  fileira: FileiraType;
};

const Fileira = ({ fileira }: FileiraProps) => {
  return (
    <>
      {fileira.assentos.map((assento) => (
        <Assento
          key={assento.numero}
          assento={assento}
          nomeFileira={fileira.nome}
        />
      ))}
    </>
  );
};

export default Fileira;
