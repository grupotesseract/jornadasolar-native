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
    "<rootDir>/jest/setupFiles/navigation.ts",
    "<rootDir>/jest/setupFiles/notificacoes.ts"
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)",
  ],
}