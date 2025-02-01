/* eslint-disable @typescript-eslint/naming-convention */
import { z } from "zod";

const jsonSchema = z.object({
  database: z.object({
    entries: z.array(
      z.object({
        context: z.string(),
        meaning: z.string(),
        related_words: z.string(),
        word: z.string(),
      }),
    ),
    intro: z.string(),
    name: z.string(),
  }),
  glossary: z.object({
    intro: z.string(),
    name: z.string(),
    terms: z.array(
      z.object({
        concept: z.string(),
        definition: z.string(),
      }),
    ),
  }),
  page: z.object({
    content: z.string(),
    name: z.string(),
  }),
  quiz: z.object({
    name: z.string(),
    questions: z.array(
      z.object({
        answer: z.number(),
        options: z.array(z.string()),
        question: z.string(),
      }),
    ),
  }),
  section: z.object({
    summary: z.string(),
  }),
});

/**
 * Validates if a given string is a valid JSON and matches a specific schema.
 * @param input - The JSON string to validate.
 * @returns A boolean indicating whether the JSON is valid and correctly structured.
 */
export function isValidStructuredJSON(input: string): boolean {
  try {
    const parsed = JSON.parse(input);
    jsonSchema.parse(parsed);
    return true;
  } catch (error) {
    console.error("Invalid JSON structure:", error);
    return false;
  }
}
