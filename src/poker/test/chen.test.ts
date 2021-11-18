import calculateChenScore from '../chen';
import hands from './mocks';

describe('The Chen Formula', () => {
  it('should return the expected value', () => {
    const { holeCards } = hands;

    expect(calculateChenScore(holeCards.o27)).toStrictEqual(-1);
    expect(calculateChenScore(holeCards.pA)).toStrictEqual(20);
    expect(calculateChenScore(holeCards.pT)).toStrictEqual(10);
    expect(calculateChenScore(holeCards.s57)).toStrictEqual(6);
    expect(calculateChenScore(holeCards.sAK)).toStrictEqual(12);
  });
});
