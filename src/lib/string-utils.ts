/**
 * Normalizes a string for validation purposes.
 * - Trims whitespace from both ends.
 * - Converts to uppercase.
 * - Removes diacritical marks (accents).
 * @param text The input string to normalize.
 * @returns The normalized string.
 */
export function normalizeForValidation(text: string): string {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
