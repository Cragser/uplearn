import { getAnkiNextConnection } from "@/src/server/api/anki/anki-connection";
import { queryOptions } from "@tanstack/react-query";

export const deckOptions = queryOptions({
  queryKey: ["decks"],
  queryFn: async () => {
    const res = await fetch(getAnkiNextConnection("get-deck"));
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON but received ${contentType}`);
    }
    return res.json();
  },
});
