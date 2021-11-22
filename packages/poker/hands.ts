import { RANKS, SUITS, VALUE } from './constants';
import type { ICard } from './constants';

type IGrouped = Record<string, ICard[]>;

/**
 * Returns the provided cards ordered by a given property.
 * @param cards - A list of cards.
 * @param property - The cards property to filter on.
 * @param list - The list of options for the selected card property.
 */
const groupBy = (
  cards: ICard[],
  property: 'rank' | 'suit' | 'value',
  list: number[] | string[]
): IGrouped => {
  const group = {} as IGrouped;

  list.forEach(item => {
    const inGroup = cards.filter(card => card[property] === item);

    group[item] = inGroup;
  });

  return group;
};

/**
 * Returns the provided cards grouped by their rank.
 * @param cards - A list of cards.
 */
const groupByRank = (cards: ICard[]): IGrouped => groupBy(cards, 'rank', RANKS);

/**
 * Returns the provided cards grouped by their suit.
 * @param cards - A list of cards.
 */
const groupBySuit = (cards: ICard[]): IGrouped => groupBy(cards, 'suit', SUITS);

/**
 * Returns the provided cards grouped by their value.
 * @param cards - A list of cards.
 */
const groupByValue = (cards: ICard[]): IGrouped => groupBy(cards, 'value', VALUE); // eslint-disable-line

/**
 * Returns the provided cards ordered by their value.
 * @param cards - A list of cards.
 */
const orderByValue = (cards: ICard[]): ICard[] => {
  const byValue = [] as ICard[];

  for (let i = 13; i > 0; i--) {
    cards.forEach(card => {
      if (card.value === i) {
        byValue.push(card);
      }
    });
  }

  return byValue;
};

/**
 * Iterates through the properties in a list checking how many times each on appears in the group.
 * @param groups - An number of cards grouped by a given property.
 * @param len - The number of instances to check for.
 * @param list - The list of options for the selected card property.
 * @param op - The comparison operator to use, defaults to === but also accepts >.
 */
const hasGroupOfLength = (groups: IGrouped, len: number, list: string[], op?: string): number => {
  let isTrue = 0;

  list.forEach(prop => {
    switch (op) {
      case '>':
        if (groups[prop].length > len) {
          isTrue += 1;
        }
        break;
      default:
        if (groups[prop].length === len) {
          isTrue += 1;
        }
    }
  });

  return isTrue;
};

/**
 * Gets the number of pairs (two cards of the same rank) in a hand.
 * @param cards - A list of cards.
 */
const pairs = (cards: ICard[]): number => {
  const grouped = groupByRank(cards);

  return hasGroupOfLength(grouped, 2, RANKS);
};

/**
 * If the provided hand contains a flush, return the flush cards.
 * @param cards - A list of cards.
 */
const getFlush = (cards: ICard[]): ICard[] => {
  const grouped = groupBySuit(cards);

  let f = [] as ICard[];

  SUITS.forEach(suit => {
    if (grouped[suit].length > 4) {
      f = grouped[suit];
    }
  });

  return f;
};

/**
 * Iterates through all cards compiling the longest list of consecutive cards.
 * Assumes that the provided cards are sorted from highest to lowest value.
 * @param straight - The list of cards added to the straight.
 * @param curr - The current card.
 */
const straightReducer = (straight: ICard[], curr: ICard): ICard[] => {
  // If first value add to placeholder array.
  if (!straight.length) {
    straight.push(curr);
  } else {
    // Get the last item from the placeholder array.
    const last = straight[straight.length - 1];

    // If current value is consecutive with the last, add to the placeholder array.
    if (curr.value === last.value - 1) {
      straight.push(curr);
    } else if (straight.length < 4) {
      straight.splice(0, straight.length);
      straight.push(curr);
    }
  }

  // Output the final placeholder array.
  return straight;
};

/**
 * Gets the value of the high card in a group of cards.
 * @param cards - A list of cards.
 */
export const getHighCardValue = (cards: ICard[]): number => {
  let high = 0;

  cards.forEach(card => {
    if (card.value > high) {
      high = card.value;
    }
  });

  return high;
};

/**
 * Checks if the user has a flush (five cards of the same suit).
 * @param cards - A list of cards.
 */
export const hasFlush = (cards: ICard[]): boolean => {
  const grouped = groupBySuit(cards);

  return hasGroupOfLength(grouped, 4, SUITS, '>') > 0;
};

/**
 * Checks if the user has a straight (five cards in rank order).
 * @param cards - A list of cards.
 */
export const hasStraight = (cards: ICard[]): boolean => {
  const ordered = orderByValue(cards);

  const straight = ordered.reduce(straightReducer, []);

  return straight.length > 4;
};

/**
 * Checks if the user has a straight flush (five cards of the same suit in rank order).
 * @param cards - A list of cards.
 */
export const hasStraightFlush = (cards: ICard[]): boolean => {
  const flush = hasFlush(cards);

  if (flush) {
    const hand = getFlush(cards);

    return hasStraight(hand);
  }

  return false;
};

/**
 * Checks if the user has a royal flush (five cards of the same suit in rank order with Ace high).
 * @param cards - A list of cards.
 */
export const hasRoyalFlush = (cards: ICard[]): boolean => {
  const isSF = hasStraightFlush(cards);

  if (isSF) {
    const flush = orderByValue(getFlush(cards));

    const sf = flush.reduce(straightReducer, []);

    return getHighCardValue(sf) === 13;
  }

  return false;
};

/**
 * Checks if the user has a four of a kind (four cards of the same rank).
 * @param cards - A list of cards.
 */
export const hasQuads = (cards: ICard[]): boolean => {
  const grouped = groupByRank(cards);

  return hasGroupOfLength(grouped, 4, RANKS) > 0;
};

/**
 * Checks if the user has a three of a kind (three cards of the same rank).
 * @param cards - A list of cards.
 */
export const hasTrips = (cards: ICard[]): boolean => {
  const grouped = groupByRank(cards);

  return hasGroupOfLength(grouped, 3, RANKS) > 0;
};

/**
 * Checks if the user has a two pair (two distinct instances of two cards of the same rank).
 * @param cards - A list of cards.
 */
export const hasTwoPair = (cards: ICard[]): boolean => pairs(cards) > 1;

/**
 * Checks if the user has a pair (two cards of the same rank).
 * @param cards - A list of cards.
 */
export const hasPair = (cards: ICard[]): boolean => pairs(cards) > 0;

/**
 * Checks if the user has a full house (three cards of one rank and two cards of another rank).
 * @param cards - A list of cards.
 */
export const hasFullHouse = (cards: ICard[]): boolean => {
  const trips = hasTrips(cards);
  const pair = hasPair(cards);

  return trips && pair;
};
