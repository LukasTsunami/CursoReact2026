import { produce } from "immer";
import { useEffect, useState } from "react";
import { useCarrinho } from "../stores/carrinho";
import TeatroContext from "../contexto/TeatroContext";
import type { Assento as AssentoType, GlobalLayoutData } from "../tipos";
import DetalhesPoltrona, { type PoltronaDetalhe } from "./DetalhesPoltrona";
import Legenda from "./Legenda";
import Setor from "./Setor";

type PoltronaSelecionada = {
  setorId: string;
  setorNome: string;
  fileiraId: string;
  fileiraNome: string;
  numero: number;
  preco: number;
};

type TeatroProps = {
  layout: GlobalLayoutData;
};

const Teatro = ({ layout }: TeatroProps) => {
  const adicionarAoCarrinho = useCarrinho((estado) => estado.adicionarAoCarrinho);
  const [poltronasSelecionadas, setPoltronasSelecionadas] = useState<
    PoltronaSelecionada[]
  >([]);
  const [ultimaSelecionada, setUltimaSelecionada] =
    useState<PoltronaDetalhe | null>(null);
  const [mensagemRemocao, setMensagemRemocao] = useState<string | null>(null);

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
    setorNome: string,
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
          setorNome,
          fileiraId,
          fileiraNome,
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

  const aoComprar = () => {
    adicionarAoCarrinho(poltronasSelecionadas);
    setPoltronasSelecionadas([]);
    setUltimaSelecionada(null);
  };

  // A cada novo `layout` (ex.: depois de um polling, US6), confere se
  // alguma poltrona selecionada deixou de estar disponível e, se sim,
  // remove ela da seleção e avisa o usuário (FR-010).
  useEffect(() => {
    const indisponiveis = poltronasSelecionadas.filter((p) => {
      const setor = layout.setores.find((s) => s.id === p.setorId);
      const fileira = setor?.fileiras.find((f) => f.id === p.fileiraId);
      const assento = fileira?.assentos.find((a) => a.numero === p.numero);
      return assento === undefined || assento.status !== "disponivel";
    });

    if (indisponiveis.length === 0) {
      return;
    }

    // Ajustar a seleção quando `layout` muda (polling) é exatamente o tipo
    // de sincronização que useEffect existe para fazer; a alternativa
    // recomendada pelo React (comparar com o valor anterior via ref) não
    // está disponível aqui porque useRef é proibido nesta stack.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPoltronasSelecionadas(
      produce((rascunho) => {
        for (const item of indisponiveis) {
          const indice = rascunho.findIndex(
            (p) =>
              p.setorId === item.setorId &&
              p.fileiraId === item.fileiraId &&
              p.numero === item.numero,
          );
          if (indice >= 0) {
            rascunho.splice(indice, 1);
          }
        }
      }),
    );

    setMensagemRemocao(
      indisponiveis
        .map(
          (item) =>
            `A poltrona ${item.fileiraNome}${item.numero} não está mais disponível e foi removida da sua seleção.`,
        )
        .join(" "),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  return (
    <>
      <div className="teatro">
        <img
          src={layout.imagemUrl}
          alt={`Mapa do teatro ${layout.nome}`}
          className="teatro__imagem"
        />
        <TeatroContext.Provider value={layout.cadeirasEstofadas}>
          {layout.setores.map((setor) => (
            <Setor
              key={setor.id}
              setor={setor}
              estaSelecionada={estaSelecionada}
              aoSelecionar={aoSelecionar}
            />
          ))}
        </TeatroContext.Provider>
      </div>
      <Legenda />
      <p className="teatro__contador">Poltronas selecionadas: {quantidade}</p>
      <p className="teatro__total">Total: {totalFormatado}</p>
      {mensagemRemocao !== null && (
        <p className="teatro__aviso" role="status">
          {mensagemRemocao}
        </p>
      )}
      {ultimaSelecionada !== null && (
        <DetalhesPoltrona poltrona={ultimaSelecionada} />
      )}
      <button
        type="button"
        className="teatro__comprar"
        onClick={aoComprar}
        disabled={quantidade === 0}
      >
        Comprar
      </button>
    </>
  );
};

export default Teatro;
