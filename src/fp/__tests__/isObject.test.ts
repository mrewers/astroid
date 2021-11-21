import isObject from '../isObject';

describe('The isObject helper functions', () => {
  // Objects.
  const obj = {};
  const create = Object.create(null); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  const proto = Object.prototype;

  // Non-objects.
  const arr = [] as string[];
  const bool = false;
  const func = (): void => {};
  const nothing = null;
  const num = 8;
  const string = 'Hello';
  const undef = undefined; // eslint-disable-line no-undefined

  it('correctly identifies objects', () => {
    expect(isObject(obj)).toStrictEqual(true);
    expect(isObject(create)).toStrictEqual(true);
    expect(isObject(proto)).toStrictEqual(true);
  });

  it('correctly identifies non-object types', () => {
    expect(isObject(arr)).toStrictEqual(false);
    expect(isObject(bool)).toStrictEqual(false);
    expect(isObject(func)).toStrictEqual(false);
    expect(isObject(nothing)).toStrictEqual(false);
    expect(isObject(num)).toStrictEqual(false);
    expect(isObject(string)).toStrictEqual(false);
    expect(isObject(undef)).toStrictEqual(false);
  });
});
