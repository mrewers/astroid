module.exports = {
  extends: ['@cryptopapers/eslint-config'],
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
        '@typescript-eslint/no-type-alias': [
          'error',
          {
            allowAliases: 'in-unions',
            allowGenerics: 'always'
          }
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
        'func-names': [
          'warn',
          'always',
          {
            generators: 'as-needed',
          },
        ],
        'import/no-unassigned-import': [
          'error',
          {
            allow: ['**/*.css', '**/*.sass', '**/*.scss', 'preact/devtools'],
          },
        ],
        'sort-imports': 'off',
      },
      settings: {
        react: {
          pragma: 'h',
          version: '16', // Since we're using Preact, we manually specify the React version.
        }
      }
    },
    {
      files: ['packages/parser/**/*.ts'], // Rule overrides for the parser library.
      rules: {
        'no-plusplus': 'off', // Prefix increment is helpful when looping over characters.
        'sort-keys': 'off', // We want the token keys in a specific non-alphabetical order.
      }
    },
  ],
  parser: '@babel/eslint-parser',
};