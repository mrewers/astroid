import { first, peek } from '../arrays';

const mockArray = [{ item: 1 }, { item: 2 }];

describe('The array helper functions', () => {
  it('removes the first element from the array, using first', () => {
    const firstMock = [...mockArray];

    const item = first(firstMock);

    expect(item).toStrictEqual({ item: 1 });
    expect(firstMock).toHaveLength(1);
  });

  it('retrieves the first element from the array, without altering it using peek', () => {
    const peekMock = [...mockArray];

    const item = peek(peekMock);

    expect(item).toStrictEqual({ item: 1 });
    expect(peekMock).toHaveLength(2);
  });
});
