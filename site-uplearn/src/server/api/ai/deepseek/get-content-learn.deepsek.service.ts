import { aiChatService } from "@/src/server/api/ai/ai-chat.service";
import { englishWordPrompt } from "@/src/server/api/ai/promp/english-word.promp";
export default async function getContentLearnDeepSeekService(cards: string) {
  return await aiChatService(cards, englishWordPrompt);
}
