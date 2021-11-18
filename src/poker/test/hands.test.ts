import {
  getHighCardValue,
  hasFlush,
  hasFullHouse,
  hasPair,
  hasQuads,
  hasRoyalFlush,
  hasStraight,
  hasStraightFlush,
  hasTrips,
  hasTwoPair,
} from '../hands';
import hands from './mocks';

describe('Hand checks', () => {
  it('identifies royal flushes', () => {
    expect(hasRoyalFlush(hands.royalFlush)).toStrictEqual(true);
    expect(hasRoyalFlush(hands.straightFlush)).toStrictEqual(false);
    expect(hasRoyalFlush(hands.quads)).toStrictEqual(false);
    expect(hasRoyalFlush(hands.fullHouse)).toStrictEqual(false);
    expect(hasRoyalFlush(hands.flush)).toStrictEqual(false);
    expect(hasRoyalFlush(hands.straight)).toStrictEqual(false);
    expect(hasRoyalFlush(hands.trips)).toStrictEqual(false);
    expect(hasRoyalFlush(hands.twoPair)).toStrictEqual(false);
    expect(hasRoyalFlush(hands.pair)).toStrictEqual(false);
    expect(hasRoyalFlush(hands.highCard)).toStrictEqual(false);
  });

  it('identifies straight flushes', () => {
    expect(hasStraightFlush(hands.royalFlush)).toStrictEqual(true);
    expect(hasStraightFlush(hands.straightFlush)).toStrictEqual(true);
    expect(hasStraightFlush(hands.quads)).toStrictEqual(false);
    expect(hasStraightFlush(hands.fullHouse)).toStrictEqual(false);
    expect(hasStraightFlush(hands.flush)).toStrictEqual(false);
    expect(hasStraightFlush(hands.straight)).toStrictEqual(false);
    expect(hasStraightFlush(hands.trips)).toStrictEqual(false);
    expect(hasStraightFlush(hands.twoPair)).toStrictEqual(false);
    expect(hasStraightFlush(hands.pair)).toStrictEqual(false);
    expect(hasStraightFlush(hands.highCard)).toStrictEqual(false);
  });

  it('identifies four of a kind', () => {
    expect(hasQuads(hands.royalFlush)).toStrictEqual(false);
    expect(hasQuads(hands.straightFlush)).toStrictEqual(false);
    expect(hasQuads(hands.quads)).toStrictEqual(true);
    expect(hasQuads(hands.fullHouse)).toStrictEqual(false);
    expect(hasQuads(hands.flush)).toStrictEqual(false);
    expect(hasQuads(hands.straight)).toStrictEqual(false);
    expect(hasQuads(hands.trips)).toStrictEqual(false);
    expect(hasQuads(hands.twoPair)).toStrictEqual(false);
    expect(hasQuads(hands.pair)).toStrictEqual(false);
    expect(hasQuads(hands.highCard)).toStrictEqual(false);
  });

  it('identifies a full house', () => {
    expect(hasFullHouse(hands.royalFlush)).toStrictEqual(false);
    expect(hasFullHouse(hands.straightFlush)).toStrictEqual(false);
    expect(hasFullHouse(hands.quads)).toStrictEqual(false);
    expect(hasFullHouse(hands.fullHouse)).toStrictEqual(true);
    expect(hasFullHouse(hands.flush)).toStrictEqual(false);
    expect(hasFullHouse(hands.straight)).toStrictEqual(false);
    expect(hasFullHouse(hands.trips)).toStrictEqual(false);
    expect(hasFullHouse(hands.twoPair)).toStrictEqual(false);
    expect(hasFullHouse(hands.pair)).toStrictEqual(false);
    expect(hasFullHouse(hands.highCard)).toStrictEqual(false);
  });

  it('identifies flushes', () => {
    expect(hasFlush(hands.royalFlush)).toStrictEqual(true);
    expect(hasFlush(hands.straightFlush)).toStrictEqual(true);
    expect(hasFlush(hands.quads)).toStrictEqual(false);
    expect(hasFlush(hands.fullHouse)).toStrictEqual(false);
    expect(hasFlush(hands.flush)).toStrictEqual(true);
    expect(hasFlush(hands.straight)).toStrictEqual(false);
    expect(hasFlush(hands.trips)).toStrictEqual(false);
    expect(hasFlush(hands.twoPair)).toStrictEqual(false);
    expect(hasFlush(hands.pair)).toStrictEqual(false);
    expect(hasFlush(hands.highCard)).toStrictEqual(false);
  });

  it('identifies straights', () => {
    expect(hasStraight(hands.royalFlush)).toStrictEqual(true);
    expect(hasStraight(hands.straightFlush)).toStrictEqual(true);
    expect(hasStraight(hands.quads)).toStrictEqual(false);
    expect(hasStraight(hands.fullHouse)).toStrictEqual(false);
    expect(hasStraight(hands.flush)).toStrictEqual(false);
    expect(hasStraight(hands.straight)).toStrictEqual(true);
    expect(hasStraight(hands.trips)).toStrictEqual(false);
    expect(hasStraight(hands.twoPair)).toStrictEqual(false);
    expect(hasStraight(hands.pair)).toStrictEqual(false);
    expect(hasStraight(hands.highCard)).toStrictEqual(false);
  });

  it('identifies a trips', () => {
    expect(hasTrips(hands.royalFlush)).toStrictEqual(false);
    expect(hasTrips(hands.straightFlush)).toStrictEqual(false);
    expect(hasTrips(hands.quads)).toStrictEqual(false);
    expect(hasTrips(hands.fullHouse)).toStrictEqual(true);
    expect(hasTrips(hands.flush)).toStrictEqual(false);
    expect(hasTrips(hands.straight)).toStrictEqual(false);
    expect(hasTrips(hands.trips)).toStrictEqual(true);
    expect(hasTrips(hands.twoPair)).toStrictEqual(false);
    expect(hasTrips(hands.pair)).toStrictEqual(false);
    expect(hasTrips(hands.highCard)).toStrictEqual(false);
  });

  it('identifies a two pair', () => {
    expect(hasTwoPair(hands.royalFlush)).toStrictEqual(false);
    expect(hasTwoPair(hands.straightFlush)).toStrictEqual(false);
    expect(hasTwoPair(hands.quads)).toStrictEqual(false);
    expect(hasTwoPair(hands.fullHouse)).toStrictEqual(false);
    expect(hasTwoPair(hands.flush)).toStrictEqual(false);
    expect(hasTwoPair(hands.straight)).toStrictEqual(false);
    expect(hasTwoPair(hands.trips)).toStrictEqual(false);
    expect(hasTwoPair(hands.twoPair)).toStrictEqual(true);
    expect(hasTwoPair(hands.pair)).toStrictEqual(false);
    expect(hasTwoPair(hands.highCard)).toStrictEqual(false);
  });

  it('identifies a pair', () => {
    expect(hasPair(hands.royalFlush)).toStrictEqual(false);
    expect(hasPair(hands.straightFlush)).toStrictEqual(false);
    expect(hasPair(hands.quads)).toStrictEqual(false);
    expect(hasPair(hands.fullHouse)).toStrictEqual(true);
    expect(hasPair(hands.flush)).toStrictEqual(false);
    expect(hasPair(hands.straight)).toStrictEqual(false);
    expect(hasPair(hands.trips)).toStrictEqual(false);
    expect(hasPair(hands.twoPair)).toStrictEqual(true);
    expect(hasPair(hands.pair)).toStrictEqual(true);
    expect(hasPair(hands.highCard)).toStrictEqual(false);
  });

  it('identifies a the high card in a hand', () => {
    expect(getHighCardValue(hands.royalFlush)).toStrictEqual(13);
    expect(getHighCardValue(hands.straightFlush)).toStrictEqual(9);
    expect(getHighCardValue(hands.quads)).toStrictEqual(12);
    expect(getHighCardValue(hands.fullHouse)).toStrictEqual(11);
    expect(getHighCardValue(hands.flush)).toStrictEqual(13);
    expect(getHighCardValue(hands.straight)).toStrictEqual(12);
    expect(getHighCardValue(hands.trips)).toStrictEqual(13);
    expect(getHighCardValue(hands.twoPair)).toStrictEqual(12);
    expect(getHighCardValue(hands.pair)).toStrictEqual(13);
    expect(getHighCardValue(hands.highCard)).toStrictEqual(13);
  });
});
