import globals from "globals";
import baseConfig from "./eslint.base.config";
import next from "@next/eslint-plugin-next";
import flatCompat from "./compat.js";

import { fixupConfigRules } from "@eslint/compat";

const nextConfig = /** @type {import("eslint").Linter.Config[]} */ [
  ...fixupConfigRules(
    /** @type {import("@eslint/compat").FixupConfigArray} */
    (flatCompat.config(next.configs["core-web-vitals"]))
  )
];

/** @type {import("eslint").Linter.Config[]} */
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
