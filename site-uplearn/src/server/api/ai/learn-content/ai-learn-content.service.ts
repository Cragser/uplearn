import { aiChatService } from "@/src/server/api/ai/ai-chat.service";
import { englishWordPrompt } from "@/src/server/api/ai/promp/english-word.promp";

export default function aiLearnContentService(content: string) {
  return {
    section: content,
  };
  return aiChatService(content, englishWordPrompt);
}
