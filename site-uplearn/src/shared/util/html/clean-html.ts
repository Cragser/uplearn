import sanitizeHtml from 'sanitize-html';


export function cleanHtml(html: string): string {
  const cleanedHtml = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  })

  // remove extra whitespace \n \t
  return cleanedHtml.replace(/\s+/g, ' ').trim();
}
