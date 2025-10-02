import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // ← УКАЖИ РЕАЛЬНЫЕ ФАЙЛЫ
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts',   // или api.ts, если так называется
    '^@utils-types$': '<rootDir>/src/utils/types.ts',
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.json' }],
  },

  moduleDirectories: ['node_modules', '<rootDir>/src'],
};

export default config;
