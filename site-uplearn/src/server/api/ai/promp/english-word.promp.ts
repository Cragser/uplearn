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
terms: List of terms to be included in the JSON object.
example: [word1, word2, word3]

[OUTPUT]
ONLY INCLUDE JSON OBJECTS IN THE OUTPUT
section.summary: A brief description of the section, including its objectives, key concepts, and learning outcomes. Includes
page.content: html content with an explanation of the input words. Includes by term: 1."Short Story": Craft a concise, engaging original story that uses all the provided terms effectively, spanning 5-8 sentences, to demonstrate practical usage. 2. "Movie Examples": Include three authentic movie quotes for each term that illustrate its usage (formatted as "*quote*" - Movie (Year)).  3. "Song Examples": Present three snippets from song lyrics for each term demonstrating its usage (formatted as "*lyric*" - Song by Artist). 4. Mnemotechnical helpers for mexican users.  
page.name: name of the page. It will help to remember the input concepts
glossary.intro: Introduction to the glossary.
glossary.name: name of the glossary. It will help to remember the input concepts
glossary.terms: list of terms with their definitions. Every meaning for every term included in the input. Remember only include english terms.
glossary.term[X].definition: definition of the term.
glossary.term[X].concept: term to be defined.
database.intro: Introduction to the database. It uses the input terms to create a practical example.
database.name: name of the database.  It will help to remember the input concepts
database.entries: list of entries with their contexts. 
database.entry[X].context: context of the entry.
database.entry[X].meaning: meaning of the entry.
database.entry[X].related_words: A list of related terms. Format string: "word1, word2, word3"
database.entry[X].word: word to be defined.
quiz.name: name of the quiz.
quiz.questions: list of questions with their options.
quiz.question[X].answer: answer to the question.
quiz.question[X].options: list of options to the question
quiz.question[X].question: question to the question.
`;

`INPUT: 
[Devolver lallamada, Break In, Averiarse, "Back Up]
`;
