import { createMoodleAxios } from "@/src/server/adapter/axios/moodle/create-moodle-axios";
import { getMoodleToken } from "@/src/server/api/moodle/moodle-connection";
import { flatten } from "flat";
import { MoodleParams } from "@/src/server/types/moodle/moodle.types";
import { forOwn, toString, isEmpty } from "lodash";
import { withMoodleRequestHandler } from "@/src/server/wrappers/moodle/with-moodle-request-handler";

// Handler para validación de parámetros
function validateMoodleParams(params: unknown): asserts params is object {
  if (isEmpty(params) || typeof params !== "object" || params === null) {
    throw new Error(
      "No se han proporcionado parámetros para la solicitud a Moodle",
    );
  }
}

export async function moodlePost<T>(
  wsfunction: string,
  params: Omit<
    MoodleParams,
    "wsfunction" | "wstoken" | "moodlewsrestformat"
  > = {},
): Promise<T> {
  const instance = createMoodleAxios();

  const fullParams = {
    moodlewsrestformat: "json",
    wsfunction: wsfunction,
    wstoken: getMoodleToken(),
    ...params,
  };

  const flattenedParams = flatten(fullParams);
  validateMoodleParams(flattenedParams);

  const urlEncodedParams = new URLSearchParams();
  forOwn(flattenedParams, (value: unknown, key: string) => {
    urlEncodedParams.append(key, toString(value));
  });

  return withMoodleRequestHandler(() =>
    instance.post("", urlEncodedParams.toString()),
  );
}
