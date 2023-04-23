/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@burns-depression/(.*)': '<rootDir>/src/$1',
    '^.+\\.(css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts',
  ],
};
