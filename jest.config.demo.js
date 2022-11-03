// jest.config.js
const nextJest = require("next/jest");
const { compilerOptions } = require("./jsconfig.json");

const nameMappers = () => {
  const { paths } = compilerOptions;

  const parsed = Object.keys(paths).reduce((acc, item) => {
    const key = item;
    const value = paths[key][0];

    const _key = `^${key.replace("/*", "/(.*)$")}`;
    const _value = `<rootDir>/${value.replace("/*", "/$1")}`;

    return { ...acc, [_key]: _value };
  }, {});

  return parsed;
};

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic|firebase|@firebase|(?!firebase)|@firebase/app|(?!firebase/app))",
    "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic|firebase|@firebase|(?!firebase)|@firebase/app|(?!firebase/app))",
  ],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: { ...nameMappers() },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
