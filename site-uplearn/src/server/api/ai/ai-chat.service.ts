import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { cleanDeepSeekThink } from "@/src/shared/util/ai/clean-deepseek-think";
import { get } from "lodash";
import { saveResponseToFile } from "../files/file.service";
import { content } from "@/src/server/mocks/ai/azure-deepsek.mock";
import { DeepSeekResponse } from "@/src/server/types/ai/deep-seek.response";

export async function aiChatService(
  userMessage: string,
  systemMessage: string,
): Promise<DeepSeekResponse> {
  const isAiEnabled = process.env.IS_AI_ENABLED === "true";
  if (!isAiEnabled) {
    const response = cleanDeepSeekThink(content);
    if (response === null) {
      throw new Error("Failed to clean response");
    }
    return response;
  }

  const endpoint = process.env.DEEPSEEK_API_URL || "";
  const apiKey = process.env.DEEPSEEK_TOKEN || "";

  const modelName = "DeepSeek-R1-ehedg";

  if (!endpoint || !apiKey) {
    throw new Error(
      "Missing required environment variables for DeepSeek AI service",
    );
  }

  try {
    // @ts-expect-error This is an azure implementation
    const client = new ModelClient(endpoint, new AzureKeyCredential(apiKey));
    const response = await client.path("/chat/completions").post({
      body: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        max_tokens: 2000,
        messages: [
          { content: systemMessage, role: "system" },
          { content: userMessage, role: "user" },
        ],
        model: modelName,
      },
    });

    const userMessagePreview = userMessage
      .slice(0, 30)
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();

    await saveResponseToFile({
      responseBody: response.body,
      userMessagePreview,
    });

    if (response.status !== "200") {
      throw response.body.error;
    }

    if (!response.body?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format: missing message content");
    }

    const cleanedResponse = cleanDeepSeekThink(
      response.body.choices[0].message.content,
    );

    if (cleanedResponse === null) {
      throw new Error("Failed to clean response");
    }

    return cleanedResponse;
  } catch (error) {
    // console.error("Error in aiChatService:", error);
    throw new Error(`Failed to process chat request: ${get(error, "message")}`);
  }
}
