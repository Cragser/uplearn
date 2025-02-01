import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { cleanDeepSeekThink } from "@/src/shared/util/ai/clean-deepseek-think";
import * as fs from "node:fs";
import * as path from "node:path";
import { get } from "lodash";

export async function aiChatService(
  userMessage: string,
  systemMessage: string,
) {
  const endpoint = process.env.DEEPSEEK_API_URL || "";
  const apiKey = process.env.DEEPSEEK_TOKEN || "";

  console.log({
    apiKey,
    endpoint,
  });
  const modelName = "DeepSeek-R1-ehedg";

  if (!endpoint || !apiKey) {
    throw new Error(
      "Missing required environment variables for DeepSeek AI service",
    );
  }

  try {
    // @ts-expect-error This is an azure implementation
    // eslint-disable-next-line max-len
    // https://ai.azure.com/explore/models/DeepSeek-R1/version/1/registry/azureml-deepseek?wsid=/subscriptions/ba85d2ae-64d9-47ba-91b2-16d41e13ca10/resourceGroups/rg-cragser-3726_ai/providers/Microsoft.MachineLearningServices/workspaces/cragser-2167&tid=4f1bb68d-3af1-43ef-9a96-aa1ede0cad7c#code-samples
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

    // create a file with the content of the response
    const filesDir = path.join(process.cwd(), "files");
    if (!fs.existsSync(filesDir)) {
      fs.mkdirSync(filesDir, { recursive: true });
    }

    const userMessagePreview = userMessage
      .slice(0, 30)
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();

    fs.writeFileSync(
      path.join(
        filesDir,
        `response-${userMessagePreview}-${new Date().toISOString()}.json`,
      ),
      JSON.stringify(response.body, null, 2),
    );

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
    console.error("Error in aiChatService:", error);
    throw new Error(`Failed to process chat request: ${get(error, "message")}`);
  }
}
