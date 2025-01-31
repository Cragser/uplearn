/* eslint-disable @typescript-eslint/naming-convention */
import withMoodleErrorHandler from "@/src/server/wrappers/moodle/with-moodle-error-handler";
import { moodlePost } from "@/src/server/adapter/axios/moodle/moodle-post";
import { moodleGet } from "@/src/server/adapter/axios/moodle/moodle-get";
import { questionsMockData } from "@/src/server/mocks/quiz-data";

interface Params {
  courseid: number;
  title: string;
}

async function createSectionService({
  courseid,
  title,
}: Params): Promise<unknown> {
  const sectionResponse = await moodlePost<unknown>(
    "local_wsmanagesections_create_sections",
    {
      courseid,
      number: 1,
      position: 1,
    },
  );
  const section = Array.isArray(sectionResponse) ? sectionResponse[0] : null;
  console.log(section);
  console.log("\n\n");
  //
  // delay 100ms
  await new Promise((resolve) => setTimeout(resolve, 100));

  const sectionUpdateResponse = await moodleGet<unknown>(
    "local_wsmanagesections_update_sections",
    {
      courseid: courseid,
      sections: [
        {
          name: title,
          section: section.sectionid,
          summary: `${title} - Created by API`,
          summaryformat: 1,
          type: "id",
          visible: 1,
        },
      ],
    },
  );
  await new Promise((resolve) => setTimeout(resolve, 100));

  const page = await moodleGet<unknown>("local_tnadvancemanage_create_page", {
    content: "<p>This is a new page</p>",
    courseid: courseid,
    name: "New Page",
    sectionid: section.sectionid,
  });
  console.log(page);

  const terms = [
    {
      concept: "Carry out",
      definition: "To perform, execute, or accomplish a task, plan, or order.",
    },
    {
      concept: "Cut out",
      definition:
        "To stop doing or using something; to remove something completely.",
    },
  ];

  const glossary = await moodleGet<unknown>(
    "local_tnadvancemanage_create_glossary",
    {
      courseid: courseid,
      intro: "This is an introduction to the glossary.",
      name: "English Vocabulary",
      sectionid: section.sectionid,
      terms: terms,
    },
  );
  /**
   * A list of múltiple meanings for a single word.
   * 'word' => new external_value(PARAM_TEXT, 'The vocabulary word'),
   * 'meaning' => new external_value(PARAM_RAW, 'The meaning of the word'),
   * 'context' => new external_value(PARAM_RAW, 'The context where the word is used'),
   * 'related_words' => new external_value(PARAM_TEXT, 'Related words')
   */
  const databaseRows = [
    {
      context: "In a sentence, to do something.",
      meaning: "To perform, execute, or accomplish a task, plan, or order.",
      related_words: "Carry on, carry out, carry over, carry through",
      word: "Carry out",
    },
    {
      context: "In a sentence, to do something.",
      meaning: "To fulfill orders or instructions",
      related_words: "Carry on, carry out, carry over",
      word: "Carry out",
    },
    {
      context: "In a sentence, to do something.",
      meaning:
        "To stop doing or using something; to remove something completely.",
      related_words: "Cut off, cut out, cut over",
      word: "cut out",
    },
    {
      context: "In a sentence, to do something.",
      meaning:
        "To stop the supply of something; to disconnect or remove completely.",
      related_words: "Cut off, cut out, cut over, cut through,",
      word: "cut out",
    },
  ];

  const database = await moodleGet<unknown>(
    "local_tnadvancemanage_create_database",
    {
      courseid: courseid,
      entries: databaseRows,
      intro: "This is an introduction to the database.",
      name: "English Vocabulary",
      sectionid: section.sectionid,
    },
  );

  const quiz = await moodleGet<unknown>("local_tnadvancemanage_create_quiz", {
    courseid: courseid,
    name: "example quiz",
    questions: questionsMockData,
    sectionid: section.sectionid,
  });

  return section;
}

// @ts-expect-error This is a temporal response
export default withMoodleErrorHandler(createSectionService);
