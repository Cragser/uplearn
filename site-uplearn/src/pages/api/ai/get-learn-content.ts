import { NextApiRequest, NextApiResponse } from "next";
import aiLearnContentService from "@/src/server/api/ai/learn-content/ai-learn-content.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ content: string } | { error: string }>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message format" });
    }

    const response = await aiLearnContentService(message);
    return res.status(200).json({ content: response });
  } catch (error) {
    console.error("Error in AI chat:", error);
    return res.status(500).json({ error: "Failed to process chat request" });
  }
}
