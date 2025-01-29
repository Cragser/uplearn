/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";
import { AnkiDeck } from "@/src/shared/@types/anki.types";
import { getAnkiConnectUrl } from "@/src/server/api/anki/anki-connection";

interface DeckStatResponse {
  deck_id: number;
  name: string;
  new_count: number;
  learn_count: number;
  review_count: number;
  total_in_deck: number;
}

const mockDecks: AnkiDeck[] = [
  { cards: 100, id: 1, name: "Spanish Vocabulary" },
  { cards: 50, id: 2, name: "Programming Concepts" },
  { cards: 75, id: 3, name: "Mathematics" },
];

export async function getDeckService(): Promise<AnkiDeck[]> {
  try {
    const ankiUrl = getAnkiConnectUrl();
    if (ankiUrl === false) {
      return mockDecks;
    }
    const response = await axios.post(ankiUrl, {
      action: "deckNames",
      version: 6,
    });

    const deckNames = response.data.result;
    const decks: AnkiDeck[] = [];

    // Add a delay before the next request to prevent connection issues
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Get stats for all decks in a single request
    const responseStats = await axios.post(ankiUrl, {
      action: "getDeckStats",
      params: {
        decks: deckNames,
      },
      version: 6,
    });

    const deckStats: Record<string, DeckStatResponse> =
      responseStats.data.result;

    // Process stats for each deck
    for (const name of deckNames) {
      // Find the stats object that matches this deck name
      const stats = Object.values(deckStats).find((stat) => stat.name === name);

      decks.push({
        cards: stats?.total_in_deck || 0,
        id: stats?.deck_id || decks.length + 1,
        name,
      });
    }

    return decks;
  } catch (error) {
    console.error("Error fetching Anki decks:", error);
    return [];
  }
}
