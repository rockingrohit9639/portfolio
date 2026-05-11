## File: /Users/cypher007/projects/portfolio/CLAUDE.md

```
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
```

---



## File: /Users/cypher007/projects/portfolio/package.json (edit)

**Before:**
```
    "astro": "astro"
  },
```

**After:**
```
    "astro": "astro",
    "lint": "biome lint .",
    "format": "biome format --write .",
    "check": "biome check --write ."
  },
```

---



## File: /Users/cypher007/projects/portfolio/src/components/ThemeToggle.astro

```
---
---

<button id="theme-toggle" aria-label="Toggle theme">
  <span id="theme-label">theme: light</span>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  const label = document.getElementById('theme-label');

  function getTheme(): string {
    return localStorage.getItem('theme') ?? (
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
  }

  function applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    if (label) label.textContent = `theme: ${theme}`;
    localStorage.setItem('theme', theme);
  }

  applyTheme(getTheme());

  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') ?? 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
</script>

<style>
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: var(--muted);
    transition: color 0.15s;
  }

  button:hover {
    color: var(--foreground);
  }
</style>
```

---



## File: /Users/cypher007/projects/portfolio/src/layouts/Layout.astro

```
---
import '../styles/global.css'
import ThemeToggle from '../components/ThemeToggle.astro'
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <title>Rohit Kumar Saini — Software Engineer</title>
    <meta name="description" content="Software engineer who figures things out. Open to collaborations, freelance work, and interesting problems." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <!-- Prevent flash of wrong theme -->
    <script is:inline>
      (function () {
        const stored = localStorage.getItem('theme');
        const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', stored ?? preferred);
      })();
    </script>
  </head>
  <body style="--font-ibm-plex-mono: 'IBM Plex Mono', monospace;">
    <div class="fixed top-5 right-5 z-50 text-xs">
      <ThemeToggle />
    </div>
    <slot />
  </body>
</html>
```

---


## File: /Users/cypher007/projects/portfolio/CLAUDE.md (edit)

**Before:**
```
The `astro.config.mjs` currently uses defaults (`defineConfig({})`). Add integrations (e.g., Tailwind, React) via `pnpm astro add`.
```

**After:**
```
The `astro.config.mjs` is configured with the `@tailwindcss/vite` plugin. Linting/formatting is handled by Biome (`pnpm check`).

## Portfolio philosophy

This portfolio is a personal island — it covers everything about Rohit: past and present, what he's working on, what he likes, photos, code snippets, random thoughts, project ideas. It is personal and intimate, not a corporate showcase.

## Content rules

- **Everything visible on the site must be lowercase** — all text content, headings, labels, navigation, buttons, everything. No exceptions.
- More rules will be added here as the portfolio evolves.
```

---

## File: /Users/cypher007/projects/portfolio/CLAUDE.md (edit)

**Before:**
```
**Styling** is scoped per-component via `<style>` blocks in `.astro` files. No global CSS framework is configured.
```

**After:**
```
**Styling** uses Tailwind v4 via `src/styles/global.css`. Theme tokens (`background`, `foreground`, `muted`, `border`, `code-background`, `accent`) are defined as CSS variables and exposed as Tailwind color utilities. The accent color is rust (`oklch(52% 0.14 35)`). IBM Plex Mono is the sole typeface, applied globally.
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro

```
---
---

<main class="max-w-2xl mx-auto px-6 py-16 md:py-24">

  <!-- Hero -->
  <section class="mb-20">
    <h1 class="text-2xl font-semibold text-foreground mb-1">hi, i'm rohit.</h1>
    <p class="text-muted mb-8">welcome to my small island on the web.</p>
    <p class="text-foreground leading-relaxed">
      i build software with nextjs, react, and node. and sometimes
      i explain it to plants. they listen better than humans.
    </p>
  </section>

  <!-- About -->
  <section class="mb-16">
    <h2 class="text-xs text-muted uppercase tracking-widest mb-5 border-b border-border pb-2">about</h2>
    <div class="text-foreground leading-relaxed space-y-3">
      <p>
        started coding in 8th grade on secondhand hardware. didn't know what i was doing, but it stuck.
        did a bca, taught myself most of what matters during covid when there was nothing else to do.
      </p>
      <p>
        i care about open source. contributed to <a href="https://shelf.nu" class="text-accent hover:underline underline-offset-4">shelf.nu</a> —
        helped cut task time by 35% for their users. i like working on things that actually matter to people.
      </p>
    </div>
  </section>

  <!-- Currently -->
  <section class="mb-16">
    <h2 class="text-xs text-muted uppercase tracking-widest mb-5 border-b border-border pb-2">currently</h2>
    <ul class="space-y-2 text-foreground">
      <li class="flex gap-3">
        <span class="text-accent shrink-0">→</span>
        <span>founding engineer at <a href="https://acemate.ai" class="hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">acemate.ai</a></span>
      </li>
      <li class="flex gap-3">
        <span class="text-accent shrink-0">→</span>
        <span>rebuilding this site with astro (you're looking at it)</span>
      </li>
      <li class="flex gap-3">
        <span class="text-accent shrink-0">→</span>
        <span>picking up go. slowly.</span>
      </li>
    </ul>
  </section>

  <!-- Experience -->
  <section class="mb-16">
    <h2 class="text-xs text-muted uppercase tracking-widest mb-5 border-b border-border pb-2">experience</h2>
    <div class="space-y-8">
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">acemate.ai</span>
          <span class="text-muted text-xs shrink-0">oct 2025 – present</span>
        </div>
        <p class="text-accent text-xs mb-2">founding engineer</p>
        <p class="text-muted leading-relaxed">building the product from scratch. full-stack work across the board.</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <a href="https://shelf.nu" class="text-foreground font-medium hover:text-accent transition-colors">shelf.nu</a>
          <span class="text-muted text-xs shrink-0">open source</span>
        </div>
        <p class="text-accent text-xs mb-2">contributor</p>
        <p class="text-muted leading-relaxed">shipped features that reduced task time by 35% for their users.</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">prodioslabs</span>
          <span class="text-muted text-xs shrink-0">aug 2022 – sep 2024</span>
        </div>
        <p class="text-accent text-xs mb-2">senior software developer</p>
        <p class="text-muted leading-relaxed">built and maintained client web apps. led frontend architecture decisions.</p>
      </div>
    </div>
  </section>

  <!-- Projects -->
  <section class="mb-16">
    <h2 class="text-xs text-muted uppercase tracking-widest mb-5 border-b border-border pb-2">projects</h2>
    <div class="space-y-6">
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">echoes</span>
          <span class="text-muted text-xs">ai · storytelling</span>
        </div>
        <p class="text-muted leading-relaxed">ai-powered interactive storytelling. you choose, it writes.</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">mail bridge</span>
          <span class="text-muted text-xs">email · integration</span>
        </div>
        <p class="text-muted leading-relaxed">email integration service that actually makes sense to configure.</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">onesign</span>
          <span class="text-muted text-xs">auth · sso</span>
        </div>
        <p class="text-muted leading-relaxed">single sign-on server. simple to self-host.</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">form builder</span>
          <span class="text-muted text-xs">ui · drag-and-drop</span>
        </div>
        <p class="text-muted leading-relaxed">drag-and-drop form builder. no-code, but not dumbed down.</p>
      </div>
    </div>
  </section>

  <!-- Skills -->
  <section class="mb-16">
    <h2 class="text-xs text-muted uppercase tracking-widest mb-5 border-b border-border pb-2">skills</h2>
    <div class="space-y-2">
      <div class="flex gap-4">
        <span class="text-muted w-24 shrink-0">backend</span>
        <span class="text-foreground">nestjs, hono, express, trpc</span>
      </div>
      <div class="flex gap-4">
        <span class="text-muted w-24 shrink-0">frontend</span>
        <span class="text-foreground">react, next.js, remix, tailwind</span>
      </div>
      <div class="flex gap-4">
        <span class="text-muted w-24 shrink-0">languages</span>
        <span class="text-foreground">typescript, python, go (learning)</span>
      </div>
      <div class="flex gap-4">
        <span class="text-muted w-24 shrink-0">databases</span>
        <span class="text-foreground">postgresql, mongodb</span>
      </div>
      <div class="flex gap-4">
        <span class="text-muted w-24 shrink-0">ai</span>
        <span class="text-foreground">openai, gemini, mcp</span>
      </div>
    </div>
  </section>

  <!-- Find me -->
  <section class="mb-16">
    <h2 class="text-xs text-muted uppercase tracking-widest mb-5 border-b border-border pb-2">find me</h2>
    <nav class="flex flex-wrap gap-x-6 gap-y-2">
      <a href="https://github.com/imrohitsaini" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">github</a>
      <a href="https://twitter.com/imrohitsaini" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">twitter</a>
      <a href="https://linkedin.com/in/imrohitsaini" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">linkedin</a>
      <a href="mailto:hello@imrohitsaini.in" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">email</a>
    </nav>
  </section>

  <!-- Footer -->
  <footer class="text-xs text-muted border-t border-border pt-6">
    built with astro. no trackers.
  </footer>

</main>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
      <a href="https://github.com/imrohitsaini" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">github</a>
      <a href="https://twitter.com/imrohitsaini" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">twitter</a>
      <a href="https://linkedin.com/in/imrohitsaini" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">linkedin</a>
      <a href="mailto:hello@imrohitsaini.in" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">email</a>
```

**After:**
```
      <a href="https://github.com/rockingrohit9649" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">github</a>
      <a href="https://www.linkedin.com/in/rohit-kumar-saini/" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">linkedin</a>
      <a href="mailto:rohitsaini.codes@gmail.com" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">email</a>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
https://github.com/rockingrohit9649
```

**After:**
```
https://github.com/rockingrohit9639
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
      <a href="https://github.com/rockingrohit9639" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">github</a>
      <a href="https://www.linkedin.com/in/rohit-kumar-saini/" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">linkedin</a>
      <a href="mailto:rohitsaini.codes@gmail.com" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">email</a>
```

**After:**
```
      <a href="https://github.com/rockingrohit9639" target="_blank" rel="noopener noreferrer" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">github</a>
      <a href="https://www.linkedin.com/in/rohit-kumar-saini/" target="_blank" rel="noopener noreferrer" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">linkedin</a>
      <a href="mailto:rohitsaini.codes@gmail.com" target="_blank" rel="noopener noreferrer" class="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">email</a>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
    <div class="text-foreground leading-relaxed space-y-3">
      <p>
        started coding in 8th grade on secondhand hardware. didn't know what i was doing, but it stuck.
        did a bca, taught myself most of what matters during covid when there was nothing else to do.
      </p>
      <p>
        i care about open source. contributed to <a href="https://shelf.nu" class="text-accent hover:underline underline-offset-4">shelf.nu</a> —
        helped cut task time by 35% for their users. i like working on things that actually matter to people.
      </p>
    </div>
```

**After:**
```
    <div class="text-foreground leading-relaxed">
      <p>
        i started coding in 8th grade on a second-hand hcl computer, playing with simple html pages. even during my 12th boards, i kept learning c and c++. later, during my bca and the covid break, i discovered python, django, and eventually javascript, react, node.js, and various databases. now, i work as a full-stack developer at acemate.ai. i love sharing what i learn, contributing to open source, and connecting with other tech enthusiasts. my journey is driven by curiosity, constant learning, and the joy of turning ideas into real products.
      </p>
    </div>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
<a href="https://acemate.ai" class="hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">acemate.ai</a>
```

**After:**
```
<a href="https://acemate.ai" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent">acemate.ai</a>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">acemate.ai</span>
          <span class="text-muted text-xs shrink-0">oct 2025 – present</span>
        </div>
        <p class="text-accent text-xs mb-2">founding engineer</p>
        <p class="text-muted leading-relaxed">building the product from scratch. full-stack work across the board.</p>
      </div>
```

**After:**
```
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">acemate.ai</span>
          <span class="text-muted text-xs shrink-0">oct 2025 – present</span>
        </div>
        <p class="text-accent text-xs mb-2">founding engineer</p>
        <p class="text-muted leading-relaxed">building the product from scratch. full-stack work across the board.</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">acemate.ai</span>
          <span class="text-muted text-xs shrink-0">jul 2025 – sep 2025</span>
        </div>
        <p class="text-accent text-xs mb-2">working student – full stack developer</p>
      </div>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">acemate.ai</span>
          <span class="text-muted text-xs shrink-0">oct 2025 – present</span>
        </div>
        <p class="text-accent text-xs mb-2">founding engineer</p>
        <p class="text-muted leading-relaxed">building the product from scratch. full-stack work across the board.</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <span class="text-foreground font-medium">acemate.ai</span>
          <span class="text-muted text-xs shrink-0">jul 2025 – sep 2025</span>
        </div>
        <p class="text-accent text-xs mb-2">working student – full stack developer</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <a href="https://shelf.nu" class="text-foreground font-medium hover:text-accent transition-colors">shelf.nu</a>
          <span class="text-muted text-xs shrink-0">open source</span>
        </div>
        <p class="text-accent text-xs mb-2">contributor</p>
        <p class="text-muted leading-relaxed">shipped features that reduced task time by 35% for their users.</p>
      </div>
```

**After:**
```
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <a href="https://acemate.ai" target="_blank" rel="noopener noreferrer" class="text-foreground font-medium hover:text-accent transition-colors">acemate.ai</a>
          <span class="text-muted text-xs shrink-0">oct 2025 – present</span>
        </div>
        <p class="text-accent text-xs mb-2">founding engineer</p>
        <p class="text-muted leading-relaxed">building the product from scratch. full-stack work across the board.</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <a href="https://acemate.ai" target="_blank" rel="noopener noreferrer" class="text-foreground font-medium hover:text-accent transition-colors">acemate.ai</a>
          <span class="text-muted text-xs shrink-0">jul 2025 – sep 2025</span>
        </div>
        <p class="text-accent text-xs mb-2">working student – full stack developer</p>
      </div>
      <div>
        <div class="flex items-baseline justify-between gap-4 mb-1">
          <a href="https://shelf.nu" target="_blank" rel="noopener noreferrer" class="text-foreground font-medium hover:text-accent transition-colors">shelf.nu</a>
          <span class="text-muted text-xs shrink-0">open source</span>
        </div>
        <p class="text-accent text-xs mb-2">contributor</p>
        <p class="text-muted leading-relaxed">shipped features that reduced task time by 35% for their users.</p>
      </div>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
        <p class="text-muted leading-relaxed">shipped features that reduced task time by 35% for their users.</p>
```

**After:**
```
        <p class="text-muted leading-relaxed">i enhanced core modules like check-in/out workflows, asset validation, and booking export features. i improved the ui/ux with dynamic filters and quick actions, cutting task completion time by 35%. i also collaborated on 30+ pull requests with an international team while keeping the git history clean and easy to follow.</p>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
        <p class="text-muted leading-relaxed">built and maintained client web apps. led frontend architecture decisions.</p>
```

**After:**
```
        <p class="text-muted leading-relaxed">i led the development of the uttarakhand state government portal, growing services from 15 to over 90 for more than 500k citizens. i designed scalable solutions that boosted system performance by 40% with 95% uptime, and increased digital engagement by 50% through core features and better ui/ux.</p>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro (edit)

**Before:**
```
          <span class="text-foreground font-medium">prodioslabs</span>
```

**After:**
```
          <a href="https://prodioslabs.com/" target="_blank" rel="noopener noreferrer" class="text-foreground font-medium hover:text-accent transition-colors">prodioslabs</a>
```

---

## File: /Users/cypher007/projects/portfolio/CLAUDE.md (edit)

**Before:**
```
- **Everything visible on the site must be lowercase** — all text content, headings, labels, navigation, buttons, everything. No exceptions.
- More rules will be added here as the portfolio evolves.
```

**After:**
```
- **Everything visible on the site must be lowercase** — all text content, headings, labels, navigation, buttons, everything. No exceptions.
- **All external links must open in a new tab** — always add `target="_blank" rel="noopener noreferrer"` to any `<a>` pointing to an external URL.
- More rules will be added here as the portfolio evolves.
```

---


## File: /Users/cypher007/projects/portfolio/astro.config.mjs (edit)

**Before:**
```
  site: "https://imrohtisaini.in",
```

**After:**
```
  site: "https://imrohitsaini.in",
```

---

## File: /Users/cypher007/projects/portfolio/src/layouts/Layout.astro (edit)

**Before:**
```
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <title>Rohit Kumar Saini — Software Engineer</title>
    <meta name="description" content="Software engineer who figures things out. Open to collaborations, freelance work, and interesting problems." />
```

**After:**
```
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <title>rohit kumar saini — full-stack developer</title>
    <meta name="description" content="full-stack developer building software with nextjs, react, and node. founding engineer at acemate.ai." />
    <meta name="author" content="Rohit Kumar Saini" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://imrohitsaini.in" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://imrohitsaini.in" />
    <meta property="og:title" content="rohit kumar saini — full-stack developer" />
    <meta property="og:description" content="full-stack developer building software with nextjs, react, and node. founding engineer at acemate.ai." />
    <!-- Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="rohit kumar saini — full-stack developer" />
    <meta name="twitter:description" content="full-stack developer building software with nextjs, react, and node. founding engineer at acemate.ai." />
```

---

## File: /Users/cypher007/projects/portfolio/public/robots.txt

```
User-agent: *
Allow: /

Sitemap: https://imrohitsaini.in/sitemap-index.xml
```

---


## File: /Users/cypher007/.claude/projects/-Users-cypher007-projects-portfolio/memory/MEMORY.md

```
# Memory Index

- [Portfolio project state](project_portfolio.md) — live at imrohitsaini.in, Astro 6 + Tailwind v4, personal island tone
```

---


## File: /Users/cypher007/projects/portfolio/src/layouts/Layout.astro (edit)

**Before:**
```
import '../styles/global.css'
import ThemeToggle from '../components/ThemeToggle.astro'
```

**After:**
```
import '../styles/global.css'
import Nav from '../components/Nav.astro'
```

---

## File: /Users/cypher007/projects/portfolio/src/layouts/Layout.astro (edit)

**Before:**
```
    <div class="fixed top-5 right-5 z-50 text-xs">
      <ThemeToggle />
    </div>
```

**After:**
```
    <Nav />
```

---




## File: /Users/cypher007/projects/portfolio/src/content/thoughts/curiosity-over-credentials.md

```
---
type: thought
date: 2026-04-24
---

curiosity has taken me further than any degree or certificate ever did. the best engineers i've met are the ones who still get genuinely excited when something breaks in an unexpected way.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/multi-tenant-saas-idea.md

```
---
type: idea
date: 2026-04-20
---

a multi-tenant saas boilerplate with built-in team management, billing, and feature flags — all open source and self-hostable. tired of rebuilding this from scratch for every project.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/astro-content-collections.md

```
---
type: note
date: 2026-04-24
---

astro content collections are genuinely great. type-safe frontmatter, automatic routing support, and markdown just works. no need to reach for a cms for a personal site.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/on-simplicity.md

```
---
type: quote
date: 2026-04-18
---

"simplicity is the ultimate sophistication." — leonardo da vinci
```

---



## File: /Users/cypher007/projects/portfolio/src/styles/global.css

```
/* ── Theme tokens ── */
:root {
  --background: oklch(98% 0.01 95);
  --foreground: oklch(20% 0.01 95);
  --muted: oklch(50% 0.02 95);
  --border: oklch(88% 0.01 95);
  --code-background: oklch(94% 0.01 95);
  --accent: oklch(52% 0.14 35);
  --font-mono: 'IBM Plex Mono', monospace;
}

[data-theme="dark"] {
  --background: oklch(18% 0.01 95);
  --foreground: oklch(93% 0.01 95);
  --muted: oklch(62% 0.02 95);
  --border: oklch(28% 0.01 95);
  --code-background: oklch(22% 0.01 95);
  --accent: oklch(68% 0.14 35);
}

/* ── Reset & base ── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-mono);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.6;
}

::selection {
  background-color: oklch(from var(--accent) l c h / 0.15);
  color: var(--foreground);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
}

ul, ol {
  list-style: none;
}
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Nav.astro

```
---
const links = [
  { label: 'home', href: '/' },
  { label: 'gallery', href: '/gallery' },
  { label: 'thoughts', href: '/thoughts' },
  { label: 'bookmarks', href: '/bookmarks' },
  { label: 'snippets', href: '/snippets' },
];

const currentPath = Astro.url.pathname;
---

<header class="site-header">
  <div class="header-inner">

    <nav class="nav-desktop">
      {links.map(({ label, href }) => (
        <a href={href} class={currentPath === href ? 'nav-link active' : 'nav-link'}>{label}</a>
      ))}
      <a href="https://github.com/rockingrohit9639" target="_blank" rel="noopener noreferrer" class="nav-link nav-link-external">
        github
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        </svg>
      </a>
    </nav>

    <button id="theme-toggle" class="theme-btn" aria-label="Toggle theme">
      <span id="theme-label">theme: dark</span>
    </button>

    <button id="menu-toggle" class="menu-btn" aria-label="Toggle menu">
      <span class="menu-bar"></span>
      <span class="menu-bar"></span>
      <span class="menu-bar"></span>
    </button>

  </div>

  <div id="mobile-menu" class="mobile-menu hidden">
    <nav class="mobile-nav">
      {links.map(({ label, href }) => (
        <a href={href} class={currentPath === href ? 'nav-link active' : 'nav-link'}>{label}</a>
      ))}
      <a href="https://github.com/rockingrohit9639" target="_blank" rel="noopener noreferrer" class="nav-link nav-link-external">
        github
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        </svg>
      </a>
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: var(--background);
    border-bottom: 1px solid var(--border);
  }

  .header-inner {
    max-width: 48rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .nav-desktop {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex: 1;
  }

  .nav-link {
    font-size: 0.75rem;
    color: var(--muted);
    transition: color 0.15s;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--foreground);
  }

  .theme-btn {
    font-size: 0.75rem;
    color: var(--muted);
    background: none;
    border: none;
    padding: 0;
    transition: color 0.15s;
    white-space: nowrap;
  }

  .theme-btn:hover {
    color: var(--foreground);
  }

  .menu-btn {
    display: none;
    flex-direction: column;
    gap: 0.375rem;
    background: none;
    border: none;
    padding: 0;
  }

  .menu-bar {
    display: block;
    width: 1rem;
    height: 1px;
    background: var(--muted);
    transition: background 0.15s;
  }

  .mobile-menu {
    border-top: 1px solid var(--border);
    background: var(--background);
  }

  .mobile-menu.hidden {
    display: none;
  }

  .mobile-nav {
    max-width: 48rem;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .mobile-nav .nav-link {
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .nav-desktop {
      display: none;
    }
    .menu-btn {
      display: flex;
    }
  }
</style>

<script>
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  function getTheme(): string {
    return localStorage.getItem('theme') ?? (
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
  }

  function applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeLabel) themeLabel.textContent = `theme: ${theme}`;
    localStorage.setItem('theme', theme);
  }

  applyTheme(getTheme());

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') ?? 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });
</script>
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/index.astro

```
---
import Layout from '../layouts/Layout.astro';
---

<Layout>
  <main class="page-main">

    <section class="hero">
      <h1>hi, i'm rohit.</h1>
      <p class="subtitle">welcome to my small island on the web.</p>
      <p>
        i build software with nextjs, react, and node. and sometimes
        i explain it to plants. they listen better than humans.
      </p>
    </section>

    <section class="section">
      <h2 class="section-heading">about</h2>
      <p>
        i started coding in 8th grade on a second-hand hcl computer, playing with simple html pages. even during my 12th boards, i kept learning c and c++. later, during my bca and the covid break, i discovered python, django, and eventually javascript, react, node.js, and various databases. now, i work as a full-stack developer at acemate.ai. i love sharing what i learn, contributing to open source, and connecting with other tech enthusiasts. my journey is driven by curiosity, constant learning, and the joy of turning ideas into real products.
      </p>
    </section>

    <section class="section">
      <h2 class="section-heading">currently</h2>
      <ul class="arrow-list">
        <li>
          <span class="arrow">→</span>
          <span>founding engineer at <a href="https://acemate.ai" target="_blank" rel="noopener noreferrer" class="link">acemate.ai</a></span>
        </li>
        <li>
          <span class="arrow">→</span>
          <span>rebuilding this site with astro (you're looking at it)</span>
        </li>
        <li>
          <span class="arrow">→</span>
          <span>picking up go. slowly.</span>
        </li>
      </ul>
    </section>

    <section class="section">
      <h2 class="section-heading">experience</h2>
      <div class="exp-list">
        <div class="exp-item">
          <div class="exp-header">
            <a href="https://acemate.ai" target="_blank" rel="noopener noreferrer" class="exp-company">acemate.ai</a>
            <span class="exp-date">oct 2025 – present</span>
          </div>
          <p class="exp-role">founding engineer</p>
          <p class="muted">building the product from scratch. full-stack work across the board.</p>
        </div>
        <div class="exp-item">
          <div class="exp-header">
            <a href="https://acemate.ai" target="_blank" rel="noopener noreferrer" class="exp-company">acemate.ai</a>
            <span class="exp-date">jul 2025 – sep 2025</span>
          </div>
          <p class="exp-role">working student – full stack developer</p>
        </div>
        <div class="exp-item">
          <div class="exp-header">
            <a href="https://shelf.nu" target="_blank" rel="noopener noreferrer" class="exp-company">shelf.nu</a>
            <span class="exp-date">open source</span>
          </div>
          <p class="exp-role">contributor</p>
          <p class="muted">i enhanced core modules like check-in/out workflows, asset validation, and booking export features. i improved the ui/ux with dynamic filters and quick actions, cutting task completion time by 35%. i also collaborated on 30+ pull requests with an international team while keeping the git history clean and easy to follow.</p>
        </div>
        <div class="exp-item">
          <div class="exp-header">
            <a href="https://prodioslabs.com/" target="_blank" rel="noopener noreferrer" class="exp-company">prodioslabs</a>
            <span class="exp-date">aug 2022 – sep 2024</span>
          </div>
          <p class="exp-role">senior software developer</p>
          <p class="muted">i led the development of the uttarakhand state government portal, growing services from 15 to over 90 for more than 500k citizens. i designed scalable solutions that boosted system performance by 40% with 95% uptime, and increased digital engagement by 50% through core features and better ui/ux.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-heading">projects</h2>
      <div class="project-list">
        <div class="project-item">
          <div class="project-header">
            <span class="project-name">echoes</span>
            <span class="muted small">ai · storytelling</span>
          </div>
          <p class="muted">ai-powered interactive storytelling. you choose, it writes.</p>
        </div>
        <div class="project-item">
          <div class="project-header">
            <span class="project-name">mail bridge</span>
            <span class="muted small">email · integration</span>
          </div>
          <p class="muted">email integration service that actually makes sense to configure.</p>
        </div>
        <div class="project-item">
          <div class="project-header">
            <span class="project-name">onesign</span>
            <span class="muted small">auth · sso</span>
          </div>
          <p class="muted">single sign-on server. simple to self-host.</p>
        </div>
        <div class="project-item">
          <div class="project-header">
            <span class="project-name">form builder</span>
            <span class="muted small">ui · drag-and-drop</span>
          </div>
          <p class="muted">drag-and-drop form builder. no-code, but not dumbed down.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-heading">skills</h2>
      <div class="skills-list">
        <div class="skill-row">
          <span class="muted skill-label">backend</span>
          <span>nestjs, hono, express, trpc</span>
        </div>
        <div class="skill-row">
          <span class="muted skill-label">frontend</span>
          <span>react, next.js, remix, tailwind</span>
        </div>
        <div class="skill-row">
          <span class="muted skill-label">languages</span>
          <span>typescript, python, go (learning)</span>
        </div>
        <div class="skill-row">
          <span class="muted skill-label">databases</span>
          <span>postgresql, mongodb</span>
        </div>
        <div class="skill-row">
          <span class="muted skill-label">ai</span>
          <span>openai, gemini, mcp</span>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-heading">find me</h2>
      <nav class="find-me">
        <a href="https://github.com/rockingrohit9639" target="_blank" rel="noopener noreferrer" class="link">github</a>
        <a href="https://www.linkedin.com/in/rohit-kumar-saini/" target="_blank" rel="noopener noreferrer" class="link">linkedin</a>
        <a href="mailto:rohitsaini.codes@gmail.com" target="_blank" rel="noopener noreferrer" class="link">email</a>
      </nav>
    </section>

    <footer class="site-footer">
      built with astro. no trackers.
    </footer>

  </main>
</Layout>

<style>
  .page-main {
    max-width: 48rem;
    margin: 0 auto;
    padding: 6rem 1.5rem 4rem;
  }

  /* Hero */
  .hero {
    margin-bottom: 4rem;
  }

  .hero h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .hero .subtitle {
    color: var(--muted);
    margin-bottom: 2rem;
  }

  /* Sections */
  .section {
    margin-bottom: 3.5rem;
  }

  .section-heading {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--muted);
    letter-spacing: 0.05em;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
    margin-bottom: 1.25rem;
  }

  /* Arrow list */
  .arrow-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .arrow-list li {
    display: flex;
    gap: 0.75rem;
  }

  .arrow {
    color: var(--accent);
    flex-shrink: 0;
  }

  /* Experience */
  .exp-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .exp-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.25rem;
  }

  .exp-company {
    font-weight: 500;
    transition: color 0.15s;
  }

  .exp-company:hover {
    color: var(--accent);
  }

  .exp-date {
    font-size: 0.75rem;
    color: var(--muted);
    flex-shrink: 0;
  }

  .exp-role {
    font-size: 0.75rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }

  /* Projects */
  .project-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .project-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.25rem;
  }

  .project-name {
    font-weight: 500;
  }

  /* Skills */
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .skill-row {
    display: flex;
    gap: 1rem;
  }

  .skill-label {
    width: 6rem;
    flex-shrink: 0;
  }

  /* Find me */
  .find-me {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
  }

  /* Footer */
  .site-footer {
    font-size: 0.75rem;
    color: var(--muted);
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
  }

  /* Shared */
  .muted {
    color: var(--muted);
  }

  .small {
    font-size: 0.75rem;
  }

  .link {
    color: var(--foreground);
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: var(--border);
    transition: color 0.15s, text-decoration-color 0.15s;
  }

  .link:hover {
    color: var(--accent);
    text-decoration-color: var(--accent);
  }
</style>
```

---

## File: /Users/cypher007/projects/portfolio/src/layouts/Layout.astro (edit)

**Before:**
```
  <body style="--font-ibm-plex-mono: 'IBM Plex Mono', monospace;">
```

**After:**
```
  <body>
```

---

## File: /Users/cypher007/projects/portfolio/astro.config.mjs (edit)

**Before:**
```
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://imrohitsaini.in",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
```

**After:**
```
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://imrohitsaini.in",
  integrations: [sitemap()],
});
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/thoughts.astro

```
---
import { getCollection, render } from 'astro:content';
import Layout from '../layouts/Layout.astro';

const all = await getCollection('thoughts');
const thoughts = all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const types = ['all', 'thought', 'note', 'idea', 'quote'] as const;

const typeSymbol: Record<string, string> = {
  thought: '~',
  note: '#',
  idea: '*',
  quote: '"',
};
---

<Layout>
  <main class="thoughts-main">

    <div class="thoughts-header">
      <span class="breadcrumb">~/thoughts</span>
      <h1>thoughts.</h1>
      <p class="subtitle">a scratchpad. random thoughts, notes, ideas, and the occasional quote worth keeping.</p>
    </div>

    <div class="filters" id="filters">
      {types.map((t, i) => (
        <button
          data-filter={t}
          data-active={i === 0 ? 'true' : 'false'}
          class="filter-btn"
        >
          {t}
        </button>
      ))}
    </div>

    <div class="entries" id="thoughts-list">
      {thoughts.map(async (entry, i) => {
        const { Content } = await render(entry);
        const sym = typeSymbol[entry.data.type] ?? '·';
        const dateStr = entry.data.date
          .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
          .toLowerCase();
        return (
          <article
            data-type={entry.data.type}
            class="thought-entry"
            style={`animation-delay: ${i * 60}ms`}
          >
            <div class="entry-meta">
              <div class="entry-type">
                <span class="sym">{sym}</span>
                <span class="type-label">{entry.data.type}</span>
              </div>
              <span class="entry-date">{dateStr}</span>
            </div>
            <div class="entry-content">
              <Content />
            </div>
          </article>
        );
      })}
    </div>

    <div id="empty-state" class="empty-state hidden">
      <p>no entries of this type yet.</p>
    </div>

  </main>
</Layout>

<style>
  .thoughts-main {
    max-width: 48rem;
    margin: 0 auto;
    padding: 6rem 1.5rem 6rem;
  }

  .thoughts-header {
    margin-bottom: 2.5rem;
  }

  .breadcrumb {
    display: block;
    font-size: 0.75rem;
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .thoughts-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .thoughts-header .subtitle {
    font-size: 0.875rem;
    color: var(--muted);
  }

  /* Filter buttons */
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }

  .filter-btn {
    font-family: inherit;
    font-size: 0.75rem;
    padding: 0.375rem 0.875rem;
    border: 1px solid var(--border);
    color: var(--muted);
    background: transparent;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }

  .filter-btn:hover {
    border-color: var(--foreground);
    color: var(--foreground);
  }

  .filter-btn[data-active="true"] {
    border-color: var(--foreground);
    color: var(--foreground);
  }

  /* Entries */
  .entries {
    border-top: 1px solid var(--border);
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .thought-entry {
    border-bottom: 1px solid var(--border);
    padding: 2rem 0 2.5rem;
    animation: fade-up 0.3s ease both;
  }

  .entry-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .entry-type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .sym {
    color: var(--accent);
    font-weight: 500;
  }

  .type-label {
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.05em;
  }

  .entry-date {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .entry-content :global(p) {
    margin: 0;
    line-height: 1.7;
  }

  /* Empty state */
  .empty-state {
    padding: 4rem 0;
    text-align: center;
    color: var(--muted);
    font-size: 0.875rem;
  }

  .empty-state.hidden {
    display: none;
  }
</style>

<script>
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const entries = document.querySelectorAll<HTMLElement>('.thought-entry');
  const emptyState = document.getElementById('empty-state');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.dataset.active = 'false');
      btn.dataset.active = 'true';

      let visible = 0;
      entries.forEach((entry) => {
        const show = filter === 'all' || entry.dataset.type === filter;
        entry.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (emptyState) emptyState.classList.toggle('hidden', visible > 0);
    });
  });
</script>
```

---


## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/ray-so.json

```
{
  "title": "ray.so",
  "url": "https://ray.so",
  "description": "beautiful code screenshots. the cleanest one out there.",
  "category": "tools",
  "date": "2026-04-01"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/excalidraw.json

```
{
  "title": "excalidraw",
  "url": "https://excalidraw.com",
  "description": "virtual whiteboard for sketching diagrams. hand-drawn feel, surprisingly polished.",
  "category": "tools",
  "date": "2026-03-15"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/refactoring-ui.json

```
{
  "title": "refactoring ui",
  "url": "https://www.refactoringui.com",
  "description": "the book that taught me to actually think about design. required reading for developers.",
  "category": "design",
  "date": "2026-02-10"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/the-grug-brained-developer.json

```
{
  "title": "the grug brained developer",
  "url": "https://grugbrain.dev",
  "description": "complexity very bad. grug not like complexity. one of the best takes on software development.",
  "category": "articles",
  "date": "2026-01-20"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/bookmarks.astro

```
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';

const all = await getCollection('bookmarks');
const bookmarks = all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const categories = ['all', 'tools', 'design', 'articles', 'misc'] as const;
---

<Layout>
  <main class="bookmarks-main">

    <div class="bookmarks-header">
      <span class="breadcrumb">~/bookmarks</span>
      <h1>bookmarks.</h1>
      <p class="subtitle">things i've found useful, interesting, or worth revisiting.</p>
    </div>

    <div class="filters" id="filters">
      {categories.map((c, i) => (
        <button
          data-filter={c}
          data-active={i === 0 ? 'true' : 'false'}
          class="filter-btn"
        >
          {c}
        </button>
      ))}
    </div>

    <div class="bookmark-list" id="bookmark-list">
      {bookmarks.map((entry) => (
        <a
          href={entry.data.url}
          target="_blank"
          rel="noopener noreferrer"
          data-category={entry.data.category}
          class="bookmark-item"
        >
          <div class="bookmark-top">
            <span class="bookmark-title">{entry.data.title}</span>
            <span class="bookmark-category">{entry.data.category}</span>
          </div>
          {entry.data.description && (
            <p class="bookmark-desc">{entry.data.description}</p>
          )}
          <span class="bookmark-url">{new URL(entry.data.url).hostname}</span>
        </a>
      ))}
    </div>

    <div id="empty-state" class="empty-state hidden">
      <p>no bookmarks in this category yet.</p>
    </div>

  </main>
</Layout>

<style>
  .bookmarks-main {
    max-width: 48rem;
    margin: 0 auto;
    padding: 6rem 1.5rem 6rem;
  }

  .bookmarks-header {
    margin-bottom: 2.5rem;
  }

  .breadcrumb {
    display: block;
    font-size: 0.75rem;
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .bookmarks-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
    color: var(--muted);
  }

  /* Filters */
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }

  .filter-btn {
    font-family: inherit;
    font-size: 0.75rem;
    padding: 0.375rem 0.875rem;
    border: 1px solid var(--border);
    color: var(--muted);
    background: transparent;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }

  .filter-btn:hover {
    border-color: var(--foreground);
    color: var(--foreground);
  }

  .filter-btn[data-active="true"] {
    border-color: var(--foreground);
    color: var(--foreground);
  }

  /* Bookmark list */
  .bookmark-list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border);
  }

  .bookmark-item {
    display: block;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    transition: opacity 0.15s;
  }

  .bookmark-item:hover {
    opacity: 0.75;
  }

  .bookmark-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.375rem;
  }

  .bookmark-title {
    font-weight: 500;
    color: var(--foreground);
  }

  .bookmark-category {
    font-size: 0.75rem;
    color: var(--accent);
    flex-shrink: 0;
  }

  .bookmark-desc {
    font-size: 0.875rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 0.375rem;
  }

  .bookmark-url {
    font-size: 0.75rem;
    color: var(--border);
  }

  /* Empty state */
  .empty-state {
    padding: 4rem 0;
    text-align: center;
    color: var(--muted);
    font-size: 0.875rem;
  }

  .empty-state.hidden {
    display: none;
  }
</style>

<script>
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const items = document.querySelectorAll<HTMLElement>('.bookmark-item');
  const emptyState = document.getElementById('empty-state');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.dataset.active = 'false');
      btn.dataset.active = 'true';

      let visible = 0;
      items.forEach((item) => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (emptyState) emptyState.classList.toggle('hidden', visible > 0);
    });
  });
</script>
```

---

## File: /Users/cypher007/projects/portfolio/src/content.config.ts

```
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/thoughts" }),
  schema: z.object({
    type: z.enum(["thought", "note", "idea", "quote"]),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

const bookmarks = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/bookmarks" }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    category: z.enum(["tools", "design", "articles", "misc"]),
    date: z.coerce.date(),
  }),
});

const snippets = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/snippets" }),
  schema: z.object({
    title: z.string(),
    language: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { thoughts, bookmarks, snippets };
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/debounce.md

```
---
title: debounce
language: typescript
date: 2026-04-10
---

```typescript
function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/sleep.md

```
---
title: sleep
language: typescript
date: 2026-04-05
---

```typescript
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
```
```

---


## File: /Users/cypher007/projects/portfolio/src/content/snippets/copy-to-clipboard.md

```
---
title: copy to clipboard
language: typescript
date: 2026-04-12
---

```typescript
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/truncate.md

```
---
title: truncate string
language: typescript
date: 2026-04-08
---

```typescript
const truncate = (str: string, maxLength: number): string =>
  str.length <= maxLength ? str : str.slice(0, maxLength).trimEnd() + '…';
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/cn.md

```
---
title: cn (classnames utility)
language: typescript
date: 2026-04-06
---

```typescript
type ClassValue = string | null | undefined | false;

function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/use-local-storage.md

```
---
title: useLocalStorage hook
language: typescript
date: 2026-04-03
---

```typescript
import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = (val: T) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, set] as const;
}
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/format-date.md

```
---
title: format date
language: typescript
date: 2026-03-28
---

```typescript
const formatDate = (date: Date | string): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/group-by.md

```
---
title: group by
language: typescript
date: 2026-03-20
---

```typescript
function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = key(item);
    (acc[group] ??= []).push(item);
    return acc;
  }, {} as Record<string, T[]>);
}
```
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/snippets.astro

```
---
import { getCollection, render } from 'astro:content';
import Layout from '../layouts/Layout.astro';

const all = await getCollection('snippets');
const snippets = all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<Layout>
  <main class="snippets-main">

    <div class="snippets-header">
      <span class="breadcrumb">~/snippets</span>
      <h1>snippets.</h1>
      <p class="subtitle">small pieces of code i keep coming back to.</p>
    </div>

    <div class="snippet-list">
      {snippets.map(async (entry) => {
        const { Content } = await render(entry);
        return (
          <article class="snippet-entry">
            <div class="snippet-meta">
              <span class="snippet-title">{entry.data.title}</span>
              <div class="snippet-actions">
                <span class="snippet-lang">{entry.data.language}</span>
                <button class="copy-btn" aria-label="copy code">copy</button>
              </div>
            </div>
            <div class="snippet-code">
              <Content />
            </div>
          </article>
        );
      })}
    </div>

  </main>
</Layout>

<style>
  .snippets-main {
    max-width: 48rem;
    margin: 0 auto;
    padding: 6rem 1.5rem 6rem;
  }

  .snippets-header {
    margin-bottom: 2.5rem;
  }

  .breadcrumb {
    display: block;
    font-size: 0.75rem;
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .snippets-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
    color: var(--muted);
  }

  /* Snippet list */
  .snippet-list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border);
  }

  .snippet-entry {
    padding: 2rem 0;
    border-bottom: 1px solid var(--border);
  }

  .snippet-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .snippet-title {
    font-weight: 500;
  }

  .snippet-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .snippet-lang {
    font-size: 0.75rem;
    color: var(--accent);
  }

  .copy-btn {
    font-family: inherit;
    font-size: 0.75rem;
    color: var(--muted);
    background: transparent;
    border: 1px solid var(--border);
    padding: 0.2rem 0.6rem;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .copy-btn:hover {
    color: var(--foreground);
    border-color: var(--foreground);
  }

  .copy-btn.copied {
    color: var(--accent);
    border-color: var(--accent);
  }

  /* Code block overrides */
  .snippet-code :global(pre) {
    background: var(--code-background) !important;
    border: 1px solid var(--border);
    padding: 1.25rem;
    overflow-x: auto;
    font-size: 0.8125rem;
    line-height: 1.7;
  }

  .snippet-code :global(code) {
    font-family: var(--font-mono);
  }

  .snippet-code :global(p) {
    margin: 0;
  }
</style>

<script>
  document.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const code = btn.closest('.snippet-entry')?.querySelector('pre')?.innerText ?? '';
      const ok = await navigator.clipboard.writeText(code).then(() => true).catch(() => false);
      if (ok) {
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'copy';
          btn.classList.remove('copied');
        }, 2000);
      }
    });
  });
</script>
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/snippets.astro (edit)

**Before:**
```
  .copy-btn {
    font-family: inherit;
    font-size: 0.75rem;
    color: var(--muted);
    background: transparent;
    border: 1px solid var(--border);
    padding: 0.2rem 0.6rem;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .copy-btn:hover {
    color: var(--foreground);
    border-color: var(--foreground);
  }

  .copy-btn.copied {
    color: var(--accent);
    border-color: var(--accent);
  }
```

**After:**
```
  .copy-btn {
    font-family: inherit;
    font-size: 0.75rem;
    color: var(--muted);
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.15s;
    opacity: 0.5;
  }

  .copy-btn:hover {
    color: var(--foreground);
    opacity: 1;
  }

  .copy-btn.copied {
    color: var(--accent);
    opacity: 1;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro

```
---
import { Image } from 'astro:assets';
import Layout from '../layouts/Layout.astro';

const imageFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/gallery/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const galleryMeta: Record<string, { tags: string[] }> = {
  'mountains.jpg':   { tags: ['nature', 'landscape'] },
  'forest.jpg':      { tags: ['nature', 'forest'] },
  'city-lights.jpg': { tags: ['urban', 'night'] },
  'forest-path.jpg': { tags: ['nature', 'forest'] },
  'foggy-hills.jpg': { tags: ['nature', 'landscape'] },
  'coastal.jpg':     { tags: ['nature', 'landscape'] },
  'desert.jpg':      { tags: ['nature', 'landscape'] },
};

const images = Object.entries(imageFiles).map(([path, mod]) => {
  const filename = path.split('/').pop()!;
  const meta = galleryMeta[filename] ?? { tags: [] };
  return { src: mod.default, tags: meta.tags };
});

const allTags = ['all', ...Array.from(new Set(images.flatMap((i) => i.tags))).sort()];
---

<Layout>
  <main class="gallery-main">

    <div class="gallery-header">
      <span class="breadcrumb">~/gallery</span>
      <h1>gallery.</h1>
      <p class="subtitle">things i've seen and liked.</p>
    </div>

    {images.length === 0 ? (
      <p class="empty">nothing here yet.</p>
    ) : (
      <>
        <div class="filter-bar">
          {allTags.map((tag) => (
            <button class="filter-btn" data-tag={tag} data-active={tag === 'all' ? 'true' : undefined}>
              {tag}
            </button>
          ))}
        </div>

        <div class="masonry">
          {images.map((img) => (
            <div class="masonry-item" data-tags={img.tags.join(',')}>
              <Image src={img.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </>
    )}

  </main>
</Layout>

<style>
  .gallery-main {
    max-width: 64rem;
    margin: 0 auto;
    padding: 6rem 1.5rem 6rem;
  }

  .gallery-header {
    margin-bottom: 2.5rem;
  }

  .breadcrumb {
    display: block;
    font-size: 0.75rem;
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .gallery-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
    color: var(--muted);
  }

  .empty {
    font-size: 0.875rem;
    color: var(--muted);
    border-top: 1px solid var(--border);
    padding-top: 2rem;
  }

  /* Filters */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
  }

  .filter-btn {
    font-family: inherit;
    font-size: 0.75rem;
    color: var(--muted);
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.15s;
  }

  .filter-btn:hover {
    color: var(--foreground);
  }

  .filter-btn[data-active="true"] {
    color: var(--accent);
  }

  /* Masonry */
  .masonry {
    columns: 3;
    column-gap: 0.75rem;
  }

  .masonry-item {
    break-inside: avoid;
    margin-bottom: 0.75rem;
  }

  .masonry-item img {
    width: 100%;
    display: block;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }

  .masonry-item:hover img {
    filter: grayscale(0%);
  }

  .masonry-item.hidden {
    display: none;
  }

  @media (max-width: 768px) {
    .masonry {
      columns: 2;
    }
  }

  @media (max-width: 480px) {
    .masonry {
      columns: 1;
    }
  }
</style>

<script>
  const btns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const items = document.querySelectorAll<HTMLElement>('.masonry-item');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.removeAttribute('data-active'));
      btn.setAttribute('data-active', 'true');

      const tag = btn.dataset.tag!;
      items.forEach((item) => {
        const tags = item.dataset.tags?.split(',') ?? [];
        if (tag === 'all' || tags.includes(tag)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
</script>
```

---

## File: /Users/cypher007/projects/portfolio/src/styles/global.css (edit)

**Before:**
```
button {
  font-family: inherit;
  cursor: pointer;
}
```

**After:**
```
button {
  font-family: inherit;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  appearance: none;
}
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .filter-btn {
    font-family: inherit;
    font-size: 0.75rem;
    color: var(--muted);
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: color 0.15s;
  }
```

**After:**
```
  .filter-btn {
    font-family: inherit;
    font-size: 0.75rem;
    color: var(--muted);
    cursor: pointer;
    transition: color 0.15s;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .filter-btn {
    font-family: inherit;
    font-size: 0.75rem;
    color: var(--muted);
    cursor: pointer;
    transition: color 0.15s;
  }

  .filter-btn:hover {
    color: var(--foreground);
  }

  .filter-btn[data-active="true"] {
    color: var(--accent);
  }
```

**After:**
```
  .filter-btn {
    font-family: inherit;
    font-size: 0.75rem;
    padding: 0.375rem 0.875rem;
    border: 1px solid var(--border);
    color: var(--muted);
    background: transparent;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }

  .filter-btn:hover {
    border-color: var(--foreground);
    color: var(--foreground);
  }

  .filter-btn[data-active="true"] {
    border-color: var(--foreground);
    color: var(--foreground);
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .masonry-item img {
    width: 100%;
    display: block;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

**After:**
```
  .masonry-item img {
    width: 100%;
    display: block;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
    max-width: 64rem;
```

**After:**
```
    max-width: 48rem;
```

---

## File: /Users/cypher007/.claude/projects/-Users-cypher007-projects-portfolio/memory/project_portfolio.md

```
---
name: Portfolio project state
description: Current state, deployment info, and repo for Rohit's Astro portfolio
type: project
---
Portfolio is live at https://imrohitsaini.in (replacing the old Next.js/Payload CMS site).

Repo: `/Users/cypher007/projects/portfolio` — this is THE repo to use for any portfolio changes.

Built with Astro 6, pure CSS (Tailwind removed), IBM Plex Mono, dark/light theme toggle.

Pages built: home, thoughts, bookmarks, snippets, gallery (masonry with tag filters).

**Why:** Personal island site — covers everything about Rohit, not just a professional showcase.

**How to apply:** Whenever Rohit asks to update, add, or change anything in his portfolio, always work in `/Users/cypher007/projects/portfolio`. When suggesting new features, keep the personal/intimate tone. Prefer simple Astro pages with scoped CSS over components unless reuse is clear.
```

---

## File: /Users/cypher007/.claude/projects/-Users-cypher007/memory/portfolio_repo.md

```
---
name: Portfolio repo location
description: Where Rohit's personal portfolio lives — use this for any portfolio update requests
type: reference
---
Rohit's portfolio repo is at `/Users/cypher007/projects/portfolio`.

Live at https://imrohitsaini.in. Built with Astro 6 + pure CSS, IBM Plex Mono, dark/light theme.

**How to apply:** Whenever Rohit asks to update, add, or change anything in his portfolio — from any project or conversation — always work in `/Users/cypher007/projects/portfolio`.
```

---

## File: /Users/cypher007/.claude/projects/-Users-cypher007/memory/MEMORY.md

```
# Memory Index

- [Portfolio repo location](portfolio_repo.md) — always use /Users/cypher007/projects/portfolio for portfolio changes
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-morph-adaptive-ui-sdk.md

```
---
type: idea
date: 2026-05-06
---

morph — a framework-agnostic typescript SDK that makes any UI quietly learn which features each user actually uses and surfaces those without building a settings screen. two lines of code, no "customize" button. the UI just learns.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-ai-native-screen-recorder.md

```
---
type: idea
date: 2026-04-28
---

an ai-native screen recorder that captures video *and* a structured event stream (cursor, clicks, keypresses) — paired with an MCP-first editor that lets any AI agent edit recordings intelligently. record once, prompt to get a polished demo.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-autonomous-computer-robot.md

```
---
type: idea
date: 2026-04-20
---

a personal agent that runs 24/7 on your machine, operating a computer the way a human would. handles emails, organizes files, browses twitter when bored, stays in contact via telegram. develops its own personality on first boot. feels like a companion, not a tool.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-plug-mcp-registry.md

```
---
type: idea
date: 2026-05-01
---

plug — a curated, ai-verified registry of MCP servers that reads the source code, verifies tools actually work, checks safety, and tells you exactly what you're installing. not a dumb directory — an ai-powered review system.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-standup-ai-agent.md

```
---
type: idea
date: 2026-04-25
---

a voice ai agent that auto-joins your google meet standup, remembers everything from past standups, keeps the meeting on track, and posts a structured summary to slack. nobody starts it — it just shows up.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-portfolio-mcp-server.md

```
---
type: idea
date: 2026-04-22
---

a portfolio that exposes an MCP server — any LLM (claude, gemini, gpt) can read and update the site's content through tool calls. read operations are open, writes require a secret passphrase. the portfolio becomes programmable.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-interview-copilot.md

```
---
type: idea
date: 2026-04-25
---

an ai copilot that runs alongside a live technical interview, listens in real time, pulls context from linear/github/jira, and silently surfaces follow-up questions to the interviewer. the candidate never knows it's there.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-remotion-video-from-prompts.md

```
---
type: idea
date: 2026-04-25
---

a tool that takes a text prompt and generates a fully rendered video using remotion — react-based programmatic composition. an LLM translates the prompt into scenes, timing, and animations, then renders to mp4. iterate with prompts, preview instantly.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-brainjar-slack-memory.md

```
---
type: idea
date: 2026-04-20
---

brainjar — a slack bot that remembers everything your team decided and surfaces it when someone asks. indexes messages from selected channels, answers questions with context + links to original messages. slack IS the interface.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-claude-personality-capture.md

```
---
type: idea
date: 2026-05-03
---

claude observes how you write code over time and builds a profile of your style via the correction delta — the gap between what it suggested and what you actually committed. renamed a variable? naming preference. deleted comments? comment philosophy. the ai adapts silently.
```

---

## File: /Users/cypher007/projects/portfolio/src/content/thoughts/idea-acemate-proactive-recap.md

```
---
type: idea
date: 2026-04-30
---

when a user returns to a chat after a delay, proactively show a recap of the conversation so they don't have to scroll back. track the gap since the last message, and if it's long enough, surface a summary at the top automatically.
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/thoughts.astro (edit)

**Before:**
```
<p>no entries of this type yet.</p>
```

**After:**
```
<p>nothing here yet. the island is quiet on this side.</p>
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/obsidian.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "obsidian",
	"url": "https://obsidian.md/",
	"description": "local-first markdown knowledge base. linked notes, graph view, and a plugin ecosystem that goes deep.",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/linear.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "linear",
	"url": "https://linear.app/",
	"description": "issue tracking that actually feels fast. keyboard-first, opinionated, and beautifully minimal.",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/excalidraw.json (edit)

**Before:**
```
	"description": "virtual whiteboard for sketching diagrams. hand-drawn feel, surprisingly polished.",
```

**After:**
```

```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/refactoring-ui.json (edit)

**Before:**
```
  "description": "the book that taught me to actually think about design. required reading for developers.",
```

**After:**
```

```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/obsidian.json (edit)

**Before:**
```
	"description": "local-first markdown knowledge base. linked notes, graph view, and a plugin ecosystem that goes deep.",
```

**After:**
```

```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/linear.json (edit)

**Before:**
```
	"description": "issue tracking that actually feels fast. keyboard-first, opinionated, and beautifully minimal.",
```

**After:**
```

```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/the-grug-brained-developer.json (edit)

**Before:**
```
	"description": "complexity very bad. grug not like complexity. one of the best takes on software development.",
```

**After:**
```

```

---

## File: /Users/cypher007/projects/portfolio/src/pages/bookmarks.astro (edit)

**Before:**
```
          {entry.data.description && (
            <p class="bookmark-desc">{entry.data.description}</p>
          )}
```

**After:**
```

```

---

## File: /Users/cypher007/projects/portfolio/src/pages/bookmarks.astro (edit)

**Before:**
```
  .bookmark-desc {
    font-size: 0.875rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 0.375rem;
  }
```

**After:**
```

```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/notion.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "notion",
	"url": "https://www.notion.com/",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/kitty.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "kitty",
	"url": "https://sw.kovidgoyal.net/kitty/",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/zoxide.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "zoxide",
	"url": "https://github.com/ajeetdsouza/zoxide",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/bat.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "bat",
	"url": "https://github.com/sharkdp/bat",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/oh-my-zsh.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "oh my zsh",
	"url": "https://ohmyz.sh/",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/eza.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "eza",
	"url": "https://github.com/eza-community/eza",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/yazi.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "yazi",
	"url": "https://github.com/sxyazi/yazi",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/zsh-vi-mode.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "zsh-vi-mode",
	"url": "https://github.com/jeffreytse/zsh-vi-mode",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/elysia.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "elysia",
	"url": "https://elysiajs.com/tutorial/",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/awwwards.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "awwwards",
	"url": "https://www.awwwards.com/",
	"category": "design",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/dribbble.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "dribbble",
	"url": "https://dribbble.com/",
	"category": "design",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/mobbin.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "mobbin",
	"url": "https://mobbin.com/",
	"category": "design",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/lucide-animated.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "lucide animated",
	"url": "https://lucide-animated.com/",
	"category": "design",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/reactbits.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "reactbits",
	"url": "https://reactbits.dev/",
	"category": "design",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/google-translate-crashing-react.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "everything about google translate crashing react",
	"url": "https://martijnhols.nl/blog/everything-about-google-translate-crashing-react",
	"category": "articles",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/ai-sdk-human-in-the-loop.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "ai sdk — human in the loop",
	"url": "https://ai-sdk.dev/cookbook/next/human-in-the-loop",
	"category": "articles",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/symbol-iterator-is-pretty-neat.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "symbol.iterator is pretty neat actually",
	"url": "https://kettanaito.com/blog/symbol-iterator-is-pretty-neat-actually",
	"category": "articles",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/type-puzzles.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "type puzzles",
	"url": "https://types.kitlangton.com/",
	"category": "tools",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/content/bookmarks/effect-institute.json

```
{
	"$schema": "../../../.astro/collections/bookmarks.schema.json",
	"title": "effect institute",
	"url": "https://www.effect.institute/chapters",
	"category": "articles",
	"date": "2026-05-11T00:00:00.000Z"
}
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/bookmarks.astro (edit)

**Before:**
```
    <div class="bookmark-list" id="bookmark-list">
      {bookmarks.map((entry) => (
        <a
          href={entry.data.url}
          target="_blank"
          rel="noopener noreferrer"
          data-category={entry.data.category}
          class="bookmark-item"
        >
          <div class="bookmark-top">
            <span class="bookmark-title">{entry.data.title}</span>
            <span class="bookmark-category">{entry.data.category}</span>
          </div>
          <span class="bookmark-url">{new URL(entry.data.url).hostname}</span>
        </a>
      ))}
    </div>
```

**After:**
```
    <div class="bookmark-list" id="bookmark-list">
      {bookmarks.map((entry) => (
        <a
          href={entry.data.url}
          target="_blank"
          rel="noopener noreferrer"
          data-category={entry.data.category}
          class="bookmark-item"
        >
          <span class="bookmark-title">{entry.data.title}</span>
          <span class="bookmark-meta">
            <span class="bookmark-url">{new URL(entry.data.url).hostname}</span>
            <span class="bookmark-category">{entry.data.category}</span>
          </span>
        </a>
      ))}
    </div>
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/bookmarks.astro (edit)

**Before:**
```
  /* Bookmark list */
  .bookmark-list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border);
  }

  .bookmark-item {
    display: block;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    transition: opacity 0.15s;
  }

  .bookmark-item:hover {
    opacity: 0.75;
  }

  .bookmark-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.375rem;
  }

  .bookmark-title {
    font-weight: 500;
    color: var(--foreground);
  }

  .bookmark-category {
    font-size: 0.75rem;
    color: var(--accent);
    flex-shrink: 0;
  }

  .bookmark-url {
    font-size: 0.75rem;
    color: var(--border);
  }
```

**After:**
```
  /* Bookmark list */
  .bookmark-list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border);
  }

  .bookmark-item {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    transition: color 0.15s;
  }

  .bookmark-item:hover .bookmark-title {
    color: var(--accent);
  }

  .bookmark-title {
    font-weight: 500;
    color: var(--foreground);
    font-size: 0.875rem;
  }

  .bookmark-meta {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    flex-shrink: 0;
  }

  .bookmark-category {
    font-size: 0.75rem;
    color: var(--accent);
  }

  .bookmark-url {
    font-size: 0.75rem;
    color: var(--muted);
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/eza-alias.md

```
---
title: eza alias
language: bash
date: 2026-05-11
---

```bash
alias ls="eza --color=always --long --git --icons=always --no-time --no-user"
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/remove-input-focus.md

```
---
title: remove input focus
language: css
date: 2026-05-11
---

```css
focus-visible:outline-none
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/generate-random-hash.md

```
---
title: generate 16 character random hash
language: bash
date: 2026-05-11
---

```bash
openssl rand -hex 16
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/generate-rsa-key.md

```
---
title: generate rsa key
language: bash
date: 2026-05-11
---

```bash
ssh-keygen -t rsa
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/find-the-process.md

```
---
title: find the process
language: bash
date: 2026-05-11
---

```bash
lsof -i tcp:3000
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/remove-all-files-from-git-tracking.md

```
---
title: remove all files from git tracking
language: bash
date: 2026-05-11
---

```bash
git rm -r --cached .
```
```

---

## File: /Users/cypher007/projects/portfolio/src/content/snippets/omit-in-union.md

```
---
title: omit in union
language: typescript
date: 2026-05-11
---

```typescript
// Source - https://stackoverflow.com/a/57103940
// Posted by jcalz, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-26, License - CC BY-SA 4.0

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
```
```

---

## File: /Users/cypher007/projects/portfolio/.claude/commands/add-gallery-image.md

```
---
description: Process new images from the gallery inbox — auto-tag, rename, and register them
---

# Add Gallery Image

Process any new images sitting in `src/assets/gallery/_inbox/`.

## Steps

1. **Check the inbox:** List all image files in `src/assets/gallery/_inbox/`. If empty, tell the user there's nothing to process and stop.

2. **For each image:**

   a. **View the image** using the Read tool to understand what's in it.

   b. **Pick tags** from the existing set used in `galleryMeta` in `src/pages/gallery.astro`. The current tags are: `nature`, `landscape`, `forest`, `urban`, `night`. You may suggest a new tag only if none of the existing ones fit — but prefer reusing existing tags. Pick 1-3 tags per image.

   c. **Generate a filename** — a short, descriptive kebab-case name based on what you see in the image (e.g. `sunset-over-lake.jpg`, `rainy-street.jpg`). Keep it to 2-4 words max. Preserve the original file extension.

   d. **Move the file** from `_inbox/` to `src/assets/gallery/` with the new filename.

   e. **Update `galleryMeta`** in `src/pages/gallery.astro` — add an entry for the new filename with the chosen tags.

3. **Show a summary** of what was processed: original filename → new filename, assigned tags.

## Rules

- Always look at the image before tagging — don't guess from the filename alone.
- Keep filenames lowercase, kebab-case, no special characters.
- If a file with the generated name already exists, append a number (e.g. `forest-path-2.jpg`).
- Don't modify any existing entries in `galleryMeta`.
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
const galleryMeta: Record<string, { tags: string[] }> = {
  'mountains.jpg':   { tags: ['nature', 'landscape'] },
  'forest.jpg':      { tags: ['nature', 'forest'] },
  'city-lights.jpg': { tags: ['urban', 'night'] },
  'forest-path.jpg': { tags: ['nature', 'forest'] },
  'foggy-hills.jpg': { tags: ['nature', 'landscape'] },
  'coastal.jpg':     { tags: ['nature', 'landscape'] },
  'desert.jpg':      { tags: ['nature', 'landscape'] },
};

const images = Object.entries(imageFiles).map(([path, mod]) => {
  const filename = path.split('/').pop()!;
  const meta = galleryMeta[filename] ?? { tags: [] };
  return { src: mod.default, tags: meta.tags };
});
```

**After:**
```
const images = Object.entries(imageFiles).map(([path, mod]) => {
  const filename = path.split('/').pop()!;
  const tags = filename.replace(/\.[^.]+$/, '').split('-');
  return { src: mod.default, tags };
});
```

---

## File: /Users/cypher007/projects/portfolio/.claude/commands/add-gallery-image.md (edit)

**Before:**
```
   b. **Pick tags** from the existing set used in `galleryMeta` in `src/pages/gallery.astro`. The current tags are: `nature`, `landscape`, `forest`, `urban`, `night`. You may suggest a new tag only if none of the existing ones fit — but prefer reusing existing tags. Pick 1-3 tags per image.

   c. **Generate a filename** — a short, descriptive kebab-case name based on what you see in the image (e.g. `sunset-over-lake.jpg`, `rainy-street.jpg`). Keep it to 2-4 words max. Preserve the original file extension.

   d. **Move the file** from `_inbox/` to `src/assets/gallery/` with the new filename.

   e. **Update `galleryMeta`** in `src/pages/gallery.astro` — add an entry for the new filename with the chosen tags.
```

**After:**
```
   b. **Pick tags** based on what you see in the image. Check existing filenames in `src/assets/gallery/` to reuse consistent tag words where possible. Common tags: `nature`, `landscape`, `forest`, `urban`, `night`, `coastal`, `desert`. You may introduce new tags if needed. Pick 2-4 tags per image.

   c. **Generate a filename** — the filename IS the tags, joined by `-`. For example: `nature-landscape-foggy.jpg`, `urban-night-street.jpg`. Preserve the original file extension.

   d. **Move the file** from `_inbox/` to `src/assets/gallery/` with the new filename.
```

---

## File: /Users/cypher007/projects/portfolio/.claude/commands/add-gallery-image.md (edit)

**Before:**
```
3. **Show a summary** of what was processed: original filename → new filename, assigned tags.

## Rules

- Always look at the image before tagging — don't guess from the filename alone.
- Keep filenames lowercase, kebab-case, no special characters.
- If a file with the generated name already exists, append a number (e.g. `forest-path-2.jpg`).
- Don't modify any existing entries in `galleryMeta`.
```

**After:**
```
3. **Show a summary** of what was processed: original filename → new filename (tags).

## Rules

- Always look at the image before tagging — don't guess from the original filename.
- Filenames are lowercase, kebab-case, no special characters — each segment is a tag.
- If a file with the generated name already exists, append a number (e.g. `nature-forest-2.jpg`).
- Tags are derived from filenames at build time (`filename.split('-')`) — no manual registry needed.
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .masonry-item img {
    width: 100%;
    display: block;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

**After:**
```
  .masonry-item img {
    width: 100%;
    max-height: 28rem;
    display: block;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
const images = Object.entries(imageFiles).map(([path, mod]) => {
  const filename = path.split('/').pop()!;
  const tags = filename.replace(/\.[^.]+$/, '').split('-');
  return { src: mod.default, tags };
});

const allTags = ['all', ...Array.from(new Set(images.flatMap((i) => i.tags))).sort()];
```

**After:**
```
const fixedTags = ['nature', 'urban', 'abstract', 'misc'] as const;

const images = Object.entries(imageFiles).map(([path, mod]) => {
  const filename = path.split('/').pop()!;
  const parts = filename.replace(/\.[^.]+$/, '').split('-');
  const tags = parts.filter((p) => (fixedTags as readonly string[]).includes(p));
  return { src: mod.default, tags: tags.length > 0 ? tags : ['misc'] };
});

const allTags = ['all', ...fixedTags];
```

---

## File: /Users/cypher007/projects/portfolio/.claude/commands/add-gallery-image.md (edit)

**Before:**
```
   b. **Pick tags** based on what you see in the image. Check existing filenames in `src/assets/gallery/` to reuse consistent tag words where possible. Common tags: `nature`, `landscape`, `forest`, `urban`, `night`, `coastal`, `desert`. You may introduce new tags if needed. Pick 2-4 tags per image.
```

**After:**
```
   b. **Pick tags** from the fixed set: `nature`, `urban`, `abstract`, `misc`. Pick 1-2 tags per image. Only use tags from this set — do not invent new ones.
```

---

## File: /Users/cypher007/projects/portfolio/.claude/commands/add-gallery-image.md (edit)

**Before:**
```
   c. **Generate a filename** — the filename IS the tags, joined by `-`. For example: `nature-landscape-foggy.jpg`, `urban-night-street.jpg`. Preserve the original file extension.
```

**After:**
```
   c. **Generate a filename** — start with the tag(s), then add a short descriptor to make it unique. For example: `nature-foggy-hills.jpg`, `urban-street-rain.jpg`, `abstract-spheres.jpg`. Preserve the original file extension.
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .gallery-main {
    max-width: 48rem;
    margin: 0 auto;
    padding: 6rem 1.5rem 6rem;
  }
```

**After:**
```
  .gallery-main {
    max-width: 72rem;
    margin: 0 auto;
    padding: 6rem 1.5rem 6rem;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .masonry-item img {
    width: 100%;
    max-height: 28rem;
    display: block;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

**After:**
```
  .masonry-item img {
    width: 100%;
    display: block;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .gallery-header {
    margin-bottom: 2.5rem;
  }
```

**After:**
```
  .gallery-header {
    max-width: 48rem;
    margin-bottom: 2.5rem;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  /* Filters */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
  }
```

**After:**
```
  /* Filters */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    max-width: 48rem;
    margin-bottom: 2rem;
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .gallery-main {
    max-width: 72rem;
    margin: 0 auto;
    padding: 6rem 1.5rem 6rem;
  }
```

**After:**
```
  .gallery-main {
    max-width: 48rem;
    margin: 0 auto;
    padding: 6rem 1.5rem 6rem;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .gallery-header {
    max-width: 48rem;
    margin-bottom: 2.5rem;
  }
```

**After:**
```
  .gallery-header {
    margin-bottom: 2.5rem;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  /* Filters */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    max-width: 48rem;
    margin-bottom: 2rem;
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
  }
```

**After:**
```
  /* Filters */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-top: 1px solid var(--border);
    padding-top: 1.5rem;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  /* Masonry */
  .masonry {
    columns: 3;
    column-gap: 0.75rem;
  }
```

**After:**
```
  /* Masonry */
  .masonry {
    columns: 3;
    column-gap: 0.75rem;
    max-width: 72rem;
    margin-left: 50%;
    transform: translateX(-50%);
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  /* Masonry */
  .masonry {
    columns: 3;
    column-gap: 0.75rem;
    max-width: 72rem;
    margin-left: 50%;
    transform: translateX(-50%);
  }
```

**After:**
```
  /* Masonry */
  .masonry {
    columns: 3;
    column-gap: 0.75rem;
    width: 90vw;
    max-width: 72rem;
    margin-left: calc(50% - 45vw);
  }

  @media (min-width: 72rem) {
    .masonry {
      margin-left: calc(50% - 36rem);
    }
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .masonry-item img {
    width: 100%;
    display: block;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

**After:**
```
  .masonry-item img {
    width: 100%;
    display: block;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .masonry-item {
    break-inside: avoid;
    margin-bottom: 0.75rem;
  }

  .masonry-item img {
    width: 100%;
    display: block;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

**After:**
```
  .masonry-item {
    break-inside: avoid;
    margin-bottom: 0.75rem;
    overflow: hidden;
  }

  .masonry-item img {
    width: 100%;
    max-height: 24rem;
    display: block;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .masonry-item img {
    width: 100%;
    max-height: 24rem;
    display: block;
    object-fit: cover;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

**After:**
```
  .masonry-item img {
    width: 100%;
    display: block;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  /* Masonry */
  .masonry {
    columns: 3;
    column-gap: 0.75rem;
    width: 90vw;
    max-width: 72rem;
    margin-left: calc(50% - 45vw);
  }

  @media (min-width: 72rem) {
    .masonry {
      margin-left: calc(50% - 36rem);
    }
  }
```

**After:**
```
  /* Masonry */
  .masonry {
    columns: 4;
    column-gap: 0.5rem;
    width: 90vw;
    max-width: 72rem;
    margin-left: calc(50% - 45vw);
  }

  @media (min-width: 72rem) {
    .masonry {
      margin-left: calc(50% - 36rem);
    }
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .masonry-item {
    break-inside: avoid;
    margin-bottom: 0.75rem;
    overflow: hidden;
  }
```

**After:**
```
  .masonry-item {
    break-inside: avoid;
    margin-bottom: 0.5rem;
    overflow: hidden;
    border-radius: 4px;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .masonry-item img {
    width: 100%;
    display: block;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

**After:**
```
  .masonry-item img {
    width: 100%;
    height: auto;
    display: block;
    filter: grayscale(20%);
    transition: filter 0.2s, opacity 0.2s;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  </main>
</Layout>
```

**After:**
```
  </main>

  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightbox-close" aria-label="Close">&times;</button>
    <img class="lightbox-img" id="lightbox-img" alt="" />
  </div>
</Layout>
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .masonry-item.hidden {
    display: none;
  }
```

**After:**
```
  .masonry-item {
    cursor: pointer;
  }

  .masonry-item.hidden {
    display: none;
  }

  /* Lightbox */
  .lightbox {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 100;
    background: oklch(0% 0 0 / 0.9);
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .lightbox.active {
    display: flex;
  }

  .lightbox-img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 4px;
  }

  .lightbox-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    color: var(--foreground);
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.15s;
    line-height: 1;
  }

  .lightbox-close:hover {
    opacity: 1;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  const btns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const items = document.querySelectorAll<HTMLElement>('.masonry-item');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.removeAttribute('data-active'));
      btn.setAttribute('data-active', 'true');

      const tag = btn.dataset.tag!;
      items.forEach((item) => {
        const tags = item.dataset.tags?.split(',') ?? [];
        if (tag === 'all' || tags.includes(tag)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
```

**After:**
```
  const btns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const items = document.querySelectorAll<HTMLElement>('.masonry-item');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.removeAttribute('data-active'));
      btn.setAttribute('data-active', 'true');

      const tag = btn.dataset.tag!;
      items.forEach((item) => {
        const tags = item.dataset.tags?.split(',') ?? [];
        if (tag === 'all' || tags.includes(tag)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox')!;
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const lightboxClose = document.getElementById('lightbox-close')!;

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
    background: oklch(0% 0 0 / 0.9);
```

**After:**
```
    background: oklch(0% 0 0 / 0.95);
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightbox-close" aria-label="Close">&times;</button>
    <img class="lightbox-img" id="lightbox-img" alt="" />
  </div>
```

**After:**
```
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Previous">&lsaquo;</button>
    <img class="lightbox-img" id="lightbox-img" alt="" />
    <button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Next">&rsaquo;</button>
  </div>
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  .lightbox-close:hover {
    opacity: 1;
  }
```

**After:**
```
  .lightbox-close:hover {
    opacity: 1;
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    color: var(--foreground);
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.15s;
    line-height: 1;
    padding: 1rem;
  }

  .lightbox-nav:hover {
    opacity: 1;
  }

  .lightbox-prev {
    left: 1rem;
  }

  .lightbox-next {
    right: 1rem;
  }
```

---

## File: /Users/cypher007/projects/portfolio/src/pages/gallery.astro (edit)

**Before:**
```
  // Lightbox
  const lightbox = document.getElementById('lightbox')!;
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const lightboxClose = document.getElementById('lightbox-close')!;

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
```

**After:**
```
  // Lightbox
  const lightbox = document.getElementById('lightbox')!;
  const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const lightboxClose = document.getElementById('lightbox-close')!;
  const lightboxPrev = document.getElementById('lightbox-prev')!;
  const lightboxNext = document.getElementById('lightbox-next')!;

  let currentIndex = 0;

  function getVisibleItems() {
    return Array.from(items).filter((item) => !item.classList.contains('hidden'));
  }

  function showImage(index: number) {
    const visible = getVisibleItems();
    currentIndex = (index + visible.length) % visible.length;
    const img = visible[currentIndex]?.querySelector('img');
    if (img) lightboxImg.src = img.src;
  }

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const visible = getVisibleItems();
      currentIndex = visible.indexOf(item);
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
  lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
```

---
