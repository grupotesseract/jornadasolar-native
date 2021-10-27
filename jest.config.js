module.exports = {
  testEnvironment: "jsdom",
  preset: "jest-expo",
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
      },
    },
  },
  setupFiles: [
    "<rootDir>/jest/setup.ts"
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)",
  ],
}