/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/tests/**/*.test.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
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
