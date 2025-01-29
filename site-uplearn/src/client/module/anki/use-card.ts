import { useQuery } from "@tanstack/react-query";
import { createCardsOptions } from "@/src/client/module/anki/card.options";
interface Props {
  deck: string;
}
export function useCard({ deck }: Props) {
  const queryOptions = createCardsOptions(deck);
  return useQuery(queryOptions);
}
