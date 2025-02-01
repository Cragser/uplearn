/**
 * eslint-disable-next-line max-len
 * This function removes <think> blocks from the input and extracts a JSON object
 * from a ```json code block. If the JSON is valid, it returns the parsed object
 * otherwise, it returns null.
 */

export function cleanDeepSeekThink(input: string): unknown {
  // Remove all <think>...</think> blocks
  const withoutThink = input.replace(/<think>[\s\S]*?<\/think>/g, "");

  // Regex to find a ```json code block and capture its content
  const jsonBlockRegex = /```json\s*([\s\S]*?)\s*```/;
  const match = jsonBlockRegex.exec(withoutThink);

  if (match && match[1]) {
    try {
      // Parse and return the JSON content
      return JSON.parse(match[1]);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  // Return null if no valid JSON code block is found
  return null;
}
