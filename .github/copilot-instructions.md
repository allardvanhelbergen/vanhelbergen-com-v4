# Copilot Instructions: vanhelbergen-com-v4

These instructions guide AI code generation (e.g. GitHub Copilot, inline suggestions, chat) for this project. Suggestions that do not follow these rules should be rejected or regenerated.

---

## 1. Project Purpose (High-Level)

A Personal / portfolio website (v4) with fast, accessible, content‑driven pages, possibly small interactive components, and strong Core Web Vitals. The website is SSG/ISR with a future-proof architecture for easy content updates (blog, projects, about). The design is minimal and modern, emphasizing typography and whitespace.

---

## 2. Tech Stack (Authoritative)

When generating or scaffolding code, assume the following stack unless explicitly changed:

- Runtime / Framework: **Next.js 15 (App Router) + React 19** (or latest stable at implementation time)
- Language: **TypeScript (strict, ES2022 modules)**
- Styling: **Tailwind CSS** + CSS Modules (only when utility classes are insufficient)
- Design System: Light abstraction of Tailwind via `@/components/ui/*` primitives. Do NOT introduce heavy UI libraries without approval.
- State Management: React hooks + server components. Avoid global state libs unless justified.
- Data Layer: Local markdown/MDX for content; incremental static regeneration for pages. Placeholder for future CMS (abstract via a `content/` service layer).
- Images: Next.js `<Image />` with `remotePatterns` if needed.
- Icons: `lucide-react` (tree‑shaken) or inline SVG components.
- Forms: Native elements + progressive enhancement; `react-hook-form` only if complex validation emerges.
- Dates: `date-fns` (avoid moment/luxon unless necessary).
- HTTP / Fetch: Built‑in `fetch` (edge/runtime aware). No Axios.
- Testing: **Vitest** (unit) + **React Testing Library** + **Playwright** (e2e). Accessibility checks via `@testing-library/jest-dom` & `axe-core` (scripted).
- Linting: **ESLint** (flat config) + `@typescript-eslint` + `eslint-plugin-react` + `eslint-plugin-import` + `eslint-plugin-unicorn` (selective rules) + `eslint-plugin-tailwindcss`.
- Formatting: **Prettier** (no ESLint formatting overlaps) + `prettier-plugin-tailwindcss`.
- Type Quality: `tsc --noEmit` in CI + `ts-reset` optional if ergonomic benefits outweigh cost.
- Packaging / Build: Node 20 LTS; use `npm` (no workspace tooling needed).
- Analytics: Placeholder interface only; do not embed vendor scripts without explicit request.

If a suggestion introduces a dependency not listed, add a short justification comment and mark it as `REVIEW_NEEDED`.

---

## 3. Directory & Module Conventions

```
/ (root)
  app/                # Next.js app router
    layout.tsx
    page.tsx
  components/
    ui/               # Low-level primitives
    layout/           # Shell + nav/footer
    content/          # MDX render helpers
  lib/                # Pure, framework-agnostic helpers
  content/            # Markdown/MDX sources (blog, pages)
  styles/             # Tailwind entry + globals
  tests/
    unit/
    e2e/
  scripts/            # Node maintenance scripts
  public/             # Static assets
  .vscode/            # Editor settings
```

Rules:

- Prefer **server components**; use client components only when needed (`'use client'`).
- No default exports except Next.js route files or React Server Components where ergonomics require it; otherwise use named exports.
- Keep cross‑cutting utilities pure; avoid importing React in `lib/` unless essential.

---

## 4. TypeScript Rules

- Always enable: `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.
- Use discriminated unions over `any`; never introduce `any` silently—use `unknown` + refinement.
- Provide narrow return types for helpers (avoid leaking `Promise<any>`).
- When inferring props from data shapes, prefer `satisfies` for safety.

Sample `tsconfig.json` (core excerpt):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true,
    "jsx": "preserve",
    "allowJs": false,
    "resolveJsonModule": true,
    "types": ["node", "vitest"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 5. ESLint (Flat Config Outline)

Copilot should generate or extend a `eslint.config.mjs` similar to:

```js
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
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],
      'tailwindcss/classnames-order': 'warn',
    },
  },
];
```

Rules:

- Do not duplicate Prettier formatting rules in ESLint.
- Auto-fix on save is allowed except for complexity metrics.

---

## 6. Prettier

Baseline `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Never reflow markdown code fences with diff syntax. Keep import sorting to ESLint (not Prettier plugins beyond Tailwind ordering).

---

## 7. Tailwind Conventions

- Keep `tailwind.config.ts` minimal; extend via `theme.extend`. Avoid large ad-hoc color palettes.
- Extract repeated multi-class patterns into components or semantic class groups via `@apply` only in rare cases.
- Order classes logically: layout → box model → typography → visual → state → responsive (plugin enforces order).

---

## 8. Testing Strategy

Hierarchy:

1. Unit (Vitest) – fast, pure logic (`lib/`, component props branching)
2. Component (Vitest + Testing Library) – rendering & accessibility
3. Integration (Vitest / Next test harness) – data loader + rendering synergy
4. E2E (Playwright) – critical journeys: home load, blog navigation, dark mode toggle, 404 fallback
5. Accessibility – `axe` in CI for key pages

Vitest sample config excerpt:

```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/test-env.ts'],
    coverage: { provider: 'v8', reports: ['text', 'lcov'], thresholds: { lines: 85 } },
  },
});
```

Playwright minimal excerpt:

```ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: { headless: true },
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
});
```

Test Conventions:

- Name unit test files: `*.test.ts` adjacent to source OR in `tests/unit` mirroring path.
- E2E specs live in `tests/e2e/*.spec.ts`.
- Avoid snapshot tests for UI except for stable, text-heavy MDX rendering.
- Each React component test must assert at least one accessibility role or semantic landmark.

---

## 9. Accessibility & Performance

- Enforce `<Image />` with `alt`; require `aria-label` for icon-only buttons.
- Use semantic headings in order (no skipping levels).
- Lazy load non-critical scripts; defer third-party.
- Use `next/script` with strategy where needed.
- Prefer CSS transitions over JS for micro-interactions.

---

## 10. Git / PR Workflow

- Branch naming: `feature/`, `fix/`, `chore/`, `refactor/`, `test/` prefixes.
- Commit message format: Conventional Commits (`feat:`, `fix:`, etc.).
- CI Pipeline (target): install → type check → lint → unit tests → build → e2e (preview) → upload artifacts.
- Block merge if: type errors, lint errors (except warnings), coverage < threshold, or accessibility critical violations (axe severity serious+).

---

## 11. Script / Package JSON Guidance

Copilot should propose scripts like:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui"
  }
}
```

Add `prepare` only if using Husky: `"prepare": "husky install"`.

---

## 12. VS Code Settings Suggestions

`.vscode/settings.json` (Copilot may scaffold, do not assume it already exists):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.eol": "\n",
  "eslint.useFlatConfig": true,
  "tailwindCSS.experimental.classRegex": []
}
```

---

## 13. Copilot Prompting Principles

When requesting generation:

- Specify desired output level: (component | utility | page | test).
- Include performance or accessibility constraints explicitly.
- Example Prompt: "Generate a client React component `ThemeToggle` using Tailwind; must be keyboard accessible, store preference in `localStorage`, and include unit + a11y test."

Reject suggestions that:

- Add unapproved dependencies.
- Introduce `any` without explanation.
- Contain inline styles when a Tailwind class exists.
- Omit tests for non-trivial logic.

---

## 14. Commenting & Documentation

- Prefer self-documenting code over verbose comments.
- Exported helpers require JSDoc if intent is not obvious.
- Add `// PERF:` or `// TODO:` or `// REVIEW_NEEDED:` tags for future passes.

---

## 15. Security & Reliability (Baseline)

- Never interpolate unsanitized user input into HTML (future forms).
- Use `Content-Security-Policy` via Next middleware when introduced.
- Avoid leaking environment variables to the client.

---

## 17. Minimal Initial Dependency List

When initializing, Copilot should propose (npm example):

```
npm install next react react-dom lucide-react
npm install -D typescript @types/react @types/node eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-import eslint-plugin-unicorn eslint-plugin-tailwindcss prettier prettier-plugin-tailwindcss vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom @playwright/test axe-core date-fns tailwindcss postcss autoprefixer
```

Adjust versions to latest compatible.

---

## 18. Quality Bar Checklist (Copilot Should Self-Check)

Before suggesting code, ensure:

- [ ] Strict TypeScript satisfied
- [ ] No ESLint errors (warnings allowed consciously)
- [ ] Prettier formatting stable
- [ ] Tests for added logic
- [ ] Accessible roles/labels present
- [ ] No unnecessary dependencies

---

## 19. How To Adapt

If the stack changes (e.g., move to content layer or add analytics), update relevant numbered sections (2, 8, 11) and increment a `CONFIG_VERSION` constant (to be added once code scaffolded) so stale generated code can be flagged.

---

## 20. Revision Notes

Version: 0.1 (initial authoring). Update this header when making material changes.

---

End of Copilot generation contract.
