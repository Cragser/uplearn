import { create } from "zustand";

export interface AnkiState {
  deckName: string;
  cardSelected: string[];
  setDeckName: (deckName: string) => void;
  addCardToSelected: (card: string) => void;
  removeCardFromSelected: (card: string) => void;
}

export const useAnkiStore = create<AnkiState>((set) => ({
  addCardToSelected: (card: string) =>
    set((state) => ({ cardSelected: [...state.cardSelected, card] })),
  cardSelected: [],
  deckName: "",
  removeCardFromSelected: (card: string) =>
    set((state) => ({
      cardSelected: state.cardSelected.filter((c) => c !== card),
    })),
  setDeckName: (deckName: string) => set({ deckName }),
}));
