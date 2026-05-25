# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (HMR).
- `npm run build` — Type-checks (`tsc -b`) then builds to `dist/`. **`tsc -b` runs first; a type error fails the build.** Use `npm run type-check` for type-checks only.
- `npm run preview` — Serve the production build locally.
- `python scripts/export_for_notebooklm.py` — Concatenate the source tree into `notebookllm_source.txt` at repo root (for LLM ingestion).

No test runner, linter, or formatter is configured. Don't add ESLint/Prettier configs unless asked.

## Architecture

Single-page React 18 + TypeScript + Vite app deployed to GitHub Pages at `anurag2796.github.io`. The site is a Star Wars–themed portfolio that pulls project data live from the GitHub REST API.

**Entry / routing flow**
- `src/main.tsx` → `App.tsx` → `RouterProvider` with `routes.ts`.
- `routes.ts` uses **`createHashRouter`** — this is deliberate, not legacy. Hash routing is the only thing that makes deep links (`#/project/:name`) survive a refresh on GitHub Pages without a `404.html` redirect hack. Do not switch to `createBrowserRouter`.
- `pages/Root.tsx` is the layout shell: mounts `IntroSplash` (first load only), `CustomCursor`, `StarField`, `ScrollToTop`, `Navigation`, then `<Outlet />` wrapped in a Framer Motion `AnimatePresence` keyed on `location.pathname`.
- Two routes: `HomePage` (index) and `ProjectPage` (`/project/:name`).

**Data layer**
- All project data is fetched at runtime from `api.github.com` via `src/services/github.ts`. There is no backend, no build-time data fetch, no caching layer.
- Username is hardcoded (`USERNAME = "anurag2796"`). Fork repos are filtered out client-side.
- README fetch base64-decodes via `atob` and a UTF-8 round-trip — preserve that decoder when editing; naive `atob` will mangle non-ASCII.
- Unauthenticated GitHub API is capped at **60 req/hr per IP**. Failures degrade silently (return `[]` / `null`). If touching this layer, consider a `VITE_GITHUB_TOKEN` Bearer token path before adding retries/loops.

**Styling**
- TailwindCSS 4 via `@tailwindcss/vite` plugin (no `tailwind.config.js` — v4 is config-less by default).
- Global styles split across `src/styles/{index,theme,tailwind,fonts}.css`. `main.tsx` only imports `index.css`, which fans out to the rest.
- shadcn/radix primitives are vendored into `src/components/ui/` — edit them directly rather than wrapping.
- `src/lib/utils.ts` exports `cn()` for class merging (tailwind-merge + clsx). Use it for conditional class composition.

**Path alias**
- `@/*` → `./src/*`, defined in both `vite.config.ts` (runtime resolution) and `tsconfig.app.json` (type resolution). Both must stay in sync.

**Build / deploy**
- `.github/workflows/deploy.yml` builds on push to `dev`, `main`, or `master` and deploys `dist/` to GitHub Pages via `actions/deploy-pages@v4`. **Current working branch is `dev`** — pushing to `dev` ships to production.
- `vite.config.ts` does not set `base` — correct, because this is a User Page served from `/`. Do not add a `base` path.
- `assetsInclude` allows raw imports of `.svg` and `.csv`. The comment there explicitly forbids adding `.css`, `.ts`, or `.tsx`.

## Project-specific gotchas

- The `react()` and `tailwindcss()` Vite plugins are both required even if Tailwind looks unused — there's a comment in `vite.config.ts` saying so. Leave both in.
- `HomePage.tsx` and `ProjectPage.tsx` are intentionally monolithic right now (noted as tech debt in `docs/wiki/06_current_challenges.md`). Don't refactor into sub-components as a drive-by — only when asked.
- The repo carries both MUI (`@mui/material`) and shadcn/radix. shadcn is the default; MUI is present but not the primary UI system. Prefer shadcn/radix + Tailwind for new UI.
- `public/resume.pdf` is referenced from the UI — keep it at that path.
- The `v2/` and `docs/wiki/` directories contain historical/architectural notes; treat as documentation, not active code.
