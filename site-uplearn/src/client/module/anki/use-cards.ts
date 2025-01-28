import { useQuery } from '@tanstack/react-query'
import {createCardsOptions} from "@/src/client/module/anki/cards.options";
interface Props {
	deck: string;
}
export function useCards({deck}: Props) {
	const queryOptions = createCardsOptions(deck);
	return useQuery(queryOptions)
}
