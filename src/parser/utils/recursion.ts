import type { IAstBody } from '../analyzer/analyzeSyntax';

const recurse = (
  arr: IAstBody[],
  func: (a: IAstBody[]) => { value: IAstBody; remaining: IAstBody[] },
  final: IAstBody[] = []
): IAstBody[] => {
  if (arr.length) {
    const { value, remaining } = func(arr);

    final.push(value);

    recurse(remaining, func, final);
  }

  return final;
};

export default recurse;
