import { calculateChenScore, calculateChenFromData } from '../chen';
import { getDataFromShorthand } from '../pocketCards';
import hands from '../__mockdata__/mocks';
import type { IPocketCardsData } from '../pocketCards';

describe('The Chen Formula', () => {
  it('should return the expected value from card objects', () => {
    const { holeCards } = hands;

    expect(calculateChenScore(holeCards.o27)).toStrictEqual(-1);
    expect(calculateChenScore(holeCards.pA)).toStrictEqual(20);
    expect(calculateChenScore(holeCards.pT)).toStrictEqual(10);
    expect(calculateChenScore(holeCards.s57)).toStrictEqual(6);
    expect(calculateChenScore(holeCards.sAK)).toStrictEqual(12);
  });

  it('should return the expected value from shorthand data', () => {
    const d = (sh: string): IPocketCardsData => getDataFromShorthand(sh);

    expect(calculateChenFromData(d('27o'))).toStrictEqual(-1);
    expect(calculateChenFromData(d('AA'))).toStrictEqual(20);
    expect(calculateChenFromData(d('TT'))).toStrictEqual(10);
    expect(calculateChenFromData(d('57s'))).toStrictEqual(6);
    expect(calculateChenFromData(d('AKs'))).toStrictEqual(12);
  });
});
