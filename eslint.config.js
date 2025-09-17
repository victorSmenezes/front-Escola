import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'node:url';
import babelParser from '@babel/eslint-parser';
import pluginReactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      js,
      pluginReact,
      prettier: pluginPrettier,
      'react-hooks': pluginReactHooks,
    },
    languageOptions: {
      globals: globals.browser,
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
  },
  ...compat.extends('airbnb', 'plugin:react/recommended', 'prettier'),
  ...compat.config({
    rules: {
      'prettier/prettier': 'error',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-underscore-dangle': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/button-has-type': 'off',
      /* 'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/state-in-constructor': 'off',
      'react/forbid-prop-types': 'off', */
    },
  }),
  pluginReact.configs.flat.recommended,
]);
