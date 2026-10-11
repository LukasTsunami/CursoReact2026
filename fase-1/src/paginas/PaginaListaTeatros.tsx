import CartaoTeatro from "../componentes/CartaoTeatro";
import teatrosJson from "../dados/teatros.json";
import type { GlobalLayoutData } from "../tipos";

const teatros = teatrosJson as GlobalLayoutData[];

const PaginaListaTeatros = () => {
  return (
    <main className="pagina-lista-teatros">
      <h1>Teatros</h1>
      <div className="grade-teatros">
        {teatros.map((teatro) => (
          <CartaoTeatro key={teatro.teatroId} teatro={teatro} />
        ))}
      </div>
    </main>
  );
};

export default PaginaListaTeatros;
