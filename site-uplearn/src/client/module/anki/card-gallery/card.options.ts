"use client";
import { queryOptions } from "@tanstack/react-query";
import { fetchAnkiApi } from "@/src/client/module/anki/anki.api.service";

// TODO: Add prefetching
// eslint-disable-next-line max-len
// https://tanstack.com/query/latest/docs/framework/react/examples/nextjs-app-prefetching
export const createCardsOptions = (deck: string) => {
  return queryOptions({
    queryKey: ["cards", deck],
    queryFn: () => fetchAnkiApi("get-card", { params: { deck } }),
  });
};
