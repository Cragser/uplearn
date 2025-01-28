'use client';

import {CardDemo} from "@/src/client/components/anki/card/anki-card";
import {useAnkiStore} from "@/src/client/store/anki/anki.store";
import {useSuspenseQuery} from "@tanstack/react-query";
import {createCardsOptions} from "@/src/client/module/anki/cards.options";
import {AnkiCard} from "@/src/shared/@types/anki.types";

export default function AnkiCardGallery() {
	const {deckName} = useAnkiStore((state) => state);
	const { data } = useSuspenseQuery(createCardsOptions(deckName));
	const cards = Array.isArray(data) ? data : [];

	return (
		<section>
			<div className="mb-4 flex flex-col gap-4 h-8">
				<h2 className="mt-4 text-sm text-gray-600">
					Selected deck: {deckName || "No deck selected"}
				</h2>
			</div>

			{cards.length === 0 ? (
				<div className="text-center text-gray-500">
					<p>No cards available in this deck.</p>
				</div>
			) : (
				<section className="grid grid-cols-3 gap-4">
					{cards.slice(0, 12).map((card: AnkiCard) => (
						<CardDemo key={card.answer} {...card} />
					))}
				</section>
			)}
		</section>

	)
}
