# vanhelbergen-com-v4

Personal / portfolio site (v4) – Next.js 15 + React 19 + TypeScript + Tailwind. Fast, accessible, content‑driven foundation.

## Tech Stack
- Next.js 15 (App Router) / React 19
- TypeScript (strict) / ESLint (flat) / Prettier
- Tailwind CSS / PostCSS / Autoprefixer
- Vitest + Testing Library (unit / component)
- Playwright (e2e) / axe-core (a11y checks)

## Getting Started
```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000.

## Scripts
```json
{
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
	"e2e:ui": "playwright test --ui",
	"verify": "pnpm typecheck && pnpm lint && pnpm test"
}
```

## Directory Structure
```
app/                # App Router entrypoints
	layout.tsx
	page.tsx
components/         # (future) UI primitives & layout
content/            # (future) MDX/markdown
lib/                # Framework-agnostic utilities
public/             # Static assets
styles/             # Global / Tailwind artifacts
tests/              # Unit & e2e tests
```

## Testing
Run unit tests:
```bash
pnpm test
```
Watch mode:
```bash
pnpm test:watch
```
E2E tests (after `pnpm build && pnpm start &` in another shell):
```bash
pnpm e2e
```

## Linting & Formatting
```bash
pnpm lint
pnpm format
```

## Tailwind
Classes are ordered via plugin; keep design tokens minimal and deliberate.

## Accessibility
Every interactive element must have discernible text / label. Use semantic HTML first.

## Deployment
Build:
```bash
pnpm build
```
Then serve with `pnpm start`.

---
Generated scaffold; see `copilot-instructions.md` for full contribution contract.
