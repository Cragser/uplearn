import { queryOptions } from "@tanstack/react-query";
import { fetchAnkiApi } from "@/src/client/module/anki/anki.api.service";

export const deckOptions = queryOptions({
  queryKey: ["decks"],
  queryFn: () => fetchAnkiApi("get-deck"),
});
