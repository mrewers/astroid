/**
 * Calculates the relative value of a user's hole cards (initial two cards)
 * using the Chen Formula. The formula is as follows:
 *
 * Get the score (S) the higher of the two cards on a scale of 1-10 based on rank.
 * If cards are paired S = S * 2.
 * If cards are suited S = S + 2.
 * Subtract the gap (number of cards between the two cards) from S up to 5 points.
 * If the gap is < 2 and both cards are lower than a Queen add one to S (unless a pair).
 * Round half point scores up.
 */
import { arePaired, areSuited, getCardGap, lowerThanX } from './constants';
import type { ICard } from './constants';
import type { IPocketCardsData } from './pocketCards';

interface IIntermediateScore {
  readonly cards: ICard[];
  score: number;
}

/**
 * Returns the initial Chen score for a card based on it's rank.
 * Face cards have values between 10 and 6, the remaining cards
 * are worth half of their rank value.
 * @param card - Any card.
 */
const scoreCard = (card: ICard): number => {
  switch (card.rank) {
    case 'A':
      return 10;
    case 'K':
      return 8;
    case 'Q':
      return 7;
    case 'J':
      return 6;
    default:
      return (card.value + 1) / 2;
  }
};

/**
 * Identifies the higher of two cards and returns it's base score value.
 * @param cards - A combination of two cards.
 */
const highCardValue = (cards: ICard[]): IIntermediateScore => {
  const high = cards[0].value > cards[1].value ? cards[0] : cards[1];

  return { cards, score: scoreCard(high) };
};

/**
 * If the two cards are a pair (i.e. same rank), double the score.
 * @param cards - A combination of two cards.
 * @param score - The current score.
 */
const pairAdjustment = ({ cards, score }: IIntermediateScore): IIntermediateScore => {
  if (arePaired(cards)) {
    const doubled = score * 2;

    // A pair of fives receives and additional one point boost.
    return { cards, score: cards[0].rank === '5' ? doubled + 1 : doubled };
  }

  return { cards, score };
};

/**
 * If the two cards are suited, add 2 points to the score.
 * @param cards - A combination of two cards.
 * @param score - The current score.
 */
const suitedAdjustment = ({ cards, score }: IIntermediateScore): IIntermediateScore => {
  if (areSuited(cards)) {
    return { cards, score: score + 2 };
  }

  return { cards, score };
};

/**
 * Checks whether all provided cards are of lower value than a Queen card.
 * @param cards - A list of cards.
 */
const belowQueen = (cards: ICard[]): boolean => cards.every(card => lowerThanX(card, 11));

/**
 * Adjusts the score based on the gap between the two cards.
 * @param cards - A combination of two cards.
 * @param score - The current score.
 */
const gapAdjustment = ({ cards, score }: IIntermediateScore): number => {
  const gap = getCardGap(cards);

  let base = score;

  switch (gap) {
    case 0:
      break;
    case 1:
    case 2:
      base -= gap;
      break;
    case 3:
      base -= 4;
      break;
    default:
      base -= 5;
  }

  // An additional point is added if two cards are not paired,
  // but have a gap of less than 2 and are both below Queen value.
  const addBonus = gap < 2 && belowQueen(cards) && !arePaired(cards);

  return addBonus ? base + 1 : base;
};

/**
 * Uses the Chen formula to calculate the value of a given two-card combination.
 * @param cards - A combination of two cards.
 */
export const calculateChenScore = (cards: ICard[]): number => {
  const points = gapAdjustment(suitedAdjustment(pairAdjustment(highCardValue(cards))));

  return Math.round(points);
};

export const calculateChenFromData = (data: IPocketCardsData): number => {
  let score = scoreCard(data.highCard);

  if (data.pair) {
    score *= 2;
  }

  if (data.suited === true) {
    score += 2;
  }

  return Math.round(gapAdjustment({ cards: [data.highCard, data.lowCard], score }));
};
