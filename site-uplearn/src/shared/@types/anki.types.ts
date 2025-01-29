export interface AnkiDeck {
	name: string;
	cards: number;
	id: number;
}
export interface AnkiCard {
	answer: string;
	question: string;
	lastReviewed: string;
	nextReview: string;
	repeat: number;
	tried: number;
	failed: number;
	errorRate: number
	remainingWork: number;
}
