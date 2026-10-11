import { useCarrinho } from "../stores/carrinho";

const SucessoPagina = () => {
  const itens = useCarrinho((estado) => estado.itens);

  return (
    <main className="pagina-sucesso">
      <h1>Pedido confirmado</h1>
      <p>Obrigado pela compra! Seu pedido foi registrado com sucesso.</p>
      <section aria-label="Meus Ingressos">
        <h2>Meus Ingressos</h2>
        <ul>
          {itens.map((item) => (
            <li key={`${item.setorId}-${item.fileiraId}-${item.numero}`}>
              {item.setorNome} · {item.fileiraNome}
              {item.numero}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default SucessoPagina;
