/**
 * Checks whether an item is an object.
 * @param obj - The possible object.
 */
const isObject = (obj: unknown): boolean => {
  // Arrays and null will return false positives when checking with instanceof.
  if (Array.isArray(obj) || obj === null) {
    return false;
  }

  // Check the value using instanceof to filter out primitives.
  if (!(obj instanceof Object)) {
    // Some objects (i.e. - Object.prototype and Object.create(null))
    // will return a false negative for instance of, but can be found
    // using it in conjunction with typeof.
    return typeof obj === 'object';
  }

  // Check that the type is an object to filter out functions;
  return typeof obj === 'object';
};

export default isObject;
