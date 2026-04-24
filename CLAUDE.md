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

**Styling** uses Tailwind v4 via `src/styles/global.css`. Theme tokens (`background`, `foreground`, `muted`, `border`, `code-background`, `accent`) are defined as CSS variables and exposed as Tailwind color utilities. The accent color is rust (`oklch(52% 0.14 35)`). IBM Plex Mono is the sole typeface, applied globally.

The `astro.config.mjs` is configured with the `@tailwindcss/vite` plugin. Linting/formatting is handled by Biome (`pnpm check`).

## Portfolio philosophy

This portfolio is a personal island — it covers everything about Rohit: past and present, what he's working on, what he likes, photos, code snippets, random thoughts, project ideas. It is personal and intimate, not a corporate showcase.

## Content rules

- **Everything visible on the site must be lowercase** — all text content, headings, labels, navigation, buttons, everything. No exceptions.
- **All external links must open in a new tab** — always add `target="_blank" rel="noopener noreferrer"` to any `<a>` pointing to an external URL.
- More rules will be added here as the portfolio evolves.
