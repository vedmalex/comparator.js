const { defaults } = require('jest-config')

module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: null,
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|jsx?)$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  clearMocks: true,
  transform: {
    '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|jsx?)$': [
      'ts-jest',
      {
        /* ts-jest config goes here in Jest */
      },
    ],
  },
}
