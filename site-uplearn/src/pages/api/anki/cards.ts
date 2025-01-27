import { NextApiRequest, NextApiResponse } from 'next';
import { findCards } from '@/src/server/api/anki/cards/find-cards.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { deck } = req.query;

    if (!deck || typeof deck !== 'string') {
      return res.status(400).json({ message: 'Deck parameter is required' });
    }

    const cards = await findCards(deck);
    return res.status(200).json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}