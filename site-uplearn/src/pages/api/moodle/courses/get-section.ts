import { NextApiRequest, NextApiResponse } from "next";
import { getSections } from "@/src/server/api/moodle/section/get-section.service";

interface Section {
  id: number;
  name: string;
  summary: string;
  sequence: string;
  visible: boolean;
  courseId: number;
  section: number;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Section[] | { error: string }>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const courseId = req.query.courseId;
  if (!courseId || Array.isArray(courseId)) {
    return res
      .status(400)
      .json({ error: "Course ID is required and must be a single value" });
  }

  try {
    const sections = await getSections(parseInt(courseId));
    // @ts-expect-error This is a temporal response
    return res.status(200).json(sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    return res.status(500).json({ error: "Failed to fetch sections" });
  }
}
