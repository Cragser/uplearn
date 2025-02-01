import { NextApiRequest, NextApiResponse } from "next";
import createSectionService from "@/src/server/api/moodle/section/create-section.service";
import withValidation from "@/src/server/wrappers/with-validation";
import withErrorHandler from "@/src/server/wrappers/with-error-handler";
import { oneWeekName } from "@/src/shared/util/date/distance-date";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ id: number } | { error: string }>,
) {
  const body = req.body;
  const section = await createSectionService({
    cards: body.cardSelected,
    courseid: body.courseId,
    title: oneWeekName(),
  });
  return res.status(201).json({ id: section.id });
}

const validationOptions = {
  methods: ["POST"],
  requiredFields: {
    cardSelected: "Cards selected",
    courseId: "Course ID",
  },
};

export default withErrorHandler(withValidation(validationOptions, handler));
