import { moodleGet } from "@/src/server/api/moodle/moodle-axios";

export async function findCourse() {
  const responseCreate = await moodleGet<any[]>(
    "local_wsmanagesections_create_sections",
    {
      courseid: 4,
      number: 1,
      position: 4,
    },
  );
  console.log(responseCreate.data);
  const response = await moodleGet<any[]>("core_course_get_contents", {
    courseid: 4,
  });
  console.log(response.data);
}
