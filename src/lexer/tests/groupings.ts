import findGroupings from '../groupings';

describe('The findGroupings function advances the cursor', () => {
  it('sets the final position to the immediately following the found parenthetical', () => {
    const group = findGroupings(0, '(');

    expect(group).not.toBeNull();

    if (group !== null) {
      expect(group.finalPosition).toStrictEqual(1);
    }
  });
});
