# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (HMR).
- `npm run build` — Type-checks (`tsc -b`) then builds to `dist/`. **`tsc -b` runs first; a type error fails the build.** Use `npm run type-check` for type-checks only.
- `npm run preview` — Serve the production build locally.
- `python scripts/export_for_notebooklm.py` — Concatenate the source tree into `notebookllm_source.txt` at repo root (for LLM ingestion).

No test runner, linter, or formatter is configured. Don't add ESLint/Prettier configs unless asked.

## Architecture

Single-page React 18 + TypeScript + Vite app deployed to GitHub Pages at `anurag2796.github.io`. An editorial "engineering dossier" portfolio: warm off-white canvas, Instrument Sans + IBM Plex Mono, one blue accent.

**Entry / routing flow**
- `src/main.tsx` → `App.tsx` → `RouterProvider` with `routes.ts`.
- `routes.ts` uses **`createHashRouter`** — this is deliberate, not legacy. Hash routing is the only thing that makes deep links survive a refresh on GitHub Pages without a `404.html` redirect hack. Do not switch to `createBrowserRouter`.
- Routes: `/`, `/work` (filter via `?area=`), `/work/fedlearn`, `/work/tigerresearchbuddy`, `/work/financial-services`, `/experience`, `/about`, `*` (404).
- `components/Layout.tsx` is the shell: skip link, `SiteHeader` (desktop nav + accessible mobile menu), `<main>`, `SiteFooter`. It resets scroll and moves focus to `<main>` on pathname changes (not on query-string changes).
- Because the URL hash belongs to the router, **never use `href="#id"` for in-page links**. Use `JumpLink` (`components/links.tsx`) or `jumpTo()` (`lib/nav.ts`). Internal navigation uses `Go` (a `Link` with `viewTransition`).

**Content**
- No runtime data fetching. Project list lives in `src/content/projects.ts`; page copy lives in the page components. Contact links and image metadata are in `src/site.ts`.
- Images are WebP in `public/images/`, referenced through `IMAGES` in `site.ts` (always with width/height and alt text).
- Copy rules: no invented claims, no em dashes, no vanity metrics. Keep status labels (glyph + text) honest.

**Styling and motion**
- All styles are in `src/styles/index.css`: tokens on `:root`, then base, components, pages, responsive (899px and 599px breakpoints), motion.
- Motion is CSS only: `.enter` (hero stagger), `.enter-late`, `.reveal` (scroll-driven via `animation-timeline: view()`, behind `@supports`), `.draw` (diagram lines), view transitions on navigation. Everything is disabled under `prefers-reduced-motion: reduce`.
- Tailwind's Vite plugin is still registered but no Tailwind CSS is imported. `components/ui/` (vendored shadcn) is unused by the current pages.

**Build / deploy**
- `.github/workflows/deploy.yml` builds on push to `dev`, `main`, or `master` and deploys `dist/` to GitHub Pages via `actions/deploy-pages@v4`. **Current working branch is `dev`** — pushing to `dev` ships to production.
- `vite.config.ts` does not set `base` — correct, because this is a User Page served from `/`. Do not add a `base` path.
- `assetsInclude` allows raw imports of `.svg` and `.csv`. The comment there explicitly forbids adding `.css`, `.ts`, or `.tsx`.

## Project-specific gotchas

- The `react()` and `tailwindcss()` Vite plugins are both required even if Tailwind looks unused — there's a comment in `vite.config.ts` saying so. Leave both in.
- `public/resume.pdf` is referenced from the UI — keep it at that path.
- The `docs/wiki/` directory describes the previous Star Wars-themed site; treat as history, not current architecture.
