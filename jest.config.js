const { join } = require('path');

module.exports = {
  setupFilesAfterEnv: ['./scripts/setupTests.js'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    'super-antd': join(__dirname, './src/index.ts'),
  },
  roots: ['<rootDir>/tests/'],
  verbose: true,
};
