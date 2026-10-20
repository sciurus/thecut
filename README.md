# The Cut — Boys’ Haircut Finder

A complete React + TypeScript frontend based on `boys-hairstyle-quiz-codex-plan.md`. An adaptive quiz recommends one haircut and up to three diverse alternatives from 38 authored styles. Includes natural-texture suitability, length and growth handling, daily effort preferences, cut-specific barber instructions, back/edit navigation, alternative selection, and validated versioned localStorage recovery. No backend, login, personal information, photo upload, analytics, remote fonts, or runtime AI/API requests.

## Browse hairstyles

The landing page also opens a gallery of all 38 styles, with name search and texture, finished-length, and styling-effort filters. Styles are sorted by length and then name. Texture filtering includes ideal and adaptable fits and excludes unsuitable styles.

Each style has a detail page with suitability information and copyable barber instructions that can be tailored to texture and supported sides. Browsing preserves quiz progress. Gallery filters and hairstyle pages use shareable hash URLs (for example `#/browse?texture=curly` and `#/hairstyles/french-crop`) that work on static hosting without server rewrites. Returning to the gallery restores filters and scroll position within the current session.

## Run

Node 22 and pnpm 10.18.3. npm is not installed in the implementation environment, so the repository uses pnpm and its lockfile.

```sh
corepack pnpm@10.18.3 install
corepack pnpm@10.18.3 dev
corepack pnpm@10.18.3 test
corepack pnpm@10.18.3 lint
corepack pnpm@10.18.3 build
corepack pnpm@10.18.3 exec playwright install --with-deps chromium
corepack pnpm@10.18.3 test:e2e
```

Equivalent npm scripts work if npm is available (`npm run dev`, `npm test`, `npm run lint`, `npm run build`); use pnpm to preserve the committed dependency resolution. Deploy the generated `dist/` directory to any static HTTP host. Relative asset paths support subdirectory deployment. No application server is required. The site has no external runtime dependencies; opening an already downloaded app requires no third-party network. A service worker for cold-load offline caching is outside this version.

## Architecture

- `src/data/questions.ts`: eight structured questions and short answer copy.
- `src/data/haircuts.ts`: all 38 styles, explicit texture suitability, length, effort, supported side/front treatments, families, and editorial copy.
- `src/lib/recommendation.ts`: pure deterministic eligibility, transparent weighted scoring, feasibility, tie-breaks and alternative diversity.
- `src/lib/quizFlow.ts`: adaptive question selection and reachable-path replay. Editing clears descendants so stale preferences cannot affect results.
- `src/lib/persistence.ts`: schema validation, graceful storage failure, reload recovery and clear/reset.
- `src/data/assetManifest.ts`: local generated artwork and local SVG fallback references.

The sequence collects length, texture and preferred length, immediately asks growth willingness when necessary, then styling effort. Useful preference questions distinguish the top candidate pool using metadata entropy. Paths use at least five answers, normally at most eight, and stop when a five-point lead or lack of useful distinctions makes another question unnecessary. `notSure` is neutral. Growth uncertainty always favors an achievable primary. See [design decisions](docs/design-decisions.md) for weights, tie rules and tradeoffs.

## Artwork

All 47 illustration IDs (hero, eight questions, 38 cuts) have functioning, distinct local SVG fallbacks. AI artwork is generated with the built-in imagegen tool during development, never from the browser. Generated PNG originals are optimized to local WebP, with exact provenance/status in [the asset report](docs/asset-report.md). The shared character reference is `artwork/originals/textured-crop.png` (the shipped version is `public/illustrations/textured-crop.webp`). Prompts for every illustration are in [illustration-prompts.md](docs/illustration-prompts.md). `corepack pnpm@10.18.3 art:optimize` refreshes optimized sources, the generated asset map and labelled question diagrams. The question diagrams compose the generated portraits in a deliberate order; the original AI question montages were rejected during review for unclear comparisons. The fallback generator is `python3 scripts/create-fallbacks.py`; it does not overwrite generated raster art.

## Verification and release review

Unit/component checks cover all 38 catalog records, growth answers, four textures, no styling, deterministic/diverse recommendations, barber copy, all 80 core input combinations with neutral followups, descendant pruning, malformed/inaccessible persistence, keyboard interaction and the complete React flow. Browser checks cover 320, 375, 768 and 1440px widths, image loading, no horizontal overflow, reloads, alternative selection, reset, focus, reduced motion and absence of third-party requests. Screenshots are written under `test-results/`.

Barber/editor review is still required before public release: texture fit and minimum-length buckets are editorial heuristics; generated hairstyle silhouettes and side treatments need professional approval. Twists are an additional styling service, and 360 waves require brushing/styling. No growth timeline or exact guard measurement is promised. See [catalog audit](docs/catalog-audit.md).

Final verification: **31 unit/component tests and 12 production browser tests passed; lint and production build passed.** Browser checks include touch emulation and automated WCAG A/AA scans. See [verification details](docs/verification.md).

## GitHub Pages deployment

The site is published at https://sciurus.github.io/thecut/ by `.github/workflows/deploy.yml`. Every push to `main` (or manual workflow dispatch) installs the locked dependencies, runs lint, unit/component tests and Chromium acceptance/accessibility checks, then uploads `dist/` and deploys it to the `github-pages` environment. The build job uses Node 22 and pnpm 10.18.3. Deployment uses the built-in GitHub token with Pages and OIDC permissions; no custom secrets are needed. Repository **Settings → Pages → Source** must be **GitHub Actions**. The existing relative Vite base supports the repository subdirectory.
