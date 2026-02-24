# Project Journey & Evolution

The `anurag2796.github.io` portfolio has evolved systematically to embrace modern web standards.

## Phase 1: Prototype & Legacy
Initially, the portfolio existed as a collection of static files (`index.html`, `style.css`, raw JavaScript files in a `js/` directory). While functional, it lacked the robustness, component architecture, and developer experience provided by modern frameworks.

## Phase 2: The v2 Incubation
A significant redesign was drafted in a subdirectory named `v2/`. This transition introduced:
- **React** as the view library.
- **Vite** for incredibly fast HMR and bundling.
- **TailwindCSS** for utility-first styling.
- **shadcn/ui** and **Framer Motion** for premium interactive aesthetics.
This v2 lived alongside the legacy app for a period of time as features were polished.

## Phase 3: The Architecture Migration (Feb 2026)
This phase marked the completion of the migration. 
1. **Cleanup:** Legacy HTML/JS/CSS assets lying at the root were archived or deleted.
2. **Promotion:** The `v2/` application code was promoted to the root directory.
3. **Restructuring:** The nested `src/app/` structure was thoroughly flattened into standard React/Vite architecture (`src/components/`, `src/pages/`, `src/services/`, etc.).
4. **Integration Fixes:** Hash routing was implemented for SPA survival on GitHub Pages, and paths/aliases (`@/`) were globally refactored. The static resume PDF was relocated effectively to the `public/` folder.

This evolution brings the codebase to an industry-standard format, allowing for high maintainability, easy additions of new projects, and strict TypeScript oversight.
