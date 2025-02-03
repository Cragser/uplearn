/* eslint-disable @typescript-eslint/naming-convention, max-len  */
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
 * Validates if a given object matches the expected schema.
 * @param input - The object to validate.
 * @returns A boolean indicating whether the object matches the schema.
 */
export function isValidStructuredJSON(input: unknown): boolean {
  try {
    jsonSchema.parse(input);
    return true;
  } catch (error) {
    console.error("Invalid JSON structure:", error);
    return false;
  }
}
