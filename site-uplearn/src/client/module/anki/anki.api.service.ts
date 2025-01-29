"use client";
import { getAnkiNextConnection } from "@/src/server/api/anki/anki-connection";
import { AnkiAction } from "@/src/shared/@types/anki.api.types";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export async function fetchAnkiApi<T>(
  action: AnkiAction,
  options: FetchOptions = {},
): Promise<T> {
  const url = new URL(getAnkiNextConnection(action));

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
