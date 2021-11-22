interface ICard {
  readonly rank: string;
  readonly suit?: string;
  readonly value: number;
}

export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
export const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
export const VALUE = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

/**
 * Generates a Map in to store the numeric value of each rank.
 */
export const rankValueMap = (): Map<string, number> => {
  const mapping = [];

  for (let i = 0; i < 13; i++) {
    mapping.push([RANKS[i], VALUE[i]]);
  }

  /* eslint-disable @typescript-eslint/consistent-type-assertions */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return new Map<string, number>(<any>mapping);
  /* eslint-enable */
};

/**
 * Retrieves the value of a card based on it's rank.
 * @param rank - The rank of a given card.
 */
export const getRankValue = (rank: string): number | undefined => {
  const mapping = rankValueMap();

  return mapping.get(rank);
};

/**
 * Construct a card (without it's suit) from the card's rank.
 * @param c - The card's rank.
 */
export const cardFromRank = (c: string): ICard => {
  return { rank: c, value: getRankValue(c) ?? 0 };
};

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

/**
 * Compares two cards to see if they are of the same rank.
 * If more than two cards are provided, only the first two will be checked.
 * @param cards - A list of two cards.
 */
export const arePaired = (cards: ICard[]): boolean => cards[0].rank === cards[1].rank;

/**
 * Compares two cards to see if they are of the same suit.
 * If more than two cards are provided, only the first two will be checked.
 * @param cards - A list of two cards.
 */
export const areSuited = (cards: ICard[]): boolean => cards[0].suit === cards[1].suit;

/**
 * Check if a give card's value is below a particular amount.
 * @param card - Any card.
 * @param threshold - The number below which a card should be.
 */
export const lowerThanX = (card: ICard, threshold: number): boolean => card.value < threshold;

/**
 * Calculates the gap (i.e. number of ranks between) two given cards.
 * If more than two cards are provided, only the first two will be checked.
 * @param cards - A list of two cards.
 */
export const getCardGap = (cards: ICard[]): number => {
  const diff = Math.abs(cards[0].value - cards[1].value);

  return diff > 1 ? diff - 1 : 0;
};

export type { ICard };
