# API Reference

The portfolio uses the public GitHub REST API to fetch data dynamically. All API logic is encapsulated in `src/services/github.ts`.

## External API Dependencies

Base URL: `https://api.github.com/`

### 1. Fetching Repositories (`fetchRepos`)
- **Endpoint:** `GET /repos/{owner}/{repo}`
- **Purpose:** Fetches metadata (stars, forks, description, topics, URLs) for a predefined list of repositories.
- **Caching:** Requests are dynamically cached by the browser via standard HTTP cache control, though the app fetches them concurrently using `Promise.all`.

### 2. Fetching Repository Details (`fetchRepoDetail`)
- **Endpoint:** `GET /repos/{owner}/{repo}`
- **Purpose:** Used on the `ProjectPage` to get comprehensive details for a single repository.

### 3. Fetching README (`fetchRepoReadme`)
- **Endpoint:** `GET /repos/{owner}/{repo}/readme`
- **Headers:** `Accept: application/vnd.github.v3.raw`
- **Purpose:** Retrieves the raw markdown content of the `README.md` to be parsed by `MarkdownRenderer`.

### 4. Fetching Languages (`fetchRepoLanguages`)
- **Endpoint:** `GET /repos/{owner}/{repo}/languages`
- **Purpose:** Retrieves the byte count for each programming language used in the repository, calculating percentages for display.

## Error Handling
The service module contains basic `try/catch` and `.ok` checks on the `fetch` responses. If a repository is not found (404), it currently fails silently or returns null data, which the UI components handle gracefully by rendering fallback states.
