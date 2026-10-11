import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="cabecalho">
      <Link to="/" className="cabecalho__logo">
        Poltronas de Teatro
      </Link>
      <nav className="cabecalho__menu">
        <Link to="/teatros">Teatros</Link>
      </nav>
    </header>
  );
};

export default Header;
