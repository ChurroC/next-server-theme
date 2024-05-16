import baseConfig from "./eslint.base.config.js";
import globals from "globals";
import next from "@next/eslint-plugin-next";
import { fixupConfigRules } from "@eslint/compat";
import flatCompat from "./compat.js";

const nextConfig = /** @type {import("eslint").Linter.FlatConfig[]} */ (
  fixupConfigRules(
    /** @type {import("@eslint/compat").FixupConfigArray} */
    (flatCompat.config(next.configs["core-web-vitals"]))
  )
);

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...baseConfig,
  ...nextConfig,
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
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-empty-function": "off"
    }
  }
];
