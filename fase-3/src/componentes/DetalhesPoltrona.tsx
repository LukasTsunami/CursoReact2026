import type { StatusAssento } from "../tipos";

const rotuloStatus: Record<StatusAssento, string> = {
  disponivel: "disponível",
  ocupado: "ocupada",
  bloqueado: "bloqueada",
  quebrado: "quebrada",
  reservadoEspecial: "reservada",
};

export type PoltronaDetalhe = {
  fileiraNome: string;
  numero: number;
  preco: number;
  status: StatusAssento;
  acessibilidade: boolean;
};

type DetalhesPoltronaProps = {
  poltrona: PoltronaDetalhe;
};

const DetalhesPoltrona = ({ poltrona }: DetalhesPoltronaProps) => {
  const precoFormatado = `R$ ${poltrona.preco.toFixed(2).replace(".", ",")}`;
  const detalhes =
    rotuloStatus[poltrona.status] +
    (poltrona.acessibilidade ? ", acessível" : "");

  return (
    <p className="detalhes-poltrona">
      Poltrona {poltrona.fileiraNome}
      {poltrona.numero} — {precoFormatado} — {detalhes}
    </p>
  );
};

export default DetalhesPoltrona;
