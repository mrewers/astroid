import CHARS from './constants';

/**
 * Converts a binary representation into the equivalent Morse code string.
 * @param str - A Morse code string.
 */
export const convertBinaryToMorse = (str: string): string =>
  str.replace(/1/gu, '-').replace(/0/gu, '.');

/**
 * Converts a Morse code string into the equivalent binary representation.
 * @param str - A Morse code string.
 */
export const convertMorseToBinary = (str: string): string =>
  str.replace(/-/gu, '1').replace(/\./gu, '0');

/**
 * Converts a binary character representation into the equivalent character.
 * @param str - A binary representation string.
 */
export const convertBinaryToChar = (str: string): string => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of CHARS.entries()) {
    if (value === str) {
      return key;
    }
  }

  return '#';
};

/**
 * Converts a character into its equivalent binary representation.
 * @param char - Any character.
 */
export const convertCharToBinary = (char: string): string => CHARS.get(char) ?? '#';
