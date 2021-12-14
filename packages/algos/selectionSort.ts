type TPrevious = Array<{
  index: number;
  values: number[];
}>;

interface ISelectionSortYield {
  index: number;
  previous: TPrevious;
  sorted: number[];
}

/**
 * Uses the selection sort algorithm to sort a list
 * of numbers from the lowest to highest value.
 * As an iterator, the function yields the partially
 * sorted values at each step of the sort.
 * @param arr - A list of numbers to be sorted.
 */
const selectionSortIterator = function* (
  arr: number[]
): Generator<ISelectionSortYield, void, void> {
  const sorted = [...arr];
  const previous = [];

  for (let i = 0; i < arr.length; i++) {
    // Add the current values to the list of previous values.
    previous.unshift({ index: i - 1, values: [...sorted] });

    // Create a temporary subarray of unsorted elements.
    const remaining = sorted.slice(i);

    // Find the smallest element in the unsorted subarray.
    const min = Math.min(...remaining);

    // Find the index of the smallest unsorted element.
    const instance = sorted.indexOf(min, i);

    // Remove the smallest unsorted element from the unsorted subarray.
    sorted.splice(instance, 1);

    // Re-add it to the end of the sorted subarray.
    sorted.splice(i, 0, min);

    yield { index: i, previous, sorted };
  }
};

export type { ISelectionSortYield, TPrevious };

export default selectionSortIterator;
