import { NextApiRequest, NextApiResponse } from 'next';
import { getDecks, AnkiDeck as ServerAnkiDeck } from '../../server/api/anki/anki-server';

interface AnkiDeck {
  name: string;
  cardCount: number;
  id: string;
}

const mockDecks: AnkiDeck[] = [
  { name: 'Spanish Vocabulary', cardCount: 100, id: '1' },
  { name: 'Programming Concepts', cardCount: 50, id: '2' },
  { name: 'Mathematics', cardCount: 75, id: '3' }
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
      const formattedDecks: AnkiDeck[] = serverDecks.map((deck: ServerAnkiDeck) => ({
        name: deck.name,
        cardCount: deck.cards,
        id: deck.id.toString()
      }));
      return res.status(200).json(formattedDecks);
    }

    // Fallback to mock data if no decks were returned
    return res.status(200).json(mockDecks);
  } catch (error) {
    console.error('Error fetching Anki decks:', error);
    // Fallback to mock data on error
    return res.status(200).json(mockDecks);
  }
}