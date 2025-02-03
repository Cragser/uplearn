// eslint-disable-next-line filenames-simple/pluralize
"use client";

export async function fetchServices<T>(): Promise<T> {
  const url = new URL("/api/services/active", window.location.origin);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
