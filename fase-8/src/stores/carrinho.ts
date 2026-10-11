import { create } from "zustand";

export type ItemCarrinho = {
  setorId: string;
  setorNome: string;
  fileiraId: string;
  fileiraNome: string;
  numero: number;
  precoBase: number;
  meiaEntrada: boolean; // autodeclarado; comprovação é física, fora de escopo
};

export type PoltronaParaComprar = {
  setorId: string;
  setorNome: string;
  fileiraId: string;
  fileiraNome: string;
  numero: number;
  preco: number;
};

type EstadoCarrinho = {
  itens: ItemCarrinho[];
  expiraEm: number | null; // timestamp epoch ms; null = sem reserva ativa
  carrinhoAberto: boolean;
  adicionarAoCarrinho: (poltronas: PoltronaParaComprar[]) => void;
  alternarMeiaEntrada: (setorId: string, fileiraId: string, numero: number) => void;
  fecharCarrinho: () => void;
  liberarAssentos: () => void;
};

export const useCarrinho = create<EstadoCarrinho>((set) => ({
  itens: [],
  expiraEm: null,
  carrinhoAberto: false,

  adicionarAoCarrinho: (poltronas) => {
    set({
      itens: poltronas.map((poltrona) => ({
        setorId: poltrona.setorId,
        setorNome: poltrona.setorNome,
        fileiraId: poltrona.fileiraId,
        fileiraNome: poltrona.fileiraNome,
        numero: poltrona.numero,
        precoBase: poltrona.preco,
        meiaEntrada: false,
      })),
      expiraEm: Date.now() + 5 * 60 * 1000,
      carrinhoAberto: true,
    });
  },

  alternarMeiaEntrada: (setorId, fileiraId, numero) => {
    set((estado) => ({
      itens: estado.itens.map((item) =>
        item.setorId === setorId &&
        item.fileiraId === fileiraId &&
        item.numero === numero
          ? { ...item, meiaEntrada: !item.meiaEntrada }
          : item,
      ),
    }));
  },

  fecharCarrinho: () => {
    set({ carrinhoAberto: false });
  },

  liberarAssentos: () => {
    set({ itens: [], expiraEm: null, carrinhoAberto: false });
  },
}));
