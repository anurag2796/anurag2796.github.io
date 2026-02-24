# Code Reference

## Entry Points
- `index.html`: Vite's entry HTML file. Contains the `<div id="root"></div>`.
- `src/main.tsx`: React bootstrapping file. Renders `<RouterProvider router={router} />`.
- `src/routes.ts`: Defines the hash router configuration, mapping `/` to `HomePage` and `/project/:name` to `ProjectPage`.
- `src/pages/Root.tsx`: The layout wrapper. Contains the `IntroSplash`, `CustomCursor`, `StarField` background, and `Navigation`. Yields to `<Outlet />` for page components.

## Key Pages
- `HomePage.tsx`: Fetches a hardcoded list of repositories. Uses `Framer Motion` for staggered entrance animations. Renders a hero section, technical arsenal, and a grid of `TiltCard` components representing projects.
- `ProjectPage.tsx`: Dynamic route catching `/project/:name`. Fetches detailed info about the specific repository, its README content, and language statistics. Renders the README using a custom `MarkdownRenderer`.

## Core Components
- `TiltCard.tsx`: A highly interactive, 3D tilt-effect card used for displaying project summaries on the home page.
- `MarkdownRenderer.tsx`: Parses and renders standard GitHub Markdown into React components, applying appropriate styling and syntax highlighting.
- `IntroSplash.tsx`: The cinematic Star Wars style intro animation that plays on initial load.
- `Navigation.tsx`: Fixed navigation bar with smooth scrolling capabilities.

## Utility Functions
- `src/lib/utils.ts -> cn()`: Uses `clsx` and `tailwind-merge` to combine utility classes intuitively, heavily used across the shadcn components.
