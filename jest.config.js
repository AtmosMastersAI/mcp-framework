/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/tests/**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@core/(.*)\\.js$': '<rootDir>/src/core/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@auth/(.*)\\.js$': '<rootDir>/src/auth/$1',
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@transport/(.*)\\.js$': '<rootDir>/src/transports/$1',
    '^@transport/(.*)$': '<rootDir>/src/transports/$1',
    '^@utils/(.*)\\.js$': '<rootDir>/src/utils/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@cli/(.*)\\.js$': '<rootDir>/src/cli/$1',
    '^@cli/(.*)$': '<rootDir>/src/cli/$1',
    '^@loaders/(.*)\\.js$': '<rootDir>/src/loaders/$1',
    '^@loaders/(.*)$': '<rootDir>/src/loaders/$1',
    '^@tools/(.*)\\.js$': '<rootDir>/src/tools/$1',
    '^@tools/(.*)$': '<rootDir>/src/tools/$1',
    '^@resources/(.*)\\.js$': '<rootDir>/src/resources/$1',
    '^@resources/(.*)$': '<rootDir>/src/resources/$1',
    '^@prompts/(.*)\\.js$': '<rootDir>/src/prompts/$1',
    '^@prompts/(.*)$': '<rootDir>/src/prompts/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          // Overriding tsconfig.json for tests to use modern node features
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
        },
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(\\@modelcontextprotocol/sdk)/)',
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/cli/**', '!src/index.ts'],
};
