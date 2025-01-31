import { NextApiRequest, NextApiResponse } from "next";
import { getCourses } from "@/src/server/api/moodle/courses/get-course.service";

interface Course {
  id: number;
  fullname: string;
  shortname: string;
  categoryid: number;
  summary: string;
  startdate: number;
  enddate: number;
  visible: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Course[] | { error: string }>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await getCourses();

    // @ts-expect-error This is a temporal response
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
}
