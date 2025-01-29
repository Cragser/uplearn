import { AnkiAction } from "@/src/shared/@types/anki.api.types";

export const ankiApiUrl = (action: AnkiAction) => {
  // http://localhost:3000/api/anki/get-decks
  // get the url from window.location.origin
  const server = window.location.origin;
  return `${server}/api/anki/${action}`;
};
