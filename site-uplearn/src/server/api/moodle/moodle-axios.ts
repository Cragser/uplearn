// eslint-disable-next-line filenames-simple/pluralize
import axios, { AxiosInstance } from "axios";
import { getMoodleNextConnection, getMoodleToken } from "./moodle-connection";

interface MoodleParams {
  wsfunction: string;
  moodlewsrestformat?: string;
  [key: string]: unknown;
}

export function createMoodleAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: getMoodleNextConnection(),
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Content-Type": "application/json",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return instance;
}

export async function moodleGet<T>(
  wsfunction: string,
  params: Omit<
    MoodleParams,
    "wsfunction" | "wstoken" | "moodlewsrestformat"
  > = {},
) {
  const instance = createMoodleAxios();
  return instance.get<T>("", {
    params: {
      moodlewsrestformat: "json",
      wsfunction,
      wstoken: getMoodleToken(),
      ...params,
    },
  });
}
