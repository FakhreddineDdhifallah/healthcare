import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/node_modules/@testing-library/jest-dom/extend-expect",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/components$1",
    "^@/lib(.*)$": "<rootDir>/lib$1",
    "^@/pages(.*)$": "<rootDir>/pages$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};

export default config;
