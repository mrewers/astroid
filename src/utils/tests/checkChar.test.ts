import { checkChar } from '../checkChar';

const chars = {
  letter: 'a',
  newLine: '\n',
  number: '1',
  space: ' ',
  tab: '\t',
};

describe('Character check', () => {
  it('correctly identifies letters', () => {
    expect(checkChar.isLetter(chars.letter)).toStrictEqual(true);
    expect(checkChar.isLetter(chars.number)).toStrictEqual(false);
    expect(checkChar.isLetter(chars.space)).toStrictEqual(false);
  });

  it('correctly identifies numbers', () => {
    expect(checkChar.isNumber(chars.number)).toStrictEqual(true);
    expect(checkChar.isNumber(chars.letter)).toStrictEqual(false);
    expect(checkChar.isNumber(chars.space)).toStrictEqual(false);
  });

  it('correctly identifies whitespace', () => {
    expect(checkChar.isWhiteSpace(chars.newLine)).toStrictEqual(true);
    expect(checkChar.isWhiteSpace(chars.space)).toStrictEqual(true);
    expect(checkChar.isWhiteSpace(chars.tab)).toStrictEqual(true);
    expect(checkChar.isWhiteSpace(chars.letter)).toStrictEqual(false);
    expect(checkChar.isWhiteSpace(chars.number)).toStrictEqual(false);
  });

  it('correctly identifies parenthetical elements', () => {
    expect(checkChar.isBracesOpen('{')).toStrictEqual(true);
    expect(checkChar.isBracesClose('}')).toStrictEqual(true);
    expect(checkChar.isBracketOpen('[')).toStrictEqual(true);
    expect(checkChar.isBracketClose(']')).toStrictEqual(true);
    expect(checkChar.isParenOpen('(')).toStrictEqual(true);
    expect(checkChar.isParenClose(')')).toStrictEqual(true);
  });

  it('correctly identifies quotation characters', () => {
    expect(checkChar.isBacktick('`')).toStrictEqual(true);
    expect(checkChar.isDoubleQuote('"')).toStrictEqual(true);
    expect(checkChar.isSingleQuote("'")).toStrictEqual(true);
    expect(checkChar.isSingleQuote(chars.letter)).toStrictEqual(false);
  });
});
