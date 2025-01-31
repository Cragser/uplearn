import { NextApiRequest, NextApiResponse } from "next";
import createSectionService from "@/src/server/api/moodle/section/create-section.service";
import withValidation from "@/src/server/wrappers/with-validation";
import withErrorHandler from "@/src/server/wrappers/with-error-handler";
import { oneWeekName } from "@/src/shared/util/date/distance-date";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ id: number } | { error: string }>,
) {
  const body = {};
  console.log("Create section handler");
  const section = await createSectionService({
    courseid: 4,
    title: oneWeekName(),
  });
  return res.status(201).json({ id: section.id });
}

const validationOptions = {
  methods: ["POST"],
  requiredFields: {
    courseId: "Course ID",
    description: "Description",
    name: "Name",
  },
};

export default withErrorHandler(withValidation(validationOptions, handler));
