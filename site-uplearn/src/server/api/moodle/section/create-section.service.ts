/* eslint-disable @typescript-eslint/naming-convention */
import withMoodleErrorHandler from "@/src/server/wrappers/moodle/with-moodle-error-handler";
import { moodlePost } from "@/src/server/adapter/axios/moodle/moodle-post";
import { moodleGet } from "@/src/server/adapter/axios/moodle/moodle-get";
import { questionsMockData } from "@/src/server/mocks/quiz-data";
import aiLearnContentService from "@/src/server/api/ai/learn-content/ai-learn-content.service";
import { contentMock } from "@/src/server/mocks/ai/content.mock";
import { aiChatService } from "@/src/server/api/ai/ai-chat.service";
import { englishWordPrompt } from "@/src/server/api/ai/promp/english-word.promp";
import getContentLearnService from "@/src/server/api/ai/open-ai/get-content-learn.service";
import getContentLearnServiceOA from "@/src/server/api/ai/open-ai/get-content-learn.service";

interface Params {
  courseid: number;
  title: string;
  cards: string;
}

async function createSectionService({
  cards,
  courseid,
  title,
}: Params): Promise<unknown> {
  console.log(cards);
  //const aiResponse = contentMock;
  const aiResponse = await aiChatService(cards, englishWordPrompt);
  console.log({ aiResponse });
  // return aiResponse;

  // const aiResponse = await getContentLearnServiceOA(cards);

  const sectionResponse = await moodlePost<unknown>(
    "local_wsmanagesections_create_sections",
    {
      courseid,
      number: 1,
      position: 1,
    },
  );
  const section = Array.isArray(sectionResponse) ? sectionResponse[0] : null;

  //
  await new Promise((resolve) => setTimeout(resolve, 100));

  const sectionUpdateResponse = await moodleGet<unknown>(
    "local_wsmanagesections_update_sections",
    {
      courseid: courseid,
      sections: [
        {
          name: title,
          section: section.sectionid,
          summary: `${aiResponse.section.summary} - Created by API`,
          summaryformat: 1,
          type: "id",
          visible: 1,
        },
      ],
    },
  );
  await new Promise((resolve) => setTimeout(resolve, 100));

  const page = await moodleGet<unknown>("local_tnadvancemanage_create_page", {
    content: aiResponse.page.content,
    courseid: courseid,
    name: aiResponse.page.name,
    sectionid: section.sectionid,
  });

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
      intro: aiResponse.glossary.intro,
      name: aiResponse.glossary.name,
      sectionid: section.sectionid,
      terms: aiResponse.glossary.terms,
    },
  );

  const database = await moodleGet<unknown>(
    "local_tnadvancemanage_create_database",
    {
      courseid: courseid,
      entries: aiResponse.database.entries,
      intro: aiResponse.database.intro,
      name: aiResponse.database.name,
      sectionid: section.sectionid,
    },
  );

  const quiz = await moodleGet<unknown>("local_tnadvancemanage_create_quiz", {
    courseid: courseid,
    name: aiResponse.quiz.name,
    questions: aiResponse.quiz.questions,
    sectionid: section.sectionid,
  });

  return section;
}

// @ts-expect-error This is a temporal response
export default withMoodleErrorHandler(createSectionService);
