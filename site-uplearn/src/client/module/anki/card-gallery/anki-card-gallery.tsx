"use client";

import { CardDemo } from "@/src/client/components/anki/card/anki-card";
import { useAnkiStore } from "@/src/client/store/anki/anki.store";
import { useQuery } from "@tanstack/react-query";
import { createCardsOptions } from "@/src/client/module/anki/card-gallery/card.options";
import { AnkiCard } from "@/src/shared/@types/anki.types";
import { useMoodleStore } from "@/src/client/store/anki/moodle.store";

export default function AnkiCardGallery() {
  const { deckName } = useAnkiStore((state) => state);
  const { courseSelected } = useMoodleStore((state) => state);
  const { data, error, isError } = useQuery(createCardsOptions(deckName));
  const cards = Array.isArray(data) ? data : [];

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading cards: {error?.message || "An error occurred"}</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex flex-row gap-4 h-8">
        <h2 className="mt-4 text-sm text-gray-600">
          Selected deck: {deckName || "No deck selected"}
        </h2>
        <h2 className="mt-4 text-sm text-gray-600">
          Selected course: {courseSelected || "No course selected"}
        </h2>
      </div>

      {cards.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No cards available in this deck.</p>
        </div>
      ) : (
        <section className="grid grid-cols-3 gap-4">
          {cards
            .toSorted((a, b) => (b.errorRate || 0) - (a.errorRate || 0))
            .slice(0, 12)
            .map((card: AnkiCard) => (
              <CardDemo key={card.answer} {...card} />
            ))}
        </section>
      )}
    </section>
  );
}
