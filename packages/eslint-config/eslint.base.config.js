import eslint from "@eslint/js"; // eslint.configs.recommended is basically "eslint:recommended"
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import { resolve } from "node:path";
import flatCompat from "./compat.js";
import tseslint from "typescript-eslint";

const tsConfig = /** @type {import("eslint").Linter.FlatConfig[]} */ (
  tseslint.configs.strict
);

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  eslint.configs.recommended,
  ...tsConfig,
  eslintConfigPrettier,
  ...flatCompat.plugins("eslint-plugin-only-warn"),
  {
    languageOptions: {
      parserOptions: {
        project: resolve(process.cwd(), "tsconfig.json")
      },
      globals: {
        ...globals.node,
        React: true,
        JSX: true
      }
    },
    files: ["**/*.js?(x)", "**/*.ts?(x)"]
  },
  {
    ignores: [
      // Ignore dotfiles
      ".*.js",
      "*.config.js",
      "dist",
      ".git",
      "node_modules",
      "build",
      ".next"
    ]
  }
];
