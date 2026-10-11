import type { Assento as AssentoType, StatusAssento } from "../tipos";

const rotuloStatus: Record<StatusAssento, string> = {
  disponivel: "disponível",
  ocupado: "ocupada",
  bloqueado: "bloqueada",
  quebrado: "quebrada",
  reservadoEspecial: "reservada",
};

type AssentoProps = {
  assento: AssentoType;
  nomeFileira: string;
  selecionada: boolean;
  aoClicar: () => void;
};

const Assento = ({
  assento,
  nomeFileira,
  selecionada,
  aoClicar,
}: AssentoProps) => {
  const rotulo =
    `Poltrona ${nomeFileira}${assento.numero}, ${rotuloStatus[assento.status]}` +
    (assento.acessibilidade ? ", acessível" : "") +
    (selecionada ? ", selecionada" : "");

  return (
    <button
      type="button"
      onClick={aoClicar}
      className={`assento assento--${assento.status}${selecionada ? " assento--selecionada" : ""}`}
      aria-label={rotulo}
      style={{
        left: `${assento.coordinateX}%`,
        top: `${assento.coordinateY}%`,
        width: `${assento.largura}%`,
        height: `${assento.altura}%`,
        transform: `translate(-50%, -50%) rotate(${assento.rotacao}deg)`,
      }}
    />
  );
};

export default Assento;
