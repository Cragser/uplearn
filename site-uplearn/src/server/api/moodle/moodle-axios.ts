import axios, { AxiosInstance } from "axios";
import { getMoodleNextConnection, getMoodleToken } from "./moodle-connection";

interface MoodleParams {
  wsfunction: string;
  moodlewsrestformat?: string;
  [key: string]: any;
}

export function createMoodleAxios(): AxiosInstance {
  const instance = axios.create({
    baseURL: getMoodleNextConnection(),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return instance;
}

export async function moodleGet<T>(wsfunction: string, params: Omit<MoodleParams, 'wsfunction' | 'wstoken' | 'moodlewsrestformat'> = {}) {
  const instance = createMoodleAxios();
  return instance.get<T>('', {
    params: {
      wstoken: getMoodleToken(),
      wsfunction,
      moodlewsrestformat: 'json',
      ...params
    }
  });
}
