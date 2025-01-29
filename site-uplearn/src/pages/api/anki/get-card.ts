import { NextApiRequest, NextApiResponse } from "next";
import { findCards } from "@/src/server/api/anki/cards/find-card.service";
import { AnkiCard } from "@/src/shared/@types/anki.types";

const mockCards: AnkiCard[] = [
  {
    answer: "To stop doing something suddenly",
    errorRate: 15,
    failed: 3,
    lastReviewed: "2 days ago",
    nextReview: "tomorrow",
    question: "break off",
    remainingWork: 2,
    repeat: 5,
    tried: 20,
  },
  {
    answer: "To search for and find something by chance",
    errorRate: 8,
    failed: 1,
    lastReviewed: "5 days ago",
    nextReview: "in 3 days",
    question: "come across",
    remainingWork: 1,
    repeat: 3,
    tried: 12,
  },
  {
    answer: "To continue doing something despite difficulties",
    errorRate: 25,
    failed: 5,
    lastReviewed: "1 week ago",
    nextReview: "today",
    question: "carry on",
    remainingWork: 3,
    repeat: 8,
    tried: 15,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { deck } = req.query;

    if (!deck || typeof deck !== "string") {
      return res.status(400).json({ message: "Deck parameter is required" });
    }
    if (
      ["Spanish Vocabulary", "Programming Concepts", "Mathematics"].includes(
        deck,
      )
    ) {
      return res.status(200).json(mockCards);
    }

    const cards = await findCards(deck);

    return res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
