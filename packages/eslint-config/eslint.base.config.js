import eslint from "@eslint/js"; // eslint.configs.recommended is basically "eslint:recommended"
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

import { resolve } from "node:path";

import compat from "./compat.js";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  ...compat.plugins("eslint-plugin-only-warn"),
  {
    rules: {},
    languageOptions: {
      globals: {
        ...globals.node,
        React: true,
        JSX: true
      }
    },
    ignores: [
      // Ignore dotfiles
      ".*.js",
      "node_modules/",
      "dist/"
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
);
