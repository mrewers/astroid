import * as C from '../constants';
import hands from './mocks';

describe('Poker constants', () => {
  it('has the right number of ranks', () => {
    expect(C.RANKS).toHaveLength(13);
  });

  it('has the right number of suits', () => {
    expect(C.SUITS).toHaveLength(4);
  });

  it('has the right number of values, all between 1 and 13', () => {
    expect(C.VALUE).toHaveLength(13);
    expect(Math.max(...C.VALUE)).toStrictEqual(13);
    expect(Math.min(...C.VALUE)).toStrictEqual(1);
  });

  it('has a full deck', () => {
    const deck = C.getTheDeck();

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

describe('Card helpers', () => {
  const { controls } = hands;

  it('identifies whether two cards are paired', () => {
    expect(C.arePaired(controls.paired)).toStrictEqual(true);
    expect(C.arePaired(controls.unpaired)).toStrictEqual(false);
  });

  it('identifies whether two cards are suited', () => {
    expect(C.areSuited(controls.suited)).toStrictEqual(true);
    expect(C.areSuited(controls.unsuited)).toStrictEqual(false);
  });

  it('calculates the number of cards between two cards', () => {
    expect(C.getCardGap(controls.paired)).toStrictEqual(0);
    expect(C.getCardGap(controls.fiveGap)).toStrictEqual(5);
  });

  it("check whether a card's value is below a given threshold", () => {
    expect(C.lowerThanX(controls.lower[0], 11)).toStrictEqual(false);
    expect(C.lowerThanX(controls.lower[1], 11)).toStrictEqual(false);
    expect(C.lowerThanX(controls.lower[2], 11)).toStrictEqual(true);
  });
});
