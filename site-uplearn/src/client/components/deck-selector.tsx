'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {AnkiDeck} from "@/src/shared/@types/anki.types";
import {useAnkiStore} from "@/src/client/store/anki/anki.store";


interface DeckSelectorProps {
  decks: AnkiDeck[];
}

export function DeckSelector({ decks }: Readonly<DeckSelectorProps>) {
  const [selectedDeck, setSelectedDeck] = React.useState<string>('');
  const setDeckName = useAnkiStore((state) => state.setDeckName);

  const onDeckChange = (deck: string) => {
    setSelectedDeck(deck);
    const selectedDeckName = decks.find(d => d.id.toString() === deck)?.name;
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
            {decks.map((deck) => (
              <SelectItem key={deck.id} value={deck.id.toString()}>
                {deck.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  );
}
