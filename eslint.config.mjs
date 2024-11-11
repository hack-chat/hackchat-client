import reduxSaga from "eslint-plugin-redux-saga";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import ESLintPlugin from 'eslint-webpack-plugin';
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import babelParser from "@babel/eslint-parser";

import prettier from "eslint-plugin-prettier";
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      prettier,
      "redux-saga": reduxSaga,
      react,
      "react-hooks": fixupPluginRules(reactHooks),
      "jsx-a11y": jsxA11Y,
    },
    settings: {
      "import/resolver": {
        webpack: {
          config: "./internals/webpack/webpack.prod.babel.js",
        },
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'no-unused-vars': 'off',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
      "prettier/prettier": ["error", {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: "all",
      }],

      "arrow-body-style": [2, "as-needed"],
      "class-methods-use-this": 0,
      "import/imports-first": 0,
      "import/newline-after-import": 0,
      "import/no-dynamic-require": 0,
      "import/no-extraneous-dependencies": 0,
      "import/no-named-as-default": 0,
      "import/no-unresolved": 2,
      "import/no-webpack-loader-syntax": 0,
      "import/prefer-default-export": 0,

      indent: [2, 2, {
        SwitchCase: 1,
      }],

      "jsx-a11y/aria-props": 2,
      "jsx-a11y/heading-has-content": 0,

      "jsx-a11y/label-has-associated-control": [2, {
        controlComponents: ["Input"],
      }],

      "jsx-a11y/label-has-for": 0,
      "jsx-a11y/mouse-events-have-key-events": 2,
      "jsx-a11y/role-has-required-aria-props": 2,
      "jsx-a11y/role-supports-aria-props": 2,
      "max-len": 0,
      "newline-per-chained-call": 0,
      "no-confusing-arrow": 0,
      "no-console": 1,
      "no-unused-vars": 2,
      "no-use-before-define": 0,
      "prefer-template": 2,
      "react/destructuring-assignment": 0,
      "react-hooks/rules-of-hooks": "error",
      "react/jsx-closing-tag-location": 0,
      "react/forbid-prop-types": 0,
      "react/jsx-first-prop-new-line": [2, "multiline"],
      "react/jsx-filename-extension": 0,
      "react/jsx-no-target-blank": 0,
      "react/jsx-uses-vars": 2,
      "react/require-default-props": 0,
      "react/require-extension": 0,
      "react/self-closing-comp": 0,
      "react/sort-comp": 0,
      "redux-saga/no-yield-in-race": 2,
      "redux-saga/yield-effects": 2,
      "require-yield": 0,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
        ...globals.node,
      },

      parser: babelParser,
      ecmaVersion: 6,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    ignores: ["**/*.test.js"],
  },
];
