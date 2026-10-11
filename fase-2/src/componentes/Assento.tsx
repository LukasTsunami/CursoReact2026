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
};

const Assento = ({ assento, nomeFileira }: AssentoProps) => {
  const rotulo =
    `Poltrona ${nomeFileira}${assento.numero}, ${rotuloStatus[assento.status]}` +
    (assento.acessibilidade ? ", acessível" : "");

  return (
    <button
      type="button"
      className={`assento assento--${assento.status}`}
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
