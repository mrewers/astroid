const booleans = ['true', 'false'];
const declarations = ['const', 'let', 'var'];

const keywords = [
  'break',
  'case',
  'catch',
  'class',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'void',
  'while',
  'with',
  'yield',
  ...declarations,
];

const isMember = (word: string, list: string[]): boolean => list.includes(word);

export const isBoolean = (word: string): boolean => isMember(word, booleans);
export const isDeclaration = (word: string): boolean => isMember(word, declarations);
export const isKeyword = (word: string): boolean => isMember(word, keywords);

export const isNull = (word: string): boolean => word === 'null';

export const keywordSearches = {
  isBoolean,
  isDeclaration,
  isKeyword,
  isNull,
};
