import findNumerics from '../numerics';

const errors = {
  bigInt: 'Invalid BigInt Literal',
  exponents: (char: string): string =>
    `Floating-point numbers require a valid exponent after the '${char}'`,
  identifier: 'Number followed directly by Identifier',
  unexpected: (char: string): string => `Unexpected token ${char}`,
};

describe('The findNumerics error states', () => {
  it('detects and reports BigInt followed by digits', () => {
    const numeric = findNumerics(0, '2', '2n2');

    expect(numeric).not.toBeNull();

    if (numeric !== null) {
      expect(numeric.err).toStrictEqual(errors.unexpected('2'));
    }
  });

  it('detects and reports multiple decimal points', () => {
    const numeric = findNumerics(0, '1', '1.2.3');

    expect(numeric).not.toBeNull();

    if (numeric !== null) {
      expect(numeric.err).toStrictEqual(errors.unexpected('.'));
    }
  });

  it('detects and reports multiple valid non-digit characters', () => {
    const numeric = findNumerics(0, '4', '4e2n');

    expect(numeric).not.toBeNull();

    if (numeric !== null) {
      expect(numeric.err).toStrictEqual(errors.identifier);
    }
  });

  it('detects and reports BigInts that include periods', () => {
    const numeric = findNumerics(0, '5', '5.6n');

    expect(numeric).not.toBeNull();

    if (numeric !== null) {
      expect(numeric.err).toStrictEqual(errors.bigInt);
    }
  });

  it('detects and reports non-valid characters', () => {
    const one = findNumerics(0, '9', '9a8');
    const two = findNumerics(0, '7', '7b');
    const three = findNumerics(0, '6', '6nx');

    expect(one).not.toBeNull();

    if (one !== null) {
      expect(one.err).toStrictEqual(errors.identifier);
    }

    expect(two).not.toBeNull();

    if (two !== null) {
      expect(two.err).toStrictEqual(errors.identifier);
    }

    expect(three).not.toBeNull();

    if (three !== null) {
      expect(three.err).toStrictEqual(errors.identifier);
    }
  });

  it('detects and reports invalid scientific notation', () => {
    const one = findNumerics(0, '1', '1e');
    const two = findNumerics(0, '1', '14E');

    expect(one).not.toBeNull();

    if (one !== null) {
      expect(one.err).toStrictEqual(errors.exponents('e'));
    }

    expect(two).not.toBeNull();

    if (two !== null) {
      expect(two.err).toStrictEqual(errors.exponents('E'));
    }
  });

  it('returns null is invalid value is provided', () => {
    const numerics = findNumerics(0, 'h', 'hello');

    expect(numerics).toBeNull();
  });
});

describe('The findNumerics function advances the cursor', () => {
  it('sets the final position to the sum of the initial index and the length of the input', () => {
    const testValue = '123456789';
    const numeric = findNumerics(0, '1', testValue);

    expect(numeric).not.toBeNull();

    if (numeric !== null) {
      expect(numeric.finalPosition).toStrictEqual(testValue.length);
    }
  });
});
