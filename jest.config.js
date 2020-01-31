module.exports = {
  collectCoverageFrom: [
    '<rootDir>/routes/**/*.{js,jsx,mjs}',
    '<rootDir>/utils/**/*.{js,jsx,mjs}',
  ],
  testMatch: [
    '<rootDir>/routes/**/*.(spec|test).{js,jsx,mjs}',
    '<rootDir>/utils/**/*.(spec|test).{js,jsx,mjs}',
  ],
  coverageReporters: [
    'html'
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  moduleFileExtensions: [
    'web.js',
    'js',
    'json',
    'node',
    'mjs'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  verbose: true,
};
