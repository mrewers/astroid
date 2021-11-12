import findOperators from '../operators';

describe('The findOperators error states', () => {
  it('detects and reports invalid operators', () => {
    const op = findOperators(0, '<', '<--');

    expect(op).not.toBeNull();

    if (op !== null) {
      expect(op.err).toStrictEqual('Invalid operator <--');
    }
  });

  it('returns null if a non-operator value is provided', () => {
    const op = findOperators(0, '2', '200');

    expect(op).toBeNull();
  });
});

describe('The findOperators function advances the cursor', () => {
  it('sets the final position to the immediately following the found operator', () => {
    const testValue = '>>> 1';
    const op = findOperators(0, '>', testValue);

    expect(op).not.toBeNull();

    if (op !== null) {
      expect(op.finalPosition).toStrictEqual(3);
    }
  });
});
