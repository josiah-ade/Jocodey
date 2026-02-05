/**
 * Strips HTML tags from a string and truncates to a specified length.
 * @param html - The HTML string to process
 * @param maxLength - Maximum number of characters to return
 * @returns Clean, truncated text
 */
export function getExcerptFromHtml(
  html: string,
  maxLength: number = 160
): string {
  if (!html) return "";

  // Strip HTML tags
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Truncate to maxLength
  if (text.length <= maxLength) return text;

  // Cut off and add ellipsis
  return text.substring(0, maxLength).trim() + "...";
}
