import type { ICard } from '../constants';

/**
 * Combines the three card properties into a single card object.
 * @param rank - One of the 13 possible ranks (2 - Ace).
 * @param suit - One of the four possible suits.
 * @param value - A numeric value from 1-13 corresponding to the to the rank.
 */
const generateCard = (rank: string, suit: string, value: number): ICard => {
  return { rank, suit, value };
};

/**
 * Combines two lists of cards into a single (seven card) hand.
 * Helper to allow us to define meaningful combinations and then pepper them with random cards.
 * @param hand - The core of the hand that defines the hand value.
 * @param kickers - The rest of the cards to fill out a seven card hand.
 */
const generateHand = (hand: ICard[], kickers: ICard[]): ICard[] => [...hand, ...kickers];

// Clubs
const CA = generateCard('A', 'clubs', 13);
const CK = generateCard('K', 'clubs', 12);
const CQ = generateCard('Q', 'clubs', 11);
const CJ = generateCard('J', 'clubs', 10);
const CT = generateCard('T', 'clubs', 9);
const C9 = generateCard('9', 'clubs', 8);
const C8 = generateCard('8', 'clubs', 7);
const C7 = generateCard('7', 'clubs', 6);
const C6 = generateCard('6', 'clubs', 5);
const C5 = generateCard('5', 'clubs', 4);
const C4 = generateCard('4', 'clubs', 3);
const C3 = generateCard('3', 'clubs', 2);
const C2 = generateCard('2', 'clubs', 1);

// Diamonds
const DA = generateCard('A', 'diamonds', 13);
const DK = generateCard('K', 'diamonds', 12);
const DQ = generateCard('Q', 'diamonds', 11);
const DJ = generateCard('J', 'diamonds', 10);
const DT = generateCard('T', 'diamonds', 9);
const D9 = generateCard('9', 'diamonds', 8);
const D8 = generateCard('8', 'diamonds', 7);
const D7 = generateCard('7', 'diamonds', 6);
const D6 = generateCard('6', 'diamonds', 5);
const D5 = generateCard('5', 'diamonds', 4);
const D4 = generateCard('4', 'diamonds', 3);
const D3 = generateCard('3', 'diamonds', 2);
const D2 = generateCard('2', 'diamonds', 1);

// Hearts
const HA = generateCard('A', 'hearts', 13);
const HK = generateCard('K', 'hearts', 12);
const HQ = generateCard('Q', 'hearts', 11);
const HJ = generateCard('J', 'hearts', 10);
const HT = generateCard('T', 'hearts', 9);
const H9 = generateCard('9', 'hearts', 8);
const H8 = generateCard('8', 'hearts', 7);
const H7 = generateCard('7', 'hearts', 6);
const H6 = generateCard('6', 'hearts', 5);
const H5 = generateCard('5', 'hearts', 4);
const H4 = generateCard('4', 'hearts', 3);
const H3 = generateCard('3', 'hearts', 2);
const H2 = generateCard('2', 'hearts', 1);

// Spades
const SA = generateCard('A', 'spades', 13);
const SK = generateCard('K', 'spades', 12);
const SQ = generateCard('Q', 'spades', 11);
const SJ = generateCard('J', 'spades', 10);
const ST = generateCard('T', 'spades', 9);
const S9 = generateCard('9', 'spades', 8);
const S8 = generateCard('8', 'spades', 7);
const S7 = generateCard('7', 'spades', 6);
const S6 = generateCard('6', 'spades', 5);
const S5 = generateCard('5', 'spades', 4);
const S4 = generateCard('4', 'spades', 3);
const S3 = generateCard('3', 'spades', 2);
const S2 = generateCard('2', 'spades', 1);

// Meaningful combinations
const royalFlush = [SA, SK, SQ, SJ, ST];
const straightFlush = [H4, H5, H6, H7, H8];
const quads = [C6, D6, H6, S6];
const fullHouse = [C5, D5, H5, CQ, HQ];
const flush = [DA, DQ, DT, D8, D6];
const straight = [S3, H4, D5, C6, C7];
const trips = [D9, H9, S9];
const twoPair = [D2, H2, C4, D4];
const pair = [C3, D3];
const highCard = [HA];

// Controls
const controls = {
  fiveGap: [D8, C2],
  lower: [DK, DQ, DJ],
  paired: pair,
  suited: [S2, S7],
  unpaired: [D3, D5],
  unsuited: [C5, H9],
};

// A selection of possible pocket cards.
const holeCards = {
  o27: [C2, H7],
  pA: [CA, HA],
  pT: [CT, DT],
  s57: [H5, H7],
  sAK: [SA, SK],
};

const hands = {
  controls,
  flush: generateHand(flush, [C2, S5]),
  fullHouse: generateHand(fullHouse, [S8, CJ]),
  highCard: generateHand(highCard, [S2, S4, D5, C9, CJ, HQ]),
  holeCards,
  pair: generateHand(pair, [S4, D6, H8, HJ, DA]),
  quads: generateHand(quads, [S7, DJ, CK]),
  royalFlush: generateHand(royalFlush, [H3, H7]),
  straight: generateHand(straight, [DK, DJ]),
  straightFlush: generateHand(straightFlush, [S2, CT]),
  trips: generateHand(trips, [S2, HT, D7, CA]),
  twoPair: generateHand(twoPair, [C8, CT, HK]),
};

export default hands;
