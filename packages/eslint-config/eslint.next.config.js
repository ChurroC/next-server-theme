import baseConfig from "./eslint.base.config.js";
import tseslint from "typescript-eslint";
import globals from "globals";
import compat from "./compat.js";
import "eslint-config-next";

export default tseslint.config(
  ...baseConfig,
  ...compat.extends(require.resolve("@vercel/style-guide/eslint/next")),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        React: true,
        JSX: true
      }
    },
    rules: {
      // These opinionated rules are enabled in stylistic-type-checked above.
      // Feel free to reconfigure them to your own preference.
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-empty-function": "off",
      "react/no-unescaped-entities": "off"
    }
  }
);
