module.exports = {
  extends: [
    "mantine",
    "plugin:@next/next/recommended",
    "plugin:jest/recommended",
  ],
  plugins: ["testing-library", "jest"],
  overrides: [
    {
      files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/extensions": "off",
    "jsx-a11y/aria-role": [ 2, {
        "allowedInvalidRoles": ["loader"],
        "ignoreNonDOM": true
    }],
    "react/jsx-boolean-value": [0, { "assumeUndefinedIsFalse": true }]
  },
};
