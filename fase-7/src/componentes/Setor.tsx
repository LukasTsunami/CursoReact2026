import type { Assento as AssentoType, Setor as SetorType } from "../tipos";
import Fileira from "./Fileira";

type SetorProps = {
  setor: SetorType;
  estaSelecionada: (setorId: string, fileiraId: string, numero: number) => boolean;
  aoSelecionar: (
    setorId: string,
    setorNome: string,
    fileiraId: string,
    fileiraNome: string,
    assento: AssentoType,
  ) => void;
};

const Setor = ({ setor, estaSelecionada, aoSelecionar }: SetorProps) => {
  const regrasDoSetor = { embargado: setor.embargado, tipoAcesso: setor.tipoAcesso };

  return (
    <>
      {setor.fileiras.map((fileira) => (
        <Fileira
          key={fileira.id}
          fileira={fileira}
          setorId={setor.id}
          setorNome={setor.nome}
          regrasDoSetor={regrasDoSetor}
          estaSelecionada={estaSelecionada}
          aoSelecionar={aoSelecionar}
        />
      ))}
    </>
  );
};

export default Setor;
