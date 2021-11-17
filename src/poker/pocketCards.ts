import { RANKS } from './constants';
import { peek, pop } from '../fp/fp';

interface IPocketCards {
  readonly card: string;
  readonly combos: string[];
}

/**
 * Returns a list of all possible two-card combinations based on rank.
 * We disregard the particular suit, except to say whether the combo is suited or off suit.
 * The combos param is initialized by default, so you do not need to pass it in.
 * @param ranks - The list of possible card ranks (ace-2).
 * @param combos - A array to store the possible combinations.
 */
const pocketCards = (ranks: string[], combos: string[][] = []): string[] => {
  const current = peek(ranks) as string;

  // Placeholder array to store the combinations two given ranks.
  const mixes = [] as string[];

  ranks.forEach(rank => {
    const base = `${current}${rank}`;

    // If a pair add one entry, otherwise two (i.e. suited & off suit)
    if (rank === current) {
      mixes.push(base);
    } else {
      mixes.push(`${base}s`, `${base}o`);
    }
  });

  combos.push(mixes);

  // Move to the next rank.
  pop(ranks);

  // Recurse through the ranks until we visit them all.
  if (ranks.length > 0) {
    pocketCards(ranks, combos);
  }

  // We flatten the final array so that all the combos are at the same level.
  return combos.flat();
};

/**
 * Breaks the list pocket card combos into rows of 13 ordered by their relative strength.
 * The returned card property is included mostly to provide a key when iterating.
 * The rows param is initialized by default, so you do not need to pass it in.
 * @param ranks - The list of possible card ranks (ace-2).
 * @param combos - The list of all possible two card combos.
 * @param rows - A array to store the possible combinations.
 */
const orderPocketCards = (
  ranks: string[],
  combos: string[],
  rows: IPocketCards[] = []
): IPocketCards[] => {
  const card = pop(ranks) as string;

  // Off-suit combo with higher card, precedes pair, which precedes suited combo with lower card.
  const off = combos.filter(c => c.charAt(1) === card && c.endsWith('o'));
  const pair = combos.filter(c => c.startsWith(card) && c.endsWith(card));
  const suit = combos.filter(c => c.startsWith(card) && c.endsWith('s'));

  rows.push({ card, combos: [...off, ...pair, ...suit] });

  if (ranks.length > 0) {
    orderPocketCards(ranks, combos, rows);
  }

  return rows;
};

/**
 * Generate a matrix of possible two card combinations.
 * With AA in the top left position and 22 in the bottom right position.
 */
const pocketCardsMatrix = (): IPocketCards[] => {
  const combos = pocketCards([...RANKS]);

  return orderPocketCards([...RANKS], combos);
};

export default pocketCardsMatrix;
