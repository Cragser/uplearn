export interface AnkiDeck {
	name: string;
	cards: number;
	id: number;
}
export interface AnkiCard {
	answer: string;
	question: string;
	lastReviewed: string;
}