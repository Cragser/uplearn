"use client";
import { queryOptions } from "@tanstack/react-query";
import { getAnkiNextConnection } from "@/src/server/api/anki/anki-connection";

// TODO: Add prefetching
// eslint-disable-next-line max-len
// https://tanstack.com/query/latest/docs/framework/react/examples/nextjs-app-prefetching
export const createCardsOptions = (deck: string) => {
  return queryOptions({
    queryFn: async () => {
      const url = new URL(getAnkiNextConnection("get-card"));
      url.searchParams.append("deck", deck);
      const res = await fetch(url, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API response is not JSON");
      }

      return res.json();
    },
    queryKey: ["cards", deck],
  });
};
