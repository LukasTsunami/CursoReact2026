import { produce } from "immer";
import { useState } from "react";
import type { Assento as AssentoType, GlobalLayoutData } from "../tipos";
import DetalhesPoltrona, { type PoltronaDetalhe } from "./DetalhesPoltrona";
import Legenda from "./Legenda";
import Setor from "./Setor";

type PoltronaSelecionada = {
  setorId: string;
  fileiraId: string;
  numero: number;
  preco: number;
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

  // Estado derivado: nunca guardado em outro useState, sempre calculado no
  // render a partir de poltronasSelecionadas.
  const quantidade = poltronasSelecionadas.length;
  const total = poltronasSelecionadas.reduce((soma, p) => soma + p.preco, 0);
  const totalFormatado = `R$ ${total.toFixed(2).replace(".", ",")}`;

  const aoSelecionar = (
    setorId: string,
    fileiraId: string,
    fileiraNome: string,
    assento: AssentoType,
  ) => {
    const jaSelecionada = estaSelecionada(setorId, fileiraId, assento.numero);

    setPoltronasSelecionadas(
      produce((rascunho) => {
        if (jaSelecionada) {
          const indice = rascunho.findIndex(
            (p) =>
              p.setorId === setorId &&
              p.fileiraId === fileiraId &&
              p.numero === assento.numero,
          );
          rascunho.splice(indice, 1);
          return;
        }
        rascunho.push({
          setorId,
          fileiraId,
          numero: assento.numero,
          preco: assento.preco,
        });
      }),
    );

    if (!jaSelecionada) {
      setUltimaSelecionada({
        fileiraNome,
        numero: assento.numero,
        preco: assento.preco,
        status: assento.status,
        acessibilidade: assento.acessibilidade,
      });
    }
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
      <Legenda />
      <p className="teatro__contador">Poltronas selecionadas: {quantidade}</p>
      <p className="teatro__total">Total: {totalFormatado}</p>
      {ultimaSelecionada !== null && (
        <DetalhesPoltrona poltrona={ultimaSelecionada} />
      )}
    </>
  );
};

export default Teatro;
