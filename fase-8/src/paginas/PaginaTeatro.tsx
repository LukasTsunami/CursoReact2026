import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Teatro from "../componentes/Teatro";
import teatrosJson from "../dados/teatros.json";
import { buscarLayout } from "../servicos/layout";
import type { GlobalLayoutData } from "../tipos";

const teatros = teatrosJson as GlobalLayoutData[];

const PaginaTeatro = () => {
  const { nomeDoTeatro } = useParams();
  const navigate = useNavigate();
  const [layout, setLayout] = useState<GlobalLayoutData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  // Efeito de busca: dispara sempre que o parâmetro de rota muda, para que
  // a URL de cada teatro carregue dados diferentes de fato (FR-022).
  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErro(false);
      try {
        setLayout(await buscarLayout(nomeDoTeatro));
      } catch {
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [nomeDoTeatro]);

  // Polling: a cada 5s, busca o layout de novo para simular outros
  // compradores reservando poltronas em tempo real (US6, FR-009). Erros
  // de uma chamada de polling isolada não derrubam a tela — só a busca
  // inicial acima mostra o estado de erro.
  useEffect(() => {
    const intervalo = setInterval(() => {
      buscarLayout(nomeDoTeatro)
        .then(setLayout)
        .catch(() => {
          // ignora falhas pontuais de polling — a tela continua com o
          // último layout válido
        });
    }, 5000);

    return () => {
      clearInterval(intervalo);
    };
  }, [nomeDoTeatro]);

  return (
    <main className="pagina-teatro">
      {carregando && <p>Carregando teatro...</p>}
      {erro && <p>Falha ao carregar o layout do teatro</p>}
      {layout !== null && (
        <>
          <div className="pagina-teatro__seletor">
            <label htmlFor="seletor-teatro">Escolher teatro</label>
            <select
              id="seletor-teatro"
              value={layout.teatroId}
              onChange={(evento) => {
                navigate(`/teatros/${evento.target.value}`);
              }}
            >
              {teatros.map((teatro) => (
                <option key={teatro.teatroId} value={teatro.teatroId}>
                  {teatro.nome}
                </option>
              ))}
            </select>
          </div>
          <Teatro layout={layout} />
        </>
      )}
    </main>
  );
};

export default PaginaTeatro;
