const ANKI_API_URL = process.env.ANKI_API_URL || "http://localhost:8765";
const IS_DOCKER = process.env.DOCKER_ENVIRONMENT === "true";
export const getAnkiConnectUrl = () => {
  // If we're running in Docker, use host.docker.internal
  if (IS_DOCKER) {
    return "http://host.docker.internal:8765";
  }
  if (ANKI_API_URL === "vercel") {
    return false;
  }
  return ANKI_API_URL;
};

// eslint-disable-next-line max-len
// http://localhost:3000/api/anki/cards?deck=200%20Phrasal%20Verbs%20%20English%20-%20Spanish
