"use client";
import { queryOptions } from "@tanstack/react-query";
import { getAnkiNextConnection } from "@/src/server/api/anki/anki-connection";

// TODO: Add prefetching
// eslint-disable-next-line max-len
// https://tanstack.com/query/latest/docs/framework/react/examples/nextjs-app-prefetching
export const createCardsOptions = (deck: string) => {
  return queryOptions({
    queryFn: async () => {
      const url = new URL(getAnkiNextConnection("cards"));
      url.searchParams.append("deck", deck);
      const res = await fetch(url, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      return res.json();
    },
    queryKey: ["cards", deck],
  });
};
