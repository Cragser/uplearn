import { createMoodleAxios } from "@/src/server/adapter/axios/moodle/create-moodle-axios";
import { getMoodleToken } from "@/src/server/api/moodle/moodle-connection";
import { MoodleParams } from "@/src/server/types/moodle/moodle.types";
import { withMoodleRequestHandler } from "@/src/server/wrappers/moodle/with-moodle-request-handler";

/**
 * Realiza una petición GET a la API de Moodle con seguridad tipo.
 */
export async function moodleGet<T>(
  wsfunction: string,
  params: Omit<
    MoodleParams,
    "wsfunction" | "wstoken" | "moodlewsrestformat"
  > = {},
): Promise<T> {
  const instance = createMoodleAxios();

  // add all params to the url
  // eslint-disable-next-line max-len
  // example:  http://localhost/lib/ajax/service.php?sesskey=Vzg3mMaGlB&info=core_courseformat_update_course

  return withMoodleRequestHandler(() =>
    instance.get("", {
      params: {
        moodlewsrestformat: "json",
        wsfunction,
        wstoken: getMoodleToken(),
        ...params,
      },
    }),
  );
}
