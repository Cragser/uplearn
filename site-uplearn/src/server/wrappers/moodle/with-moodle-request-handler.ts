import { AxiosError, AxiosResponse } from "axios";
import { MoodleApiError } from "@/src/server/error/moodle-api-error";
import { get, has } from "lodash";

type MoodleRequestFunction<T> = () => Promise<AxiosResponse>;

/**
 * Wrapper function to handle Moodle API requests and their errors consistently.
 * @param requestFn - The function that makes the actual request to Moodle API
 * @returns The processed response data
 */
export async function withMoodleRequestHandler<T>(
  requestFn: MoodleRequestFunction<T>,
): Promise<T> {
  try {
    const response = await requestFn();

    // Check for Moodle API exceptions
    if (has(response, "data.exception")) {
      throw new MoodleApiError(
        `Moodle API Error: ${get(response.data, "message", "Unknown error")}`,
        response.data,
      );
    }

    return response.data as T;
  } catch (error: unknown) {
    if (error instanceof MoodleApiError) {
      throw error; // Re-throw MoodleApiError as is
    }

    if (error instanceof AxiosError) {
      throw new MoodleApiError(
        `Failed to make request to Moodle: ${get(
          error,
          "response.data.message",
          get(error, "message", "Unknown error"),
        )}`,
        error,
      );
    }

    throw new MoodleApiError(
      `Unexpected error: ${get(error as Error, "message", "Unknown error")}`,
      error,
    );
  }
}
