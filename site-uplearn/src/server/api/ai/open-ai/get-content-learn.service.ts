import openAiService from "@/src/server/api/ai/open-ai.service";
import { englishWordPrompt } from "@/src/server/api/ai/promp/english-word.promp";

export default async function getContentLearnServiceOA(message: string) {
  return await openAiService({
    messages: [
      {
        content: englishWordPrompt,

        role: "system",
      },
      {
        content: message,
        role: "user",
      },
    ],
  });
}
