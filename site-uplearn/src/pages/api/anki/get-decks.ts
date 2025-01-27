import { NextApiRequest, NextApiResponse } from 'next';

import { AnkiDeck } from '@/src/shared/@types/anki.types';
import {getDecks} from "@/src/server/api/anki/deck/get-decks";



const mockDecks: AnkiDeck[] = [
  { name: 'Spanish Vocabulary', cards: 100, id: 1 },
  { name: 'Programming Concepts', cards: 50, id: 2 },
  { name: 'Mathematics', cards: 75, id: 3 }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnkiDeck[] | { error: string }>
) {

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const serverDecks = await getDecks();

    if (serverDecks.length > 0) {
      return res.status(200).json(serverDecks);
    }

    // Fallback to mock data if no decks were returned
    return res.status(200).json(mockDecks);
  } catch (error) {
    console.error('Error fetching Anki decks:', error);
    // Fallback to mock data on error
    return res.status(200).json(mockDecks);
  }
}
