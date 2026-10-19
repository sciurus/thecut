# Verification

Completed against the production Vite build on 2026-10-19.

- `corepack pnpm@10.18.3 test`: **28 passed**, five files.
- `corepack pnpm@10.18.3 lint`: **passed**.
- `corepack pnpm@10.18.3 build`: **passed**, TypeScript strict check and Vite production output.
- `corepack pnpm@10.18.3 test:e2e`: **7 passed** in Chromium. This command rebuilds before testing.

Browser coverage includes 320, 375, 768 and 1440px layouts, loaded illustrations, no horizontal overflow, completed quiz and saved-result recovery, selected alternative persistence, reset, keyboard focus, reduced motion, touch emulation, the no-false-growth path, and no third-party runtime requests. Axe found no automated WCAG A/AA violations on landing, quiz and result screens. Screenshots are emitted to `test-results/` and are ignored by git.

Unit/component coverage includes all 80 core-input combinations with neutral followups, deterministic ranking, yes/no/unsure growth behavior, natural-texture eligibility and emphasis, wash-and-go preference, diverse alternatives, all 38 catalog records, pruning descendants after edits, barber copy, malformed/versioned/inaccessible localStorage, navigation, selected state, reset, and SVG fallback behavior after image failure.

During verification, initial heading focus under React StrictMode and inactive stage-label contrast were corrected. The slick-back art was regenerated for correct backward flow. Raw generated question montages were replaced with deliberately ordered, labelled diagrams using the generated portraits.

Remaining human review: a barber/editor should approve all cut terminology, texture-fit and coarse length metadata, and illustration silhouettes. Chromium testing and automated accessibility scans do not replace checking other browser engines or assistive technology manually. No cold-start offline service worker is included; the app ships all resources locally and makes no third-party requests.
