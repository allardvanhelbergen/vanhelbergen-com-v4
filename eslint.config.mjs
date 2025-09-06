import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import tailwind from 'eslint-plugin-tailwindcss';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  react.configs.flat.recommended,
  {
    plugins: { import: importPlugin, unicorn, tailwind },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: [/^[A-Z].+\.tsx$/] }],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],
      'tailwindcss/classnames-order': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.ts', '.tsx'],
        },
        typescript: {},
      },
    },
  },
];
