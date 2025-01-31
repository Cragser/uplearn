"use client";

import * as React from "react";
import { useAnkiStore } from "@/src/client/store/anki/anki.store";
import { useQuery } from "@tanstack/react-query";
import { deckOptions } from "@/src/client/module/anki/deck-selector/deck.options";
import { GenericSelector } from "@/src/client/components/generic-selector/generic-selector";

export function DeckSelector() {
  const [selectedDeck, setSelectedDeck] = React.useState<string>("");
  const setDeckName = useAnkiStore((state) => state.setDeckName);
  const { data, error, isError, isLoading } = useQuery(deckOptions);
  const decks = Array.isArray(data) ? data : [];

  const handleDeckChange = (value: string) => {
    setSelectedDeck(value);
    const selectedDeckName = decks.find((d) => d.id.toString() === value)?.name;
    if (selectedDeckName) {
      setDeckName(selectedDeckName);
    }
  };

  return (
    <GenericSelector
      items={decks}
      selectedValue={selectedDeck}
      onValueChange={handleDeckChange}
      placeholder="Select a deck"
      label="Available Decks"
      isLoading={isLoading}
      error={isError ? error : null}
    />
  );
}
