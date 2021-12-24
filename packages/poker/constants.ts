/* eslint-disable @typescript-eslint/no-type-alias */
type TCardRank = typeof RANKS[number];
type TCardSuit = typeof SUITS[number];
type TCardValue = typeof VALUES[number];
/* eslint-enable */
interface ICardValues {
  readonly rank: TCardRank;
  readonly value: TCardValue;
}
interface ICard extends ICardValues {
  readonly suit: TCardSuit;
}

export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
export const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'] as const;
export const VALUES = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1] as const;

/**
 * Generates a Map in to store the numeric value of each rank.
 */
export const rankValueMap = (): Map<TCardRank, TCardValue> => {
  const mapping = [];

  for (let i = 0; i < 13; i++) {
    mapping.push([RANKS[i], VALUES[i]]);
  }

  /* eslint-disable @typescript-eslint/consistent-type-assertions */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return new Map<TCardRank, TCardValue>(<any>mapping);
  /* eslint-enable */
};

/**
 * Retrieves the value of a card based on it's rank.
 * @param rank - The rank of a given card.
 */
export const getValueOfRank = (rank: TCardRank): TCardValue | undefined => {
  const mapping = rankValueMap();

  return mapping.get(rank);
};

/**
 * Retrieves the rank of a card based on it's value.
 * @param val - The value of a given card.
 */
export const getRankFromValue = (val: number): string | null => {
  const mapping = rankValueMap();

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of mapping.entries()) {
    if (value === val) {
      return key;
    }
  }

  return null;
};

/**
 * Construct a card (without it's suit) from the card's rank.
 * @param c - The card's rank.
 */
export const cardFromRank = (c: TCardRank): ICardValues => {
  return { rank: c, value: getValueOfRank(c) ?? 1 };
};

/**
 * Combines ranks and suits to create a deck of 52 cards.
 */
export const getTheDeck = (): ICard[] => {
  const cards = [] as ICard[];

  RANKS.forEach((r, idx) => {
    SUITS.forEach(s => cards.push({ rank: r, suit: s, value: (13 - idx) as TCardValue }));
  });

  return cards;
};

/**
 * Compares two cards to see if they are of the same rank.
 * If more than two cards are provided, only the first two will be checked.
 * @param cards - A list of two cards.
 */
export const arePaired = (cards: ICard[] | ICardValues[]): boolean =>
  cards[0].rank === cards[1].rank;

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
export const lowerThanX = (card: ICard | ICardValues, threshold: number): boolean =>
  card.value < threshold;

/**
 * Calculates the gap (i.e. number of ranks between) two given cards.
 * If more than two cards are provided, only the first two will be checked.
 * @param cards - A list of two cards.
 */
export const getCardGap = (cards: ICard[] | ICardValues[]): number => {
  const diff = Math.abs(cards[0].value - cards[1].value);

  return diff > 1 ? diff - 1 : 0;
};

export type { ICard, ICardValues, TCardRank, TCardSuit, TCardValue };
