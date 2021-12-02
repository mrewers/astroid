import selectionSort from '../selectionSort';

const mockUnsorted = [29, 484, 1, 29, 92, 34];
const mockSorted = [1, 29, 29, 34, 92, 484];

describe('The selection sort algorithm', () => {
  it('sorts an array of numbers from lowest to highest', () => {
    const sorted = selectionSort(mockUnsorted);

    expect(sorted).toStrictEqual(mockSorted);
  });
});
