import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  files: ['src/**/*.ts', '__tests__/**/*.ts'],

  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
  ],

  plugins: {
    '@stylistic': stylistic,
  },

  rules: {
    '@stylistic/semi': ['error', 'always'],
  },
});