import eslint from "@eslint/js"; // eslint.configs.recommended is basically "eslint:recommended"
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { resolve } from "node:path";
import flatCompat from "./compat.js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...flatCompat.plugins("eslint-plugin-only-warn"),
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: resolve(process.cwd(), "tsconfig.json")
      },
      globals: {
        ...globals.node,
        React: true,
        JSX: true
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin.configs // <<<<<
    },
    ignores: [
      // Ignore dotfiles
      ".*.js",
      "**/dist/*",
      ".git",
      "node_modules",
      "build",
      "dist",
      ".next"
    ],
    settings: {
      "import/resolver": {
        typescript: {
          project: resolve(process.cwd(), "tsconfig.json")
        }
      }
    },
    files: ["*.js?(x)", "*.ts?(x)"]
  }
];
