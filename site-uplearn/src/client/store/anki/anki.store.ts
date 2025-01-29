import { create } from "zustand";

export interface AnkiState {
  deckName: string;
  setDeckName: (deckName: string) => void;
}

export const useAnkiStore = create<AnkiState>((set) => ({
  deckName: "",
  setDeckName: (deckName: string) => set({ deckName }),
}));
