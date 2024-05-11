// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**", ".eslintrc.cjs"],
  extends: ["@repo/eslint-config/library.js"],
  parser: "@typescript-eslint/parser"
};
