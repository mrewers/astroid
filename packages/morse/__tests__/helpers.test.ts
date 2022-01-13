import { findMorseChars, findMorseWords } from '../helpers';
import { mockInputMorse, mockWords } from '../__mockdata__/mocks';

const { first, third } = mockWords;

describe('Helper functions', () => {
  it('identifies words breaks', () => {
    const words = findMorseWords(mockInputMorse);

    expect(words).toHaveLength(3);
    expect(words[0]).toStrictEqual(first.morse);
    expect(words[2]).toStrictEqual(third.morse);
  });

  it('identifies letters breaks', () => {
    const letters = findMorseChars(first.morse);

    expect(letters).toHaveLength(4);
    expect(letters[0]).toStrictEqual('-');
    expect(letters[3]).toStrictEqual('-');
  });
});
