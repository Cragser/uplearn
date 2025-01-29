import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {getCourses} from "@/src/server/api/moodle/courses/get-courses.service";
import {getMoodleToken} from "@/src/server/api/moodle/moodle-connection";

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
  res: NextApiResponse<Course[] | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await getCourses()

    return res.status(200).json({...response});
    const courses: Course[] = response.data.map((course: any) => ({
      id: course.id,
      fullname: course.fullname,
      shortname: course.shortname,
      categoryid: course.categoryid,
      summary: course.summary,
      startdate: course.startdate,
      enddate: course.enddate,
      visible: course.visible
    }));

    return res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
}
