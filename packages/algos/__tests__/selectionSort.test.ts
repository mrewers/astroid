import selectionSortIterator from '../selectionSort';
import type { ISelectionSortYield } from '../selectionSort';

const mockUnsorted = [29, 484, 1, 29, 92, 34];
const mockSorted = [1, 29, 29, 34, 92, 484];

describe('The selection sort algorithm', () => {
  it('sorts an array of numbers from lowest to highest', () => {
    const sorted = selectionSortIterator(mockUnsorted);

    let result;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < mockUnsorted.length; i++) {
      result = sorted.next().value as ISelectionSortYield;
    }

    expect(result).toBeDefined();
    expect(result?.sorted).toStrictEqual(mockSorted);
  });
});
