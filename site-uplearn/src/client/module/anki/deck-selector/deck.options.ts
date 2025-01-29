import { queryOptions } from "@tanstack/react-query";
import { fetchAnkiApi } from "@/src/client/module/anki/anki.api.service";

export const deckOptions = queryOptions({
  queryFn: () => fetchAnkiApi("get-deck"),
  queryKey: ["decks"],
});
