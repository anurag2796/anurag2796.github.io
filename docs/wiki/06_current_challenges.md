# Current Challenges & Pending TODOs

## Known Bugs & Limitations
- **GitHub API Rate Limiting:** Unauthenticated requests are limited to 60 per hour per IP. Frequent refreshes or heavy usage on the site could lead to 403 Rate Limit Exceeded errors, causing the project cards to render blank.
- **Framer Motion Types:** An ongoing type conflict exists occasionally between Framer Motion variants and generic React HTMLElements, mitigated currently by `as const` assertions (e.g., on the `fadeUp` variant).
- **Missing Assets:** The `favicon.ico` might 404 if not present in the `public/` directory. 
- **404ing Repositories:** Hardcoded repositories in `HomePage` that no longer exist or are strictly private (e.g., historical tracking repos) will return 404s from the API, throwing silent console errors.

## Technical Debt
- **Component Granularity:** `HomePage.tsx` and `ProjectPage.tsx` are large monoliths. The Hero section, Technical Arsenal, and Contact sections could ideally be refactored into distinct components in `src/components/`.
- **Loading States:** No explicit Skeleton loaders exist while the GitHub API is resolving. 

## Pending TODOs
- [ ] Add a `favicon.ico`.
- [ ] Implement a Github Action to automatically build and deploy `dist/` to a `gh-pages` branch or configure GitHub Pages to deploy via Actions directly.
- [ ] Integrate an optional PAT (Personal Access Token) for higher API limits during dev.
