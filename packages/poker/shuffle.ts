import type { ICard } from './constants';

/**
 * Shuffles a group of cards using the Fisher-Yates sort algorithm.
 * @param cards - A collection of cards.
 */
const shuffle = (cards: ICard[]): ICard[] => {
  // Make copy of input so as not to mutate the input.
  const shuffled = [...cards];

  let l = cards.length;
  let temp; // Placeholder for selected element.
  let i; // Placeholder for selected index.

  while (l) {
    // Pick a remaining card at random.
    i = Math.floor(Math.random() * (l -= 1));

    // And swap it with the current card.
    temp = shuffled[l];

    /* eslint-disable no-param-reassign */
    shuffled[l] = shuffled[i];
    shuffled[i] = temp;
    /* eslint-enable */
  }

  return shuffled;
};

export default shuffle;
