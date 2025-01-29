"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnkiDeck } from "@/src/shared/@types/anki.types";
import { useAnkiStore } from "@/src/client/store/anki/anki.store";
import { useQuery } from "@tanstack/react-query";
import { deckOptions } from "@/src/client/module/anki/deck-selector/deck.options";

export function DeckSelector() {
  const [selectedDeck, setSelectedDeck] = React.useState<string>("");
  const setDeckName = useAnkiStore((state) => state.setDeckName);
  const { data, isError, error } = useQuery(deckOptions);
  const decks = Array.isArray(data) ? data : [];

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading decks: {error?.message || "An error occurred"}</p>
      </div>
    );
  }
  const onDeckChange = (deck: string) => {
    setSelectedDeck(deck);
    const selectedDeckName = decks.find((d) => d.id.toString() === deck)?.name;
    if (selectedDeckName) {
      setDeckName(selectedDeckName);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Select onValueChange={onDeckChange} value={selectedDeck}>
        <SelectTrigger>
          <SelectValue placeholder="Select a deck" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available Decks</SelectLabel>
            {decks?.length > 0 ? (
              decks.map((deck) => (
                <SelectItem key={deck.id} value={deck.id.toString()}>
                  {deck.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-decks" disabled>
                No decks available
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
