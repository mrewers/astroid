/**
 * Breaks a string up on a given delimiter.
 * @param str - Any string.
 * @param delimiter - Character(s) at which the provided string should be split.
 */
const parseInput = (str: string, delimiter: string): string[] =>
  str.split(delimiter).map(s => s.trim());

/**
 * Splits a string upon the Morse code letter separator (space).
 * @param str - Any string.
 */
export const findMorseChars = (str: string): string[] => parseInput(str, ' ');

/**
 * Splits a string upon the Morse code word separator (forward slash).
 * @param str - Any string.
 */
export const findMorseWords = (str: string): string[] => parseInput(str, '/');

/**
 * Splits a string upon the text word separator (space).
 * @param str - Any string.
 */
export const findTextWords = (str: string): string[] => parseInput(str, ' ');

/**
 * Splits a string upon the Morse code letter separator (space).
 * @param str - Any string.
 */
export const findTextChars = (str: string): string[] => parseInput(str, '');
