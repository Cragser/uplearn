import { getAnkiConnectUrl } from "@/src/server/api/anki/anki-connection";
import axios from "axios";
import { fromNow } from "@/src/shared/util/date/distance-date";
import { cleanHtml } from "@/src/shared/util/html/clean-html";
import { AnkiCard } from "@/src/shared/@types/anki.types";

interface Field {
  value: string;
  order: number;
}

interface CardInfo {
  answer: string;
  question: string;
  deckName: string;
  modelName: string;
  fieldOrder: number;
  fields: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Front: Field;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Back: Field;
  };
  css: string;
  cardId: number;
  interval: number;
  note: number;
  ord: number;
  type: number;
  queue: number;
  due: number;
  reps: number;
  lapses: number;
  left: number;
  mod: number;
}

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

export async function findCards(deck: string): Promise<AnkiCard[]> {
  const ankiUrl = getAnkiConnectUrl();
  if (ankiUrl === false) {
    return mockCards;
  }
  // is:review rated:7
  const findCardsResponse = await axios.post(ankiUrl, {
    action: "findCards",
    params: {
      query: `deck:"${deck}"`,
    },
    version: 6,
  });
  const cardIds = findCardsResponse.data.result.slice(0, 20);
  await new Promise((resolve) => setTimeout(resolve, 100));
  const cardsInfoResponse = await axios.post(ankiUrl, {
    action: "cardsInfo",
    params: {
      cards: cardIds,
    },
    version: 6,
  });
  const cardsInfo = cardsInfoResponse.data.result;
  return cardsInfo.map((cardInfo: CardInfo) => ({
    answer: cleanHtml(cardInfo.answer),
    // due -- fecha para próxima revisión
    // reps -- número de repeticiones
    // lapses -- número de repeticiones fallidas
    // left -- número de repeticiones restantes
    // nextReview: new Date(cardInfo.due * 1000).toLocaleDateString(),
    // repeat: cardInfo.lapses,
    // tried: cardInfo.reps,
    // failed: cardInfo.left,
    errorRate: Math.round((cardInfo.lapses / cardInfo.reps) * 100),
    lastReviewed: fromNow(new Date(cardInfo.mod * 1000)),
    question: cleanHtml(cardInfo.question),
    remainingWork: cardInfo.left,

    //mod: cardInfo.mod,
    //rowQuestion: cardInfo.question,
    //rowAnswer: cardInfo.answer,
  }));
}
