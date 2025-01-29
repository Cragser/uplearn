import sanitizeHtml from "sanitize-html";

export function cleanHtml(html: string): string {
  const cleanedHtml = sanitizeHtml(html, {
    allowedAttributes: {},
    allowedTags: [],
  });

  // remove extra whitespace \n \t
  return cleanedHtml.replace(/\s+/g, " ").trim();
}
