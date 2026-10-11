import type { Assento as AssentoType, Fileira as FileiraType } from "../tipos";
import Assento from "./Assento";

type FileiraProps = {
  fileira: FileiraType;
  setorId: string;
  estaSelecionada: (setorId: string, fileiraId: string, numero: number) => boolean;
  aoSelecionar: (
    setorId: string,
    fileiraId: string,
    fileiraNome: string,
    assento: AssentoType,
  ) => void;
};

const Fileira = ({
  fileira,
  setorId,
  estaSelecionada,
  aoSelecionar,
}: FileiraProps) => {
  return (
    <>
      {fileira.assentos.map((assento) => (
        <Assento
          key={assento.numero}
          assento={assento}
          nomeFileira={fileira.nome}
          selecionada={estaSelecionada(setorId, fileira.id, assento.numero)}
          aoClicar={() => {
            aoSelecionar(setorId, fileira.id, fileira.nome, assento);
          }}
        />
      ))}
    </>
  );
};

export default Fileira;
