"use client";
import { getMoodleNextConnection } from "@/src/server/api/moodle/moodle-connection";
import { MoodleAction } from "@/src/shared/@types/moodle.api.types";
import { moodleApiUrl } from "@/src/client/api/routes/moodle-api-url";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export async function fetchMoodleApi<T>(
  action: MoodleAction,
  options: FetchOptions = {},
): Promise<T> {
  const url = new URL(moodleApiUrl(action));

  // Add query parameters if provided
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const res = await fetch(url, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Content-Type": "application/json",
      ...options.headers,
    },
    method: options.method || "GET",
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Expected JSON but received ${contentType}`);
  }

  return res.json();
}
