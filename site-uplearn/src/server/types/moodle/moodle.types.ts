/**
 * Interface for Moodle parameters.
 */
export interface MoodleParams {
  wsfunction: string;
  moodlewsrestformat?: string;
  [key: string]: unknown;
}
