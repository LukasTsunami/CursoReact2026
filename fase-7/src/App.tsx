import { Route, Routes } from "react-router-dom";
import CarrinhoModal from "./componentes/CarrinhoModal";
import Footer from "./componentes/Footer";
import Header from "./componentes/Header";
import PaginaInicial from "./paginas/PaginaInicial";
import PaginaListaTeatros from "./paginas/PaginaListaTeatros";
import PaginaTeatro from "./paginas/PaginaTeatro";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/teatros" element={<PaginaListaTeatros />} />
        <Route path="/teatros/:nomeDoTeatro" element={<PaginaTeatro />} />
      </Routes>
      <Footer />
      <CarrinhoModal />
    </>
  );
}

export default App;
