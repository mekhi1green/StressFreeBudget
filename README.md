# StressFreeBudget

A budgeting app for two: shared and personal spending, per-transaction splits, settle-up, goals, CSV import,
light/dark themes. Desktop and iPhone.

**Stack:** React + TypeScript (Vite), Tailwind CSS, Supabase (Postgres, auth, realtime).

## Scripts

| Command         | What it does                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run dev`   | Dev server                                                                                                  |
| `npm run check` | Lint, typecheck, unit tests, formatting                                                                     |
| `npm run e2e`   | Playwright on desktop Chromium and iPhone-size WebKit (first run: `npx playwright install chromium webkit`) |
| `npm run build` | Production build into `dist/`                                                                               |

## Conventions

- Money is integer cents; format only for display (`src/lib/money.ts`).
- Colors come from CSS variables in `src/index.css`; use the Tailwind names (`bg-bg`, `text-ink`, `border-line`, ...).
- Never commit secrets. `.env*` is git-ignored; see `.env.example`.

## Status

Phase 0 (foundations) in progress. The full plan lives outside this repo for now.
