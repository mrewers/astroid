interface ICard {
  readonly rank: string;
  readonly suit: string;
  readonly value: number;
}

export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
export const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];

/**
 * Combines ranks and suits to create a deck of 52 cards.
 */
export const getTheDeck = (): ICard[] => {
  const cards = [] as ICard[];

  RANKS.forEach((r, idx) => {
    SUITS.forEach(s => cards.push({ rank: r, suit: s, value: 13 - idx }));
  });

  return cards;
};

export type { ICard };
