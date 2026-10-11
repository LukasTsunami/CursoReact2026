import type { TipoAcesso } from "../tipos";

const rotulos: Record<TipoAcesso, string> = {
  livre: "Livre",
  pagante: "Pagante",
  exclusivoBradesco: "Exclusivo Bradesco",
};

const tipos: TipoAcesso[] = ["livre", "pagante", "exclusivoBradesco"];

const Legenda = () => {
  return (
    <section className="legenda" aria-label="Legenda de acesso">
      <ul>
        {tipos.map((tipo) => (
          <li key={tipo} className={`legenda__item legenda__item--${tipo}`}>
            {rotulos[tipo]}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Legenda;
