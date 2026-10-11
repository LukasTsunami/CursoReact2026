import { useState } from "react";
import type { Assento as AssentoType, GlobalLayoutData } from "../tipos";
import DetalhesPoltrona, { type PoltronaDetalhe } from "./DetalhesPoltrona";
import Setor from "./Setor";

type PoltronaSelecionada = {
  setorId: string;
  fileiraId: string;
  numero: number;
};

type TeatroProps = {
  layout: GlobalLayoutData;
};

const Teatro = ({ layout }: TeatroProps) => {
  const [poltronasSelecionadas, setPoltronasSelecionadas] = useState<
    PoltronaSelecionada[]
  >([]);
  const [ultimaSelecionada, setUltimaSelecionada] =
    useState<PoltronaDetalhe | null>(null);

  const estaSelecionada = (
    setorId: string,
    fileiraId: string,
    numero: number,
  ) =>
    poltronasSelecionadas.some(
      (p) =>
        p.setorId === setorId && p.fileiraId === fileiraId && p.numero === numero,
    );

  const aoSelecionar = (
    setorId: string,
    fileiraId: string,
    fileiraNome: string,
    assento: AssentoType,
  ) => {
    if (estaSelecionada(setorId, fileiraId, assento.numero)) {
      setPoltronasSelecionadas(
        poltronasSelecionadas.filter(
          (p) =>
            !(
              p.setorId === setorId &&
              p.fileiraId === fileiraId &&
              p.numero === assento.numero
            ),
        ),
      );
      return;
    }

    setPoltronasSelecionadas([
      ...poltronasSelecionadas,
      { setorId, fileiraId, numero: assento.numero },
    ]);
    setUltimaSelecionada({
      fileiraNome,
      numero: assento.numero,
      preco: assento.preco,
      status: assento.status,
      acessibilidade: assento.acessibilidade,
    });
  };

  return (
    <>
      <div className="teatro">
        <img
          src={layout.imagemUrl}
          alt={`Mapa do teatro ${layout.nome}`}
          className="teatro__imagem"
        />
        {layout.setores.map((setor) => (
          <Setor
            key={setor.id}
            setor={setor}
            estaSelecionada={estaSelecionada}
            aoSelecionar={aoSelecionar}
          />
        ))}
      </div>
      <p className="teatro__contador">
        Poltronas selecionadas: {poltronasSelecionadas.length}
      </p>
      {ultimaSelecionada !== null && (
        <DetalhesPoltrona poltrona={ultimaSelecionada} />
      )}
    </>
  );
};

export default Teatro;
