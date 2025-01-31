import { fetchMoodleApi } from "@/src/client/module/moodle/moodle.api.service";

interface CreateSectionRequest {
  courseId: number;
  name: string;
  description: string;
  visible?: boolean;
}

export const createSectionMutation = (data: any) => {
  fetchMoodleApi("sections/create-section", {
    body: data,
    method: "POST",
  });
};
