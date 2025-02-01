/* eslint-disable max-len */
export const englishWordPrompt = `
[TASK]
To effectively utilize the dataset featuring idiomatic expressions and phrasal verbs for language learning, create a comprehensive educational resource structured as follows:
Technical Requirements:
    - Ensure the JSON structure is clean, well-organized, and free of syntax errors.
    - Maintain clarity and consistency in English for all entries.
    - Only accept terms that are commonly used in English.

Objective:
    - Aim to create a versatile, interactive educational tool that caters to varied levels of language proficiency, ideal for integrating into learning apps or platforms, enhancing both engagement and effective vocabulary acquisition.
    
This new, enhanced instruction embraces a structured and detailed approach that leverages the dataset's educational format to foster a practical understanding of idiomatic expressions and phrasal verbs, suitable for users at different stages of learning.

[INPUT RULES]
The input must follow these requirements:

1. Format Requirements:
   - Must be an array of strings containing English terms
   - Each term should be a valid English word, phrase, or expression
   - Terms should be comma-separated within square brackets
   - Maximum of 10 terms per request
   - Minimum of 1 term per request

2. Term Requirements:
   - Each term must be between 1 and 50 characters
   - Only alphanumeric characters, spaces, and basic punctuation allowed
   - No HTML tags or special formatting
   - Must be commonly used in English language
   - Phrasal verbs should be in their base form

3. Example Valid Inputs:
   ["break in", "back up", "call back"]
   ["get along", "look forward to", "put off"]

4. Example Invalid Inputs:
   ["término en español"] - Non-English terms
   [] - Empty array
   "single term" - Not in array format
   ["term1", "term2", ... "term15"] - Exceeds maximum terms

[FORMAT]
The response must be structured in two distinct blocks:

1. <think> block:
   - This block is where you can freely express your thoughts and reasoning
   - Use this space to analyze the input terms and plan your response
   - You can write in any style that helps organize your thoughts

2. <json> block:
   - This block must contain ONLY a valid JSON object
   - The JSON structure will be validated against the zod schema defined below
   - All content must follow the specified output format requirements
   - No additional text or formatting is allowed in this block

[VALIDATION]
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

[OUTPUT]
[OUTPUT FORMAT]
The JSON object must include the following sections with their specified requirements:

1. Section Component
   - section.summary: A comprehensive overview that includes:
     * Learning objectives for the terms
     * Key concepts to be covered
     * Expected learning outcomes
     * Progression of difficulty levels

2. Page Component
   - page.name: A descriptive title that encapsulates the main themes of the included terms
   - page.content: Rich HTML content including:
     * Short Story: A 5-8 sentence narrative incorporating all terms naturally
     * Movie Examples: Three contextual quotes per term ("*quote*" - Movie (Year))
     * Song Examples: Three lyric examples per term ("*lyric*" - Song by Artist)
     * Mnemonic Devices: Memory aids specifically designed for Spanish speakers

3. Glossary Component
   - glossary.name: A clear, thematic title for the term collection
   - glossary.intro: A brief overview of the terms' relationships and importance
   - glossary.terms: Array of term objects containing:
     * concept: The term being defined (English only)
     * definition: Clear, comprehensive explanation with usage notes

4. Database Component
   - database.name: Descriptive title reflecting the term collection's theme
   - database.intro: Contextual introduction connecting the terms
   - database.entries: Array of detailed term entries including:
     * word: The term itself
     * context: Usage examples and situations
     * meaning: Detailed explanation of usage and connotations
     * related_words: Comma-separated list of associated terms

5. Quiz Component
   - quiz.name: Engaging title for the assessment section
   - quiz.questions: Array of question objects containing:
     * question: Clear, context-rich question text
     * options: Array of possible answers (4 options recommended)
     * answer: Index of the correct option (0-based)

Note: All content must be in English except where specifically noted for Spanish speakers (mnemonics).
`;

export const input = `INPUT: 
["break in", "back up", "call back"]
`;
