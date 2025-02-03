import { DeepSeekResponse } from "../../../server/types/ai/deep-seek.response";
import { isValidStructuredJSON } from "../../../domain/validation/deep-seek-response.validation";

/**
 * Extracts and returns the JSON object from the input string.
 * This function removes all <think> blocks and then extracts the content
 * inside the <json> block. If the JSON is valid and matches the expected
 * schema,it returns the parsed and validated object; otherwise
 * it returns null.
 */
export function cleanDeepSeekThink(input: string): DeepSeekResponse | null {
  if (!input || typeof input !== "string") {
    return null;
  }

  // Remove all <think>...</think> blocks
  const withoutThink = input.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

  // Regex to find a <json> block and capture its content
  const jsonBlockRegex = /<json>\s*([\s\S]*?)\s*<\/json>/;
  const match = jsonBlockRegex.exec(withoutThink);

  if (!match || !match[1]) {
    return null;
  }

  try {
    const jsonContent = match[1].trim();
    if (!jsonContent) {
      return null;
    }
    // Parse and validate the JSON content
    const parsedJson = JSON.parse(jsonContent);
    return isValidStructuredJSON(jsonContent) ? parsedJson : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
