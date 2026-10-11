import Teatro from "../componentes/Teatro";
import layoutClassicoJson from "../dados/layout-classico.json";
import type { GlobalLayoutData } from "../tipos";

const layoutClassico = layoutClassicoJson as GlobalLayoutData;

const PaginaTeatro = () => {
  return (
    <main className="pagina-teatro">
      <Teatro layout={layoutClassico} />
    </main>
  );
};

export default PaginaTeatro;
