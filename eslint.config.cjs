/* Flat ESLint config for ESLint v9 */
const js = require("@eslint/js");
let prettierConfig;
try {
  // Works with eslint-config-prettier v9 in flat config
  prettierConfig = require("eslint-config-prettier");
} catch {
  prettierConfig = {};
}

module.exports = [
  // Ignored files (replaces .eslintignore in flat config)
  {
    ignores: ["node_modules", "dist", "build", "*.min.js"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
    },
    rules: {
      "no-unused-vars": ["warn", { args: "none", caughtErrors: "none", ignoreRestSiblings: true }],
      // Turn off to avoid false positives without explicit globals
      "no-undef": "off",
    },
  },
  {
    files: ["server/**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
    rules: {
      "no-console": "off",
    },
  },
  // Put Prettier last so it can disable any conflicting stylistic rules
  prettierConfig,
];
