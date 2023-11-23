const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  bail: 1,
  clearMocks: true,
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',

  coveragePathIgnorePatterns: ['/node_modules'],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  setupFiles: ['./setupTests.ts'],

  testMatch: ['**/*.test.*'],

  testPathIgnorePatterns: ['node_modules', 'dist', 'testData.ts'],

  roots: ['<rootDir>'],

  modulePaths: [compilerOptions.baseUrl],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
