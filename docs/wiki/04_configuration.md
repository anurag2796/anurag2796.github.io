# Configuration & Deployment

## Environment Variables
Currently, the project doesn't strictly depend on any `.env` files for compilation or basic runtime. 

If rate limiting becomes an issue with the GitHub API (since public unauthenticated requests are limited to 60 per hour), the application could be updated to accept a `VITE_GITHUB_TOKEN` environment variable, passed as a Bearer token in `src/services/github.ts`.

## Vite Configuration (`vite.config.ts`)
- Uses `@vitejs/plugin-react`.
- Specifies an `@/` alias mapped to `./src` via `path.resolve`.
- Configured to handle assets including pdf, png, jpg, svg.

## TypeScript Configuration
- `tsconfig.json`: Root orchestration.
- `tsconfig.app.json`: Responsible for strict typing of the React app, defines the `@/*` path mapping for the compiler.
- `tsconfig.node.json`: Configures typical Node environments for the Vite config script itself.

## Deployment Settings
The project is built specifically to be deployed on **GitHub Pages**.
- Because it's a User Page (`anurag2796.github.io`), the site is served off the root `/` path.
- SPA Routing is handled via `createHashRouter` to prevent 404s when a user refreshes on a subpath (e.g., `#/project/tiger_research_buddy`).
- Deployment is assumed to be handled either manually pushing the `dist/` directory or setting up a standard GitHub Action to publish the generated static files.
