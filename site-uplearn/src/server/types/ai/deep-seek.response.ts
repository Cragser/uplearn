export interface DeepSeekResponse {
  database: {
    entries: Array<{
      context: string;
      meaning: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      related_words: string;
      word: string;
    }>;
    intro: string;
    name: string;
  };
  glossary: {
    intro: string;
    name: string;
    terms: Array<{
      concept: string;
      definition: string;
    }>;
  };
  page: {
    content: string;
    name: string;
  };
  quiz: {
    name: string;
    questions: Array<{
      answer: number;
      options: string[];
      question: string;
    }>;
  };
  section: {
    summary: string;
  };
}
