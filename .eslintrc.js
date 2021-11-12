module.exports = {
  extends: ['@cryptopapers/eslint-config', '@cryptopapers/eslint-config/react'],
  ignorePatterns: ['**/dist/', 'docs/'],
  overrides: [
    {
      extends: [
        '@cryptopapers/eslint-config',
        '@cryptopapers/eslint-config/react',
        '@cryptopapers/eslint-config/typescript',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as', // Angle bracket notation, while preferred, doesn't play well with JSX.
          },
        ],
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        'capitalized-comments': [
          'error',
          'always',
          {
            ignoreConsecutiveComments: true,
            ignoreInlineComments: true,
            ignorePattern: 'pragma|ignore|prettier-ignore',
          }
        ],
        'sort-imports': 'off',
      },
    },
    {
      files: ['src/lexer/*.ts'], // Rule overrides for the parser library.
      rules: {
        'no-plusplus': 'off', // Prefix increment is helpful when looping over characters.
        'sort-keys': 'off', // We want the token keys in a specific non-alphabetical order.
      }
    },
  ],
  parser: '@babel/eslint-parser',
  settings: {
    react: { pragma: 'h' }
  }
};