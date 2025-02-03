import { isValidStructuredJSON } from "@/src/domain/validation/deep-seek-response.validation";
import { DeepSeekResponse } from "@/src/server/types/ai/deep-seek.response";

export default function cleanOpenAi(response: string): DeepSeekResponse {
  // Remove markdown code fences and extra whitespace
  const cleanContent = response
    .replace(/```json\s*/g, "")
    .replace(/```/g, "")
    .trim();

  const parsedJson = JSON.parse(cleanContent);
  const cleanedResponse = isValidStructuredJSON(parsedJson) ? parsedJson : null;

  if (cleanedResponse === null) {
    throw new Error("Failed to clean response");
  }

  return cleanedResponse;
}
