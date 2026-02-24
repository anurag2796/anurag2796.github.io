# Anurag's Star Wars Portfolio Wiki

Welcome to the comprehensive documentation brain for the Anurag Lnu Star Wars Portfolio project (`anurag2796.github.io`). This wiki provides detailed insights into the architecture, codebase, data flow, and history of the project.

## Table of Contents

1. [Architecture & System Design](01_architecture.md)
2. [Code Reference](02_code_reference.md)
3. [API Reference](03_api_reference.md)
4. [Configuration & Deployment](04_configuration.md)
5. [Data Workflow](05_data_workflow.md)
6. [Current Challenges & TODOs](06_current_challenges.md)
7. [Troubleshooting Guide](07_troubleshooting.md)
8. [Project Journey & Evolution](08_project_journey.md)

## Quick Start

The project is built with React 18, Vite, and TailwindCSS 4, using a flat component architecture. 

To run the project locally:
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

The app handles routing via `react-router` (using Hash Router for GitHub Pages compatibility) and fetches dynamic repository data directly from the GitHub API.
