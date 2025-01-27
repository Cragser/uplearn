import axios from 'axios';
import {AnkiDeck} from "@/src/shared/@types/anki.types";
import {getAnkiConnectUrl} from "@/src/server/api/anki/anki-connection";


interface DeckStatResponse {
	deck_id: number;
	name: string;
	new_count: number;
	learn_count: number;
	review_count: number;
	total_in_deck: number;
}


export async function getDecks(): Promise<AnkiDeck[]> {
	try {
		const ankiUrl = getAnkiConnectUrl();
		const response = await axios.post(ankiUrl, {
			action: 'deckNames',
			version: 6
		});

		const deckNames = response.data.result;
		const decks: AnkiDeck[] = [];

		// Add a delay before the next request to prevent connection issues
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Get stats for all decks in a single request
		const responseStats = await axios.post(ankiUrl, {
			action: 'getDeckStats',
			version: 6,
			params: {
				decks: deckNames
			}
		});

		const deckStats: Record<string, DeckStatResponse> = responseStats.data.result;

		// Process stats for each deck
		for (const name of deckNames) {
			// Find the stats object that matches this deck name
			const stats = Object.values(deckStats).find(stat => stat.name === name);

			decks.push({
				id: stats?.deck_id || decks.length + 1,
				name,
				cards: stats?.total_in_deck || 0
			});
		}

		return decks;
	} catch (error) {
		console.error('Error fetching Anki decks:', error);
		return [];
	}
}
