export default function activeServices() {
  return {
    ai: process.env.IS_AI_ENABLED === "true",
    anki: process.env.ANKI_API_URL !== "vercel",
  };
}
