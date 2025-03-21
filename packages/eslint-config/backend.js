import eslintJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";
import { baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Backend.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const backendConfig = [
  ...baseConfig,
  eslintJs.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
  },
];
