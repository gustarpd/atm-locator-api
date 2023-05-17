const { resolve } = require('path');
const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  displayName: 'root-tests',
  testMatch: ['<rootDir>/src/**/*.test.ts', "**/__tests__/**/*.spec.(js|jsx|ts|tsx)"],
  testEnvironment: 'node',
  clearMocks: true,
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};