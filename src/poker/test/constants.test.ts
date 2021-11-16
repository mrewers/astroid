import { getTheDeck, RANKS, SUITS } from '../constants';

describe('Poker constants', () => {
  it('has the right number of ranks', () => {
    expect(RANKS).toHaveLength(13);
  });

  it('has the right number of suits', () => {
    expect(SUITS).toHaveLength(4);
  });

  it('has a full deck', () => {
    const deck = getTheDeck();

    // There are 52 cards in a deck.
    expect(deck).toHaveLength(52);

    for (let i = 13; i > 0; i--) {
      const value = deck.filter(card => card.value === i);

      // There are four cards of each value in the deck.
      expect(value).toHaveLength(4);

      // Cards with the same value have the same rank.
      const ranks = value.map(card => card.rank);

      expect(ranks.every((v, _, arr) => v === arr[0])).toStrictEqual(true);

      // There is one of each suite per value.
      const suits = value.map(card => card.suit);

      expect(suits).toContain('clubs');
      expect(suits).toContain('diamonds');
      expect(suits).toContain('hearts');
      expect(suits).toContain('spades');
    }
  });
});
