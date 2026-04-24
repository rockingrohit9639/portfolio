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

## File: /Users/cypher007/projects/portfolio/src/layouts/Layout.astro

```
---
import '../styles/global.css'
---

<!doctype html>
<html lang="en" class="h-full">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<link rel="icon" href="/favicon.ico" />
		<meta name="generator" content={Astro.generator} />
		<title>Astro Basics</title>
	</head>
	<body class="m-0 w-full h-full">
		<slot />
	</body>
</html>
```

---

## File: /Users/cypher007/projects/portfolio/src/components/Welcome.astro

```
---
import astroLogo from '../assets/astro.svg';
import background from '../assets/background.svg';
---

<div class="font-[Inter,Roboto,'Helvetica_Neue','Arial_Nova','Nimbus_Sans',Arial,sans-serif] h-full flex flex-col md:block">
	<img src={background.src} alt="" fetchpriority="high" class="fixed top-0 left-0 w-full h-full -z-10 blur-[100px]" />
	<main class="h-full flex justify-center">
		<section class="flex items-start flex-col justify-center p-4 md:pt-0 pt-[10%]">
			<a href="https://astro.build"
				><img src={astroLogo.src} width="115" height="48" alt="Astro Homepage" /></a
			>
			<h1 class="text-[22px] mt-1 md:leading-normal leading-relaxed">
				To get started, open the <code class="inline-block bg-[linear-gradient(66.77deg,#f3cddd_0%,#f5cee7_100%)] [background-clip:padding-box] border border-transparent rounded-lg px-2 py-1.5" style="background: linear-gradient(66.77deg, #f3cddd 0%, #f5cee7 100%) padding-box, linear-gradient(155deg, #d83333 0%, #f041ff 18%, #f5cee7 45%) border-box;"><pre class="font-mono font-normal m-0 bg-[linear-gradient(14deg,#d83333_0%,#f041ff_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [-webkit-background-clip:text]">src/pages</pre></code> directory in your project.
			</h1>
			<section class="flex gap-4 flex-wrap">
				<a class="flex items-center px-3 py-2.5 text-white no-underline rounded-[10px] transition-colors hover:text-[rgb(230,230,230)] [background:linear-gradient(83.21deg,#3245ff_0%,#bc52ee_100%)] [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.12),inset_0_-2px_0_rgba(0,0,0,0.24)] hover:[box-shadow:none] md:px-3 md:py-2.5 px-[18px] py-3.5" href="https://docs.astro.build">Read our docs</a>
				<a class="flex items-center px-3 py-2.5 text-[#111827] no-underline transition-colors hover:text-[rgb(78,80,86)]" href="https://astro.build/chat"
					>Join our Discord <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" class="h-[1em] ml-2"
						><path
							fill="currentColor"
							d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z"
						></path></svg
					>
				</a>
			</section>
		</section>
	</main>

	<a href="https://astro.build/blog/astro-6-beta/" class="absolute bottom-4 right-4 max-w-[300px] no-underline transition-colors backdrop-blur-[50px] p-4 bg-white rounded-2xl border border-white hover:bg-white/55 max-[768px]:right-4 max-[768px]:left-4 max-[768px]:bottom-10 max-[768px]:max-w-full max-[368px]:hidden">
		<svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"
			><path
				d="M24.667 12c1.333 1.414 2 3.192 2 5.334 0 4.62-4.934 5.7-7.334 12C18.444 28.567 18 27.456 18 26c0-4.642 6.667-7.053 6.667-14Zm-5.334-5.333c1.6 1.65 2.4 3.43 2.4 5.333 0 6.602-8.06 7.59-6.4 17.334C13.111 27.787 12 25.564 12 22.666c0-4.434 7.333-8 7.333-16Zm-6-5.333C15.111 3.555 16 5.556 16 7.333c0 8.333-11.333 10.962-5.333 22-3.488-.774-6-4-6-8 0-8.667 8.666-10 8.666-20Z"
				fill="#111827"></path></svg
		>
		<h2 class="mt-0 mb-4 font-normal text-[#111827] text-xl">What's New in Astro 6.0?</h2>
		<p class="text-[#4b5563] text-base leading-6 tracking-[-0.006em] m-0">
			Redesigned dev server, fonts, live collections, built-in CSP support, and more! Click to
			explore Astro 6.0's new features.
		</p>
	</a>
</div>
```

---
