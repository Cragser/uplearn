import { MoodleAction } from "@/src/shared/@types/moodle.api.types";

export const moodleApiUrl = (action: MoodleAction) => {
  const server = window.location.origin;
  return `${server}/api/anki/${action}`;
};
