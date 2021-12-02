const assignmentOps = [
  { name: 'Assignment', symbol: '=', type: 'assignment', unary: false },
  { name: 'Addition assignment', symbol: '+=', type: 'assignment', unary: false },
  { name: 'Subtraction assignment', symbol: '-=', type: 'assignment', unary: false },
  { name: 'Multiplication assignment', symbol: '*=', type: 'assignment', unary: false },
  { name: 'Division assignment', symbol: '/=', type: 'assignment', unary: false },
  { name: 'Remainder assignment', symbol: '%=', type: 'assignment', unary: false },
  { name: 'Exponentiation assignment', symbol: '**=', type: 'assignment', unary: false },
  { name: 'Left shift assignment', symbol: '<<=', type: 'assignment', unary: false },
  { name: 'Right shift assignment', symbol: '>>=', type: 'assignment', unary: false },
  { name: 'Unsigned right shift assignment', symbol: '>>>=', type: 'assignment', unary: false },
  { name: 'Bitwise AND assignment', symbol: '&=', type: 'assignment', unary: false },
  { name: 'Bitwise XOR assignment', symbol: '^=', type: 'assignment', unary: false },
  { name: 'Bitwise OR assignment', symbol: '|=', type: 'assignment', unary: false },
  { name: 'Logical AND assignment', symbol: '&&=', type: 'assignment', unary: false },
  { name: 'Logical OR assignment', symbol: '||=', type: 'assignment', unary: false },
  { name: 'Logical nullish assignment', symbol: '??=', type: 'assignment', unary: false },
];

const bitwiseOps = [
  { name: 'Bitwise AND', symbol: '&', type: 'bitwise', unary: false },
  { name: 'Bitwise OR', symbol: '|', type: 'bitwise', unary: false },
  { name: 'Bitwise XOR', symbol: '^', type: 'bitwise', unary: false },
  { name: 'Bitwise NOT', symbol: '~', type: 'bitwise', unary: true },
  { name: 'Left shift', symbol: '<<', type: 'bitwise', unary: false },
  { name: 'Sign-propagating right shift', symbol: '>>', type: 'bitwise', unary: false },
  { name: 'Zero-fill right shift', symbol: '>>>', type: 'bitwise', unary: false },
];

const arithmeticOps = [
  { name: 'Addition', symbol: '+', type: 'arithmetic', unary: false },
  { name: 'Subtraction', symbol: '-', type: 'arithmetic', unary: false },
  { name: 'Multiplication', symbol: '*', type: 'arithmetic', unary: false },
  { name: 'Division', symbol: '/', type: 'arithmetic', unary: false },
  { name: 'Remainder', symbol: '%', type: 'arithmetic', unary: false },
  { name: 'Increment', symbol: '++', type: 'arithmetic', unary: false },
  { name: 'Decrement', symbol: '--', type: 'arithmetic', unary: false },
  { name: 'Exponentiation operator', symbol: '**', type: 'arithmetic', unary: false },
];

const logicalOps = [
  { name: 'Logical AND', symbol: '&&', type: 'logical', unary: false },
  { name: 'Logical OR', symbol: '||', type: 'logical', unary: false },
  { name: 'Logical NOT', symbol: '!', type: 'logical', unary: true },
];

const comparisonOps = [
  { name: 'Equal', symbol: '==', type: 'comparison', unary: false },
  { name: 'Not equal', symbol: '!=', type: 'comparison', unary: false },
  { name: 'Strict equal', symbol: '===', type: 'comparison', unary: false },
  { name: 'Strict not equal', symbol: '!==', type: 'comparison', unary: false },
  { name: 'Greater than', symbol: '>', type: 'comparison', unary: false },
  { name: 'Greater than or equal', symbol: '>=', type: 'comparison', unary: false },
  { name: 'Less than', symbol: '<', type: 'comparison', unary: false },
  { name: 'Less than or equal', symbol: '<=', type: 'comparison', unary: false },
];

const unaryOps = [
  { name: 'Unary negation', symbol: '-', type: 'arithmetic', unary: true },
  { name: 'Unary plus', symbol: '+', type: 'arithmetic', unary: true },
];

const operators = {
  assignmentOps,
  arithmeticOps,
  bitwiseOps,
  comparisonOps,
  logicalOps,
  unaryOps,
};

export const symbols = {
  assignment: assignmentOps.map(op => op.symbol),
};

export default operators;
