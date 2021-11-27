/**
 * Check whether the current live node is under populated.
 * @param neighbors - How many of the current node's neighbors are live.
 */
const underPopulated = (neighbors: number): boolean => neighbors < 2;

/**
 * Check whether the current live node is over populated.
 * @param neighbors - How many of the current node's neighbors are live.
 */
const overPopulated = (neighbors: number): boolean => neighbors > 3;

/**
 * Check whether the current dead node should come to life.
 * @param neighbors - How many of the current node's neighbors are live.
 */
const reproduce = (neighbors: number): boolean => neighbors === 3;

interface IStatus {
  readonly live: boolean;
  readonly neighbors: number;
}

/**
 * Check whether a given node's status should be altered.
 * @param param
 * @param param.live - Whether or not the current node it live.
 * @param param.neighbors - How many of the current node's neighbors are live.
 */
const shouldChangeStatus = ({ live, neighbors }: IStatus): boolean => {
  if (live) {
    return overPopulated(neighbors) || underPopulated(neighbors);
  }

  return reproduce(neighbors);
};

export default shouldChangeStatus;
