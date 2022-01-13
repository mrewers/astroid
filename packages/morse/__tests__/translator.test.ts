import { convertBinaryToChar, convertCharToBinary, convertMorseToBinary } from '../translator';
import { mockWords } from '../__mockdata__/mocks';

const { first } = mockWords;

describe('Translation functions', () => {
  it('translates morse letters into their equivalent', () => {
    const word = convertMorseToBinary(first.morse);

    expect(word).toStrictEqual(first.binary);
  });

  it('retrieves the expected letters from their binary representation', () => {
    const w = convertBinaryToChar('011');
    const o = convertBinaryToChar('111');
    const r = convertBinaryToChar('010');
    const invalid = convertBinaryToChar('111111');

    expect(w).toStrictEqual('w');
    expect(o).toStrictEqual('o');
    expect(r).toStrictEqual('r');
    expect(invalid).toStrictEqual('#');
  });

  it('translates letters into their equivalent binary representation', () => {
    const w = convertCharToBinary('w');
    const o = convertCharToBinary('o');
    const r = convertCharToBinary('r');

    expect(w).toStrictEqual('011');
    expect(o).toStrictEqual('111');
    expect(r).toStrictEqual('010');
  });
});
