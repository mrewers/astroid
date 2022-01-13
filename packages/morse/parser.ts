import { findMorseChars, findMorseWords, findTextChars, findTextWords } from './helpers';
import {
  convertBinaryToChar,
  convertBinaryToMorse,
  convertCharToBinary,
  convertMorseToBinary,
} from './translator';

/**
 * Converts Morse code into text.
 * @param str - A string encoded as Morse code.
 */
export const parseMorse = (str: string): string => {
  const words = findMorseWords(str);

  return words
    .map(word =>
      findMorseChars(convertMorseToBinary(word))
        .map(char => convertBinaryToChar(char))
        .join('')
    )
    .join(' ');
};

/**
 * Converts text into Morse code.
 * @param str - Any string.
 */
export const parseText = (str: string): string => {
  const words = findTextWords(str.toLocaleLowerCase());

  return words
    .map(word =>
      findTextChars(word)
        .map(char => convertBinaryToMorse(convertCharToBinary(char)))
        .join(' ')
    )
    .join(' / ');
};
