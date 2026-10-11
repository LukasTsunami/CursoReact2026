import { createContext } from "react";

// Injeção estática (não gerenciador de estado): o Teatro fornece
// `cadeirasEstofadas` direto para o Assento, sem passar por Setor/Fileira.
const TeatroContext = createContext(false);

export default TeatroContext;
