import { parseMorse, parseText } from '../parser';
import { mockInputMorse, mockInputText } from '../__mockdata__/mocks';

describe('Parsing functions', () => {
  it('translates Morse into text', () => {
    const phrase = parseMorse(mockInputMorse);

    expect(phrase).toStrictEqual(mockInputText);
  });

  it('translates text into Morse', () => {
    const phrase = parseText(mockInputText);

    expect(phrase).toStrictEqual(mockInputMorse);
  });
});
