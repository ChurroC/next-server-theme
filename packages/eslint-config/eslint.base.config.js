import eslint from "@eslint/js"; // eslint.configs.recommended is basically "eslint:recommended"
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends(
    "eslint-config-my-config",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:eslint-plugin-only-warn"
  ),
  {
    rules: {},
    languageOptions: {
      globals: {
        ...globals.node,
        React: true,
        JSX: true
      }
    }
  }
);
