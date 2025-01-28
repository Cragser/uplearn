'use client';
import {queryOptions} from "@tanstack/react-query";
import {getAnkiNextConnection} from "@/src/server/api/anki/anki-connection";

export const createCardsOptions = (deck: string) => {
	return queryOptions({
		queryKey: ['cards', deck],
		queryFn: async () => {
			const url = new URL(getAnkiNextConnection('cards'));
			url.searchParams.append('deck', deck);
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			return res.json();
		},
	})
}
