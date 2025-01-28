import {AnkiDeck} from "@/src/shared/@types/anki.types";
import {getAnkiConnectUrl} from "@/src/server/api/anki/anki-connection";
import axios from "axios";
import {fromNow} from "@/src/shared/util/date/distance-date";
import {cleanHtml} from "@/src/shared/util/html/clean-html";

interface AnkiCard {
	question: string;
	answer: string;
	lastReviewed: number;
}

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
		Front: Field;
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



export async function findCards(deck: string): Promise<AnkiCard[]> {
	const ankiUrl = getAnkiConnectUrl();
	const findCardsResponse = await axios.post(ankiUrl, {
		action: "findCards",
		version: 6,
		"params": {
			"query": `deck:"${deck}" is:review rated:7`
		}
	});
	const cardIds = findCardsResponse.data.result;
	await new Promise(resolve => setTimeout(resolve, 100));
	const cardsInfoResponse = await axios.post(ankiUrl, {
		action: "cardsInfo",
		version: 6,
		"params": {
			"cards": cardIds
		}
	});
	const cardsInfo = cardsInfoResponse.data.result;
	return cardsInfo.map((cardInfo: CardInfo) => ({
		question: cleanHtml(cardInfo.question),
		answer: cleanHtml(cardInfo.answer),
		lastReviewed: fromNow(new Date(cardInfo.mod * 1000)),
		//mod: cardInfo.mod,
		//rowQuestion: cardInfo.question,
		//rowAnswer: cardInfo.answer,
	}));
}
