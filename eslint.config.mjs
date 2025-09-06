import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import tailwind from 'eslint-plugin-tailwindcss';

// Base ignores to keep noise down.
const ignores = [
  '**/node_modules/**',
  '.next/**',
  'dist/**',
  'coverage/**',
  'next-env.d.ts',
  'playwright.config.ts',
  'tailwind.config.ts',
  'vitest.config.ts',
  'tsconfig.tsbuildinfo',
  // Generic generated declaration files (keep explicit next-env above); adjust if you add hand-authored .d.ts
  '**/*.d.ts',
];

// Shared import/order groups definition.
const importOrderRule = [
  'error',
  {
    groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index'], ['type']],
    pathGroups: [
      { pattern: '@/components/**', group: 'internal', position: 'before' },
      { pattern: '@/lib/**', group: 'internal', position: 'before' },
    ],
    pathGroupsExcludedImportTypes: ['builtin'],
    'newlines-between': 'always',
    alphabetize: { order: 'asc', caseInsensitive: true },
  },
];

export default [
  { ignores },
  // JavaScript recommended
  js.configs.recommended,
  // TypeScript recommended (base + stylistic) — type-aware set applied manually in TS block below
  ...ts.configs.recommended,
  ...ts.configs.stylistic,
  // React
  react.configs.flat.recommended,
  // Project customizations
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        projectService: true, // enables type-aware rules only for TS sources
      },
    },
    plugins: {
      import: importPlugin,
      unicorn,
      tailwindcss: tailwind,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
          alwaysTryTypes: true,
        },
        node: { extensions: ['.js', '.mjs', '.ts', '.tsx'] },
      },
    },
    rules: {
      // Core / stylistic adjustments
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'object-shorthand': 'error',

      // TypeScript specifics
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-unused-prop-types': 'warn',
      'react/self-closing-comp': 'error',
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['coerce', 'ternary'] }],

      // Imports
      'import/order': importOrderRule,
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'tests/**',
            '**/*.test.*',
            '**/*.spec.*',
            'vitest.config.*',
            'playwright.config.*',
          ],
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],

      // Unicorn (selective)
      'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: [/^[A-Z].+\.tsx$/] }],
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-useless-undefined': 'error',
      'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }],

      // Tailwind
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off', // allow semantic layering via utilities

      // Disabled / handled by TS
      'no-unused-vars': 'off',
    },
  },
  // Test file overrides
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'off', // tests often intentionally ignore async output
    },
  },
  // JS / config files: turn off type-aware + react rules (no JSX here)
  {
    files: [
      '**/*.config.{js,mjs,cjs}',
      'eslint.config.mjs',
      'next.config.mjs',
      'postcss.config.mjs',
      'tailwind.config.{js,ts,mjs}',
      'playwright.config.ts',
      'vitest.config.ts',
    ],
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-unused-prop-types': 'off',
      'react/self-closing-comp': 'off',
      'react/jsx-no-leaked-render': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
  // Config / script overrides (allow dev dependencies + console)
  {
    files: ['*.config.{js,mjs,cjs,ts}', 'scripts/**/*.{js,ts}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  // Global React version setting (must come after react plugin config to override warning)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: { react: { version: 'detect' } },
  },
];
