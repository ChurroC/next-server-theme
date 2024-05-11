// @ts-check
import { defineConfig, defineFlatConfig } from "eslint-define-config";
import 

/// <reference types="@eslint-types/typescript-eslint" />
export default defineFlatConfig([
  eslint:recommended,
  {
    plugins: ["only-warn"]
  }
]);
/*
{
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
    "@typescript-eslint",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true
  },
  env: {
    node: true
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/"
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"]
    }
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  }
}
*/
