# Anurag Lnu | Software Engineer Portfolio

Welcome to the source code for my personal portfolio, live at `anurag2796.github.io`. An editorial, evidence-first portfolio: a home page that summarizes production experience and research, a project index, three case studies (FedLearn, TigerResearchBuddy, financial-services delivery), and Experience and About pages.

## Technologies Used

- **Framework:** React 18, TypeScript, Vite
- **Styling:** one hand-written stylesheet with design tokens (`src/styles/index.css`); motion is pure CSS (view transitions, scroll-driven reveals) and respects reduced motion
- **Content:** typed data in `src/content/` and the page components; no runtime API calls
- **Routing:** Hash routing (`react-router`) for GitHub Pages compatibility

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Documentation Brain

The wiki below describes the previous (Star Wars-themed) version of the site and is kept for history. It details the architecture, workflows, troubleshooting steps, and the history of how this project evolved.

**Explore the Wiki:**
- [Project Wiki & Table of Contents](docs/wiki/README.md)
- [Architecture & Design](docs/wiki/01_architecture.md)
- [Code Reference](docs/wiki/02_code_reference.md)
- [Configuration](docs/wiki/04_configuration.md)
- [Current Challenges](docs/wiki/06_current_challenges.md)

## NotebookLM Export
If you are passing this project into an LLM context (like NotebookLM), you can use the script to bundle the source:
```bash
python scripts/export_for_notebooklm.py
```
This generates `notebookllm_source.txt` at the root.

---
*May the Force be with you.*
