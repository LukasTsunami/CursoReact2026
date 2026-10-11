import type { Assento as AssentoType, Fileira as FileiraType, TipoAcesso } from "../tipos";
import Assento, { type RegrasHerdadas } from "./Assento";

type FileiraProps = {
  fileira: FileiraType;
  setorId: string;
  regrasDoSetor: { embargado: boolean; tipoAcesso: TipoAcesso };
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
  regrasDoSetor,
  estaSelecionada,
  aoSelecionar,
}: FileiraProps) => {
  const regrasHerdadas: RegrasHerdadas = {
    bloqueadaPelaHierarquia:
      regrasDoSetor.embargado || fileira.reservada || fileira.emManutencao,
    tipoAcesso: regrasDoSetor.tipoAcesso,
  };

  return (
    <>
      {fileira.assentos.map((assento) => (
        <Assento
          key={assento.numero}
          assento={assento}
          nomeFileira={fileira.nome}
          selecionada={estaSelecionada(setorId, fileira.id, assento.numero)}
          regrasHerdadas={regrasHerdadas}
          aoClicar={() => {
            aoSelecionar(setorId, fileira.id, fileira.nome, assento);
          }}
        />
      ))}
    </>
  );
};

export default Fileira;
