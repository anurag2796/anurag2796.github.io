# Architecture & System Design

## High-Level Overview

The portfolio is a Single Page Application (SPA) built with:
- **Core:** React 18, TypeScript, Vite
- **Styling:** TailwindCSS 4, structured css (`index.css`, `theme.css`, `fonts.css`)
- **UI Components:** shadcn/radix primitives + Framer Motion for animations
- **Routing:** `react-router` (`createHashRouter`)
- **Icons:** `lucide-react`

## Directory Structure
Following the v2 migration, the app employs an industry-standard flat `src/` layout:

- `public/`: Static assets (`resume.pdf`, fonts, uncompiled media).
- `src/components/`: Primary UI components (e.g., `TiltCard`, `Navigation`, `IntroSplash`).
  - `src/components/ui/`: shadcn/radix primitive components.
  - `src/components/figma/`: Components exported/adapted from Figma.
- `src/lib/`: Core utilities (e.g., `utils.ts` for `cn()` class merging).
- `src/pages/`: Route-level components (`HomePage.tsx`, `ProjectPage.tsx`, `Root.tsx`).
- `src/services/`: External integrations (`github.ts` for API calls).
- `src/styles/`: Global stylesheets.

## Key Architectural Decisions

1. **Hash Routing (`createHashRouter`)**: Selected over `createBrowserRouter` to ensure deep linking works seamlessly on GitHub Pages without needing a custom `404.html` redirect hack.
2. **Component Colocation**: shadcn UI components are fully copied into the source tree (`src/components/ui`), ensuring complete control over presentation.
3. **Stateless UI with Runtime Fetching**: The app doesn't rely on a backend CMS. Project metadata and README files are fetched dynamically from the GitHub API at runtime.
