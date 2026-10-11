import dancaImg from "../assets/danca.svg";
import heroFundo from "../assets/hero-fundo.svg";
import musicalImg from "../assets/musical.svg";
import operaImg from "../assets/opera.svg";
import teatroImg from "../assets/teatro.svg";

const PaginaInicial = () => {
  return (
    <main className="pagina-inicial">
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroFundo})` }}
      >
        <h1>Reserve seu assento</h1>
        <p>Encontre o teatro perfeito para a sua próxima noite inesquecível.</p>
      </section>

      <section className="bento-espetaculos">
        <img src={operaImg} alt="Ópera" />
        <img src={teatroImg} alt="Teatro" />
        <img src={dancaImg} alt="Dança" />
        <img src={musicalImg} alt="Apresentação Musical" />
      </section>

      <section className="prova-social">
        <h2>Prova Social</h2>
        <blockquote>
          "A melhor experiência de teatro que eu já tive — do assento à
          plateia inteira." — Ana Ribeiro
        </blockquote>
        <blockquote>
          "Comprar ingressos nunca foi tão fácil e rápido." — Carlos Menezes
        </blockquote>
      </section>

      <section className="selos-confianca">
        <h2>Selos de Confiança</h2>
        <ul>
          <li>Compra 100% Segura</li>
          <li>Reembolso Garantido</li>
          <li>Suporte 24/7</li>
        </ul>
      </section>
    </main>
  );
};

export default PaginaInicial;
