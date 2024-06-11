module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "packages/**/*.{ts,js,jsx}"
  ],
  coveragePathIgnorePatterns: [
    "jest.config.js",
    ".eslintrc.js",
    "/node_modules/",
    "/dist/",
  ],
  moduleNameMapper: {
    '^@opoint/(.*)$': '<rootDir>/packages/$1/src/'
  }
}
