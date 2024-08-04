import baseConfig from "./eslint.base.config.js";
import globals from "globals";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        React: true,
        JSX: true
      }
    }
  }
];
