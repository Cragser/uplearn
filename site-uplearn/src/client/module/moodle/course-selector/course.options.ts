import { queryOptions } from "@tanstack/react-query";
import { fetchMoodleApi } from "@/src/client/module/moodle/moodle.api.service";

export const courseOptions = queryOptions({
  queryFn: () => fetchMoodleApi("courses/get-course"),
  queryKey: ["courses"],
});
