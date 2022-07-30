module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['jest', 'react', '@typescript-eslint'],
  rules: {
    // no longer needed w/ transformers
    'react/react-in-jsx-scope': 'off',
    // incompatible with antd
    'jsx-a11y/anchor-is-valid': 'off',
    // allow jsx in tsx
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    // OOTB not working w/ react app
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    // no-unused-vars will misidentify TS types
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // note you must disable the base rule as it can report incorrect errors
    // for eslint ^7
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
};
