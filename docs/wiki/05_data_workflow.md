# Data Workflow

Understanding how data traverses the application is key. The app is stateless on the server side; all dynamic data workflows happen on the client.

## Home Page Workflow
1. User navigates to `/`.
2. `Root.tsx` loads, mounting shared persistent components (Background, CustomCursor).
3. `HomePage.tsx` mounts.
4. `useEffect` triggers `fetchRepos()`, requesting data for a hardcoded list of ~7 repositories from GitHub.
5. While pending, loading skeletons/states are not currently heavily emphasized (relying on fast API times or intro splash cover).
6. Data resolves, and `HomePage` maps the repository data to `TiltCard` components. 

## Project Detail Workflow
1. User clicks a project card. React Router pushes the hash history to `#/project/{repo_name}`.
2. `ProjectPage.tsx` mounts.
3. `useEffect` triggers three parallel fetches using the `{repo_name}` param:
   - `fetchRepoDetail(repo_name)`
   - `fetchRepoReadme(repo_name)`
   - `fetchRepoLanguages(repo_name)`
4. The component keeps a local state for these three promises.
5. Once resolved, it renders the header (languages/stars) and passes the markdown string to `MarkdownRenderer`.
