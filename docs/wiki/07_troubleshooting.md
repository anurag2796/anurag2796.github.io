# Troubleshooting Guide

## Console Errors

### "Failed to load resource: the server responded with a status of 403 (Forbidden)"
**Cause:** You have hit the GitHub API unauthenticated rate limit (60 requests/hour). 
**Fix:** Wait an hour. If you are developing locally, consider adding basic local caching to `github.ts` or mapping a personal access token.

### "Failed to load resource: the server responded with a status of 404 (Not Found)"
**Cause:** The application tried to fetch a repository or README that doesn't exist, is private, or has been renamed.
**Fix:** Check the specific URL in the network tab. Remove the offending repository string from the hardcoded list in `HomePage.tsx`.

### "Cannot find module '@/components/...' or its corresponding type declarations"
**Cause:** TypeScript path mappings are out of sync or Vite isn't picking up the alias.
**Fix:** Ensure `tsconfig.app.json` has `"baseUrl": "."` and `"paths": {"@/*": ["./src/*"]}`. Check that `vite.config.ts` maintains its `resolve.alias` mapping. Restart the dev server.

## Rendering Issues

### Blank Page on GitHub Pages
**Cause:** The site was deployed with standard browser routing instead of hash routing, or the base path is incorrect.
**Fix:** Ensure `routes.ts` is using `createHashRouter`. If deploying to a subdirectory, ensure `base: '/repo-name/'` is set in `vite.config.ts`.
