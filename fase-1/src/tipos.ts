// Tipos do domínio "Escolha de Poltronas de Teatro". Nomenclatura em
// português (conforme a constituição do projeto); APIs do React ficam em
// inglês. Ver specs/001-escolha-poltronas-teatro/data-model.md para o
// documento fonte destes formatos.

export type StatusAssento =
  "disponivel" | "ocupado" | "bloqueado" | "quebrado" | "reservadoEspecial";

export type Assento = {
  numero: number;
  preco: number; // preço base; pode ser 0 (gratuito)
  acessibilidade: boolean;
  status: StatusAssento;
  coordinateX: number; // percentual (0–100) da largura da imagem: centro da poltrona
  coordinateY: number; // percentual (0–100) da altura da imagem: centro da poltrona
  largura: number; // percentual (0–100) da largura da imagem
  altura: number; // percentual (0–100) da altura da imagem
  rotacao: number; // graus, sentido horário: inclinação da poltrona na foto
};

export type Fileira = {
  id: string;
  nome: string; // "A", "B", ...
  reservada: boolean; // convidados especiais
  emManutencao: boolean;
  assentos: Assento[];
};

export type TipoAcesso = "livre" | "pagante" | "exclusivoBradesco";

export type Setor = {
  id: string;
  nome: string; // "Plateia A", "Balcão"...
  embargado: boolean; // em obras
  tipoAcesso: TipoAcesso;
  fileiras: Fileira[];
};

export type GlobalLayoutData = {
  teatroId: string; // slug, ex.: "teatro-municipal-de-sao-paulo"
  nome: string;
  descricao: string; // texto curto exibido no cartão da listagem
  nota: number; // nota ilustrativa fixa, ex.: 4.7 (não é calculada)
  formato: "classico" | "redondo" | "funil" | "multiAndar";
  cadeirasEstofadas: boolean;
  imagemUrl: string; // foto de fundo do mapa deste teatro
  setores: Setor[]; // completo só no teatro-municipal-de-sao-paulo antes da fase-5
};
