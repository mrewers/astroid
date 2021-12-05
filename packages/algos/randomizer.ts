/**
 * Generates an array of a given length populated with randomly selected numbers.
 * @param len The number of values that should be populated into the array.
 * @param max The highest possible value (defaults to 500) for an array element.
 */
const randomNumberArray = (len: number, max = 500): number[] =>
  Array.from({ length: len }, () => Math.floor(Math.random() * max));

export default randomNumberArray;
