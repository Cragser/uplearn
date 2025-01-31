// eslint-disable-next-line filenames-simple/pluralize
import { getMoodleConnectUrl } from "@/src/server/api/moodle/moodle-connection";
import axios, { AxiosInstance } from "axios";

/**
 * Creates an Axios instance configured to connect to Moodle.
 * @returns An Axios instance.
 */
export function createMoodleAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: getMoodleConnectUrl(),
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Content-Type": "application/x-www-form-urlencoded",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return instance;
}
