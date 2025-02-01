import { fetchMoodleApi } from "@/src/client/module/moodle/moodle.api.service";

interface CreateSectionRequest {
  courseId: null | number;
  cardSelected: string[];
}

export const createSectionMutation = (data: CreateSectionRequest) => {
  return fetchMoodleApi("sections/create-section", {
    method: "POST",
    params: {
      cardSelected: data.cardSelected.join(","),
      courseId: data.courseId ? data.courseId.toString() : "",
    },
  });
};
