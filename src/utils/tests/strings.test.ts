import findStrings from '../strings';

const errors = {
  unterminated: (char: string, type: string): string => `Unterminated ${type}. Expected: ${char}`,
};

describe('The findStrings error states', () => {
  it('detects and reports unterminated strings', () => {
    const string = findStrings(0, '"', '"hello');

    expect(string).not.toBeNull();

    if (string !== null) {
      expect(string.err).toStrictEqual(errors.unterminated('"', 'string'));
    }

    const template = findStrings(0, '`', '`hello');

    expect(template).not.toBeNull();

    if (template !== null) {
      expect(template.err).toStrictEqual(errors.unterminated('`', 'template'));
    }
  });

  it('returns null is invalid value is provided', () => {
    const string = findStrings(0, '2', '200');

    expect(string).toBeNull();
  });
});

describe('The findStrings function advances the cursor', () => {
  it('sets the final position to the sum of the initial index and the length of the input', () => {
    const testValue = '"Hello World"';
    const strings = findStrings(0, '"', testValue);

    expect(strings).not.toBeNull();

    if (strings !== null) {
      expect(strings.finalPosition).toStrictEqual(testValue.length);
    }
  });
});
