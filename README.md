# Anurag Lnu | Software Engineer Portfolio

Welcome to the source code for my personal portfolio, live at `anurag2796.github.io`. This project showcases my journey, technical skills, and public GitHub projects in an interactive, Star Wars-themed, single-page application.

## Technologies Used

- **Framework:** React 18, TypeScript, Vite
- **Styling:** TailwindCSS 4, Framer Motion
- **UI Components:** shadcn/radix primitives
- **Data:** Live data via GitHub REST API
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

Comprehensive documentation has been generated for this repository. It details the architecture, workflows, troubleshooting steps, and the history of how this project evolved.

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
