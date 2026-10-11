import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="cabecalho">
      <Link to="/" className="cabecalho__logo">
        Poltronas de Teatro
      </Link>
    </header>
  );
};

export default Header;
