"use client";
import { AnkiAction } from "@/src/shared/@types/anki.api.types";
import { ankiApiUrl } from "@/src/client/api/routes/anki-api-url";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export async function fetchAnkiApi<T>(
  action: AnkiAction,
  options: FetchOptions = {},
): Promise<T> {
  const url = new URL(ankiApiUrl(action));
  let shouldHaveParams = false;
  // Add query parameters if provided
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (!value) {
        shouldHaveParams = true;
      }
      url.searchParams.append(key, value);
    });
  }

  if (shouldHaveParams) {
    return [] as T;
  }

  // check if we don't have any url.searchParams return []

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
