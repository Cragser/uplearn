// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "<DeepSeek API Key>",
  baseURL: "https://api.deepseek.com",
});

export async function aiChatService() {
  const completion = await openai.chat.completions.create({
    messages: [{ content: "You are a helpful assistant.", role: "system" }],
    model: "deepseek-chat",
  });

  console.log(completion.choices[0].message.content);
}
