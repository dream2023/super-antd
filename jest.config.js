const { join } = require('path');

module.exports = {
  setupFilesAfterEnv: ['./scripts/setupTests.js'],
  moduleNameMapper: {
    '@/': join(__dirname, './src/'),
    'super-antd': join(__dirname, './src/index.ts'),
  },
  roots: [
    '<rootDir>/tests/'
  ],
  verbose: true
};
