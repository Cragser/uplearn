import openAiService from "@/src/server/api/ai/open-ai.service";

import { DeepSeekResponse } from "@/src/server/types/ai/deep-seek.response";
import { saveResponseToFile } from "@/src/server/api/files/file.service";
import { englishWordPrompt } from "@/src/server/api/ai/promp/open-ai/english-word.promp";
import { openAiResponse } from "@/src/server/mocks/ai/open-ai.mock";
import cleanOpenAi from "@/src/shared/util/ai/clean-open-ai";
import { openAiAutoEnglishWordPrompt } from "@/src/server/api/ai/promp/open-ai/open-ai-auto-english-word.promp";

const IS_AI_ENABLED = process.env.IS_AI_ENABLED === "true";
export default async function getContentLearnServiceOA(
  message: string,
): Promise<DeepSeekResponse> {
  let response;
  if (!IS_AI_ENABLED) {
    response = openAiResponse;
  } else {
    response = await openAiService({
      messages: [
        {
          content: openAiAutoEnglishWordPrompt.system,
          role: "system",
        },
        {
          content: message,
          role: "user",
        },
        {
          content: englishWordPrompt,
          role: "assistant",
        },
      ],
    });
  }

  await saveResponseToFile({
    responseBody: response.content,
    userMessagePreview: `${message}`,
  });

  return cleanOpenAi(response.content as string);
}
