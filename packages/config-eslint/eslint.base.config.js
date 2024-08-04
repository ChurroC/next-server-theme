// Maybe add @vercel/style-guide
import eslint from "@eslint/js"; // eslint.configs.recommended is basically "eslint:recommended"
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";
import { resolve } from "node:path";
import flatCompat from "./compat.js";

const tsConfig = /** @type {import("eslint").Linter.Config[]} */ (
  tseslint.configs.strict
);

/** @type {import("eslint").Linter.Config[]} */
export default [
  eslint.configs.recommended,
  ...tsConfig,
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
    }
  },
  {
    ignores: [
      // Ignore dotfiles
      ".*.?(c)js",
      "*.config*.?(c)js",
      ".*.ts",
      "*.config*.ts",
      "*.d.ts",
      "dist",
      ".git",
      "node_modules",
      "build",
      ".next",
      "*rollup*"
    ]
  },
  eslintConfigPrettier
];
