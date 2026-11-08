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
    .replace(/Ñ/g, "\uE000")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\uE000/g, "Ñ")
    .replace(/[^A-ZÑ0-9\s]/g, "")
    .replace(/\s+/g, " ");
}

// Accept the legacy catalog spelling SENOR without altering displayed Scripture.
export function answersMatch(input: string, expected: string): boolean {
  const comparable = (value: string) => normalizeForValidation(value).replace(/\bSENOR(ES|A|AS)?\b/g, 'SEÑOR$1');
  return comparable(input) === comparable(expected);
}
