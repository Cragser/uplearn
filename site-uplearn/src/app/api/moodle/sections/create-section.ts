import { NextApiRequest, NextApiResponse } from "next";
import createSectionService from "@/src/server/api/moodle/section/create-section.service";
import withValidation from "@/src/server/wrappers/with-validation";
import withErrorHandler from "@/src/server/wrappers/with-error-handler";
import { oneWeekName } from "@/src/shared/util/date/distance-date";
import { z } from "zod";

// Zod schema to validate the section object
const SectionSchema = z.object({
  id: z.number(),
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ id: number } | { error: string }>,
) {
  // Call createSectionService with data from the request body
  const body = req.body;
  const section = await createSectionService({
    cards: body.cardSelected,
    courseid: body.courseId,
    title: oneWeekName(),
  });

  // Validate the returned section using Zod
  const parsedSection = SectionSchema.parse(section);

  return res.status(201).json({ id: parsedSection.id });
}

const validationOptions = {
  methods: ["POST"],
  requiredFields: {
    cardSelected: "Cards selected",
    courseId: "Course ID",
  },
};

export default withErrorHandler(withValidation(validationOptions, handler));
