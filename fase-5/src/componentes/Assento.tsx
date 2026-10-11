import type { Assento as AssentoType, StatusAssento, TipoAcesso } from "../tipos";

const rotuloStatus: Record<StatusAssento, string> = {
  disponivel: "disponível",
  ocupado: "ocupada",
  bloqueado: "bloqueada",
  quebrado: "quebrada",
  reservadoEspecial: "reservada",
};

export type RegrasHerdadas = {
  bloqueadaPelaHierarquia: boolean;
  tipoAcesso: TipoAcesso;
};

type AssentoProps = {
  assento: AssentoType;
  nomeFileira: string;
  selecionada: boolean;
  regrasHerdadas: RegrasHerdadas;
  aoClicar: () => void;
};

const Assento = ({
  assento,
  nomeFileira,
  selecionada,
  regrasHerdadas,
  aoClicar,
}: AssentoProps) => {
  const podeSelecionar =
    assento.status === "disponivel" && !regrasHerdadas.bloqueadaPelaHierarquia;

  const rotulo =
    `Poltrona ${nomeFileira}${assento.numero}, ${rotuloStatus[assento.status]}` +
    (assento.acessibilidade ? ", acessível" : "") +
    (selecionada ? ", selecionada" : "");

  const classes = [
    "assento",
    `assento--${assento.status}`,
    `assento--acesso-${regrasHerdadas.tipoAcesso}`,
    assento.acessibilidade ? "assento--acessivel" : "",
    selecionada ? "assento--selecionada" : "",
  ]
    .filter((classe) => classe !== "")
    .join(" ");

  return (
    <button
      type="button"
      onClick={aoClicar}
      disabled={!podeSelecionar}
      className={classes}
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
