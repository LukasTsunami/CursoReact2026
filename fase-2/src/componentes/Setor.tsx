import type { Setor as SetorType } from "../tipos";
import Fileira from "./Fileira";

type SetorProps = {
  setor: SetorType;
};

const Setor = ({ setor }: SetorProps) => {
  return (
    <>
      {setor.fileiras.map((fileira) => (
        <Fileira key={fileira.id} fileira={fileira} />
      ))}
    </>
  );
};

export default Setor;
