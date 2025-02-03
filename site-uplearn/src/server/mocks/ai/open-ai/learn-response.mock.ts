/* eslint-disable */
export const simpleResponse = `
  {
    "database": {
      "entries": [],
      "intro": "test",
      "name": "test"
    },
    "glossary": {
      "intro": "test",
      "name": "test",
      "terms": []
    },
    "page": {
      "content": "test",
      "name": "test"
    },
    "quiz": {
      "name": "test",
      "questions": []
    },
    "section": {
      "summary": "test"
    }
  }
`;

export const simpleResponseJson = {
  database: {
    entries: [],
    intro: "test",
    name: "test"
  },
  glossary: {
    intro: "test",
    name: "test",
    terms: []
  },
  page: {
    content: "test",
    name: "test"
  },
  quiz: {
    name: "test",
    questions: []
  },
  section: {
    summary: "test"
  }
}

export const complexResponse = "```json\n{\n  \"section\": {\n    \"summary\": \"This resource aims to enhance your understanding of three commonly used phrasal verbs: 'break in', 'break down', and 'ask (someone) out'. By engaging with these terms, learners will be able to identify their meanings in context, demonstrate their usage in sentences, and understand their nuances in casual conversations. The progression is structured from comprehension to application, ensuring learners feel confident using these expressions in various scenarios.\"\n  },\n  \"page\": {\n    \"name\": \"Understanding Phrasal Verbs and Idiomatic Expressions\",\n    \"content\": \"<p>One rainy evening, Sarah decided to <strong>ask her friend David out</strong> for coffee to break the ice between them. However, just as she picked up her phone, her car unexpectedly <strong>broke down</strong> in the middle of the road. Frustrated but determined, she managed to <strong>break in</strong> to her old device to borrow a phone charger that was left in her backpack. After charging for a few minutes, she successfully called David. They laughed about the misadventure and planned to meet up soon!</p><h3>Movie Examples:</h3><ul><li>\\\"I had to <strong>break in</strong> to the building to find the missing evidence.\\\" - The Heist (2020)</li><li>\\\"When the engine <strong>broke down</strong>, we thought the trip was ruined.\\\" - Road Trip (2021)</li><li>\\\"I was so nervous to <strong>ask her out</strong>, but I finally did.\\\" - Love Struck (2019)</li></ul><h3>Song Examples:</h3><ul><li>\\\"You won't know if you don't <strong>ask me out</strong>, so let's just go for it.\\\" - 'Dare to Dream' by The Starlets</li><li>\\\"Baby, don't worry about your car <strong>broke down</strong>; we'll get there together.\\\" - 'Road to You' by The Journeys</li><li>\\\"I had to <strong>break in</strong> to my heart again, you took it all away.\\\" - 'Heartbreak Hotel' by The Melodies</li></ul><h3>Mnemonic Devices:</h3><p>For Spanish speakers, remember: <em>“Romper (break) en (in) su propia casa (home)”</em> to visualize breaking in, and “Preguntando (asking) a alguien (someone) en un café (at a coffee shop)” to recall asking someone out.</p>\"\n  },\n  \"glossary\": {\n    \"name\": \"Phrasal Verbs Glossary\",\n    \"intro\": \"This glossary includes important phrasal verbs that enhance conversational English, illustrating how they connect to daily life and interactions.\",\n    \"terms\": [\n      {\n        \"concept\": \"Break in\",\n        \"definition\": \"To enter a place unlawfully, especially a building, typically to commit a crime. It can also mean to train or acclimatize someone or something to a new situation.\"\n      },\n      {\n        \"concept\": \"Break down\",\n        \"definition\": \"To stop functioning (usually referring to machinery or vehicles) or to lose control of one's emotions. It may also refer to the process of separating information into smaller parts.\"\n      },\n      {\n        \"concept\": \"Ask (someone) out\",\n        \"definition\": \"To invite someone to go on a date or to engage in a social outing, usually in a romantic context.\"\n      }\n    ]\n  },\n  \"database\": {\n    \"name\": \"Common Phrasal Verbs in Daily Conversation\",\n    \"intro\": \"Understanding these phrasal verbs will empower you to engage more naturally in English conversations and comprehend various contexts.\",\n    \"entries\": [\n      {\n        \"word\": \"break in\",\n        \"context\": \"I had to <strong>break in</strong> during the fire drill to grab my things.\",\n        \"meaning\": \"To forcefully enter a place. It can also mean training someone or something.\",\n        \"related_words\": \"intrude, enter, invade\"\n      },\n      {\n        \"word\": \"break down\",\n        \"context\": \"Her car <strong>broke down</strong> on the highway, and she had to call for help.\",\n        \"meaning\": \"To stop functioning or to collapse emotionally.\",\n        \"related_words\": \"collapse, fail, decompose\"\n      },\n      {\n        \"word\": \"ask (someone) out\",\n        \"context\": \"He was too nervous to <strong>ask her out</strong> in person.\",\n        \"meaning\": \"To invite someone to join in an activity, usually romantically.\",\n        \"related_words\": \"invite, propose, request\"\n      }\n    ]\n  },\n  \"quiz\": {\n    \"name\": \"Phrasal Verb Usage Quiz\",\n    \"questions\": [\n      {\n        \"question\": \"What does 'break down' typically refer to?\",\n        \"options\": [\n          \"To enter a location unlawfully\",\n          \"To stop functioning\",\n          \"To invite someone out on a date\",\n          \"To separate parts for easier understanding\"\n        ],\n        \"answer\": 1\n      },\n      {\n        \"question\": \"Which phrase means to invite someone on a date?\",\n        \"options\": [\n          \"Break down\",\n          \"Ask someone out\",\n          \"Break in\",\n          \"Break up\"\n        ],\n        \"answer\": 1\n      },\n      {\n        \"question\": \"If you need to fix something quickly, which expression might you use?\",\n        \"options\": [\n          \"Ask out\",\n          \"Break down\",\n          \"Break in\",\n          \"Both break down and break in\"\n        ],\n        \"answer\": 2\n      }\n    ]\n  }\n}\n```"

export const complexResponseJson = {
  section: {
    summary: "This resource aims to enhance your understanding of three commonly used phrasal verbs: 'break in', 'break down', and 'ask (someone) out'. By engaging with these terms, learners will be able to identify their meanings in context, demonstrate their usage in sentences, and understand their nuances in casual conversations. The progression is structured from comprehension to application, ensuring learners feel confident using these expressions in various scenarios."
  },
  page: {
    name: "Understanding Phrasal Verbs and Idiomatic Expressions",
    content: "<p>One rainy evening, Sarah decided to <strong>ask her friend David out</strong> for coffee to break the ice between them. However, just as she picked up her phone, her car unexpectedly <strong>broke down</strong> in the middle of the road. Frustrated but determined, she managed to <strong>break in</strong> to her old device to borrow a phone charger that was left in her backpack. After charging for a few minutes, she successfully called David. They laughed about the misadventure and planned to meet up soon!</p><h3>Movie Examples:</h3><ul><li>\"I had to <strong>break in</strong> to the building to find the missing evidence.\" - The Heist (2020)</li><li>\"When the engine <strong>broke down</strong>, we thought the trip was ruined.\" - Road Trip (2021)</li><li>\"I was so nervous to <strong>ask her out</strong>, but I finally did.\" - Love Struck (2019)</li></ul><h3>Song Examples:</h3><ul><li>\"You won't know if you don't <strong>ask me out</strong>, so let's just go for it.\" - 'Dare to Dream' by The Starlets</li><li>\"Baby, don't worry about your car <strong>broke down</strong>; we'll get there together.\" - 'Road to You' by The Journeys</li><li>\"I had to <strong>break in</strong> to my heart again, you took it all away.\" - 'Heartbreak Hotel' by The Melodies</li></ul><h3>Mnemonic Devices:</h3><p>For Spanish speakers, remember: <em>\"Romper (break) en (in) su propia casa (home)\"</em> to visualize breaking in, and \"Preguntando (asking) a alguien (someone) en un café (at a coffee shop)\" to recall asking someone out.</p>"
  },
  glossary: {
    name: "Phrasal Verbs Glossary",
    intro: "This glossary includes important phrasal verbs that enhance conversational English, illustrating how they connect to daily life and interactions.",
    terms: [
      {
        concept: "Break in",
        definition: "To enter a place unlawfully, especially a building, typically to commit a crime. It can also mean to train or acclimatize someone or something to a new situation."
      },
      {
        concept: "Break down",
        definition: "To stop functioning (usually referring to machinery or vehicles) or to lose control of one's emotions. It may also refer to the process of separating information into smaller parts."
      },
      {
        concept: "Ask (someone) out",
        definition: "To invite someone to go on a date or to engage in a social outing, usually in a romantic context."
      }
    ]
  },
  database: {
    name: "Common Phrasal Verbs in Daily Conversation",
    intro: "Understanding these phrasal verbs will empower you to engage more naturally in English conversations and comprehend various contexts.",
    entries: [
      {
        word: "break in",
        context: "I had to <strong>break in</strong> during the fire drill to grab my things.",
        meaning: "To forcefully enter a place. It can also mean training someone or something.",
        related_words: "intrude, enter, invade"
      },
      {
        word: "break down",
        context: "Her car <strong>broke down</strong> on the highway, and she had to call for help.",
        meaning: "To stop functioning or to collapse emotionally.",
        related_words: "collapse, fail, decompose"
      },
      {
        word: "ask (someone) out",
        context: "He was too nervous to <strong>ask her out</strong> in person.",
        meaning: "To invite someone to join in an activity, usually romantically.",
        related_words: "invite, propose, request"
      }
    ]
  },
  quiz: {
    name: "Phrasal Verb Usage Quiz",
    questions: [
      {
        question: "What does 'break down' typically refer to?",
        options: [
          "To enter a location unlawfully",
          "To stop functioning",
          "To invite someone out on a date",
          "To separate parts for easier understanding"
        ],
        answer: 1
      },
      {
        question: "Which phrase means to invite someone on a date?",
        options: [
          "Break down",
          "Ask someone out",
          "Break in",
          "Break up"
        ],
        answer: 1
      },
      {
        question: "If you need to fix something quickly, which expression might you use?",
        options: [
          "Ask out",
          "Break down",
          "Break in",
          "Both break down and break in"
        ],
        answer: 2
      }
    ]
  }
};