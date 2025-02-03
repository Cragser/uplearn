import sanitizeHtml from "sanitize-html";

export function cleanHtml(html: string): string {
  console.log(html);
  let cleanedHtml = sanitizeHtml(html, {
    allowedAttributes: {},
    allowedTags: [],
  });

  // Remove any anki:play tags with optional parameters
  cleanedHtml = cleanedHtml.replace(/\[anki:play(?::[^[\]]*?)?\]/g, "");

  // remove extra whitespace \n \t
  return cleanedHtml.replace(/\s+/g, " ").trim();
}
