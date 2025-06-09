const config = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'prettier',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'import/order': ['warn', { alphabetize: { order: 'asc', caseInsensitive: true } }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
    },
    ignorePatterns: ['dist/', 'node_modules/'],
  } as const;
  
  export default config;