/* eslint-disable  @typescript-eslint/naming-convention */
import OpenAI from "openai";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAiServiceParams {
  messages: Message[];
  model?: string;
  store?: boolean;
}

export default async function openAiService({
  messages,
  model = "gpt-4o-mini",
  store = true,
}: OpenAiServiceParams) {
  if (!process.env.OPEN_AI_TOKEN) {
    throw new Error("OpenAI API token is not configured");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_TOKEN,
  });

  try {
    const response = await openai.chat.completions.create({
      frequency_penalty: 0,
      max_completion_tokens: 2048,
      messages,
      model,
      presence_penalty: 0,
      store,
      temperature: 1,
      top_p: 1,
    });

    return response.choices[0].message;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}
