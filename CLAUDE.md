# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build production site to ./dist/
pnpm preview    # Preview production build locally
```

Use `pnpm astro [command]` to run Astro CLI commands directly (e.g., `pnpm astro add`).

## Architecture

This is an **Astro 6** static site using file-based routing and TypeScript strict mode.

**Routing:** Files in `src/pages/` become routes automatically (`index.astro` → `/`).

**Component hierarchy:**
- `src/layouts/Layout.astro` — root HTML shell with `<slot />` for page content
- `src/pages/*.astro` — page-level files that compose layouts and components
- `src/components/*.astro` — reusable UI components

**Static assets** in `src/assets/` are imported directly in `.astro` files (Astro handles optimization). Files in `public/` are served as-is without processing.

**Styling** is scoped per-component via `<style>` blocks in `.astro` files. No global CSS framework is configured.

The `astro.config.mjs` currently uses defaults (`defineConfig({})`). Add integrations (e.g., Tailwind, React) via `pnpm astro add`.
