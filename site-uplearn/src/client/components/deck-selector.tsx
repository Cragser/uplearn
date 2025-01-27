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


interface DeckSelectorProps {
  decks: AnkiDeck[];
}

export function DeckSelector({ decks }: DeckSelectorProps) {
  const [selectedDeck, setSelectedDeck] = React.useState<string>('');

  return (
    <div className="w-full max-w-xs">
      <Select onValueChange={setSelectedDeck} value={selectedDeck}>
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
      {selectedDeck && (
        <p className="mt-4 text-sm text-gray-600">
          Selected deck: {decks.find(d => d.id.toString() === selectedDeck)?.name}
        </p>
      )}
    </div>
  );
}
