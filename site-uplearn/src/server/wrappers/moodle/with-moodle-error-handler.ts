import { MoodleApiError } from "@/src/server/error/moodle-api-error";

/**
 * Generic type for service functions that return a Promise.
 */
type ServiceFunction<T> = (...args: unknown[]) => Promise<T>;

/**
 * Wrapper to handle Moodle-specific errors in service functions.
 * @param fn - The service function to wrap.
 * @returns A new function that handles Moodle errors.
 */
function withMoodleErrorHandler<T>(fn: ServiceFunction<T>): ServiceFunction<T> {
  return async (...args: unknown[]): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      if (error instanceof MoodleApiError) {
        console.error("MoodleApiError:", error.message);
        throw error;
      }
      console.error("Unexpected Error:", error);
      throw new MoodleApiError("An unexpected error occurred.", error);
    }
  };
}

export default withMoodleErrorHandler;
