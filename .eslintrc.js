module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'require-atomic-updates': 'warn',
    'no-return-await': 'warn',
    'require-await': 'warn',
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': 'warn',
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 'warn',
    'new-cap': 'warn',
    'no-nested-ternary': 'warn',
    camelcase: 'warn',
  },
}
