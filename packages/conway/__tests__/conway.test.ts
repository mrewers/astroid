import shouldChangeStatus from '../conway';

const mocks = {
  dead: { live: false, neighbors: 2 },
  live: { live: true, neighbors: 2 },
  overPopulated: { live: true, neighbors: 4 },
  reproduce: { live: false, neighbors: 3 },
  underPopulated: { live: true, neighbors: 1 },
};

describe('The shouldChangeStatus', () => {
  it('should identify nodes that should change their status', () => {
    expect(shouldChangeStatus(mocks.overPopulated)).toStrictEqual(true);
    expect(shouldChangeStatus(mocks.underPopulated)).toStrictEqual(true);
    expect(shouldChangeStatus(mocks.reproduce)).toStrictEqual(true);
  });

  it('should identify nodes that should remain the same', () => {
    expect(shouldChangeStatus(mocks.dead)).toStrictEqual(false);
    expect(shouldChangeStatus(mocks.live)).toStrictEqual(false);
  });
});
