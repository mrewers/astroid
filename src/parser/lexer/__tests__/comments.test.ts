import findComments from '../comments';

describe('The findComments error states', () => {
  it('detects and reports unterminated block comments', () => {
    const comment = findComments(0, '/', '/* test');

    expect(comment).not.toBeNull();

    if (comment !== null) {
      expect(comment.err).toStrictEqual('Unterminated block comment. Expected: */');
    }
  });

  it('returns null if a non-operator value is provided', () => {
    const comment = findComments(0, '2', '200');

    expect(comment).toBeNull();
  });
});

describe('The findComments function advances the cursor', () => {
  it('sets the final position to the immediately following the found comment', () => {
    const testValue = '/* test */ a';
    const comment = findComments(0, '/', testValue);

    expect(comment).not.toBeNull();

    if (comment !== null) {
      expect(comment.finalPosition).toStrictEqual(testValue.length - 2);
    }
  });
});
