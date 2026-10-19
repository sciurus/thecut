# Codex Implementation Plan — Boys' Haircut Finder

## 0. Instructions to Codex

Implement the application described here, not merely a prototype or mockup. Inspect the repository first and respect any existing code and package manager; if the repository is empty, scaffold a React + TypeScript + Vite application. Make reasonable implementation choices without requesting further product decisions. Work in milestones, run tests and a production build, and report what is complete, especially whether final AI-generated illustration assets were available or whether the fallback art was used.

**Definition of done:** A fully functional, polished, mobile-first, frontend-only haircut recommendation quiz, with curated branching, deterministic recommendation logic, approximately 38 hairstyles, illustrative imagery at every step, result and alternative haircut cards, useful barber instructions, back/edit navigation, and versioned local persistence. It must run with no backend, login, runtime AI request, or runtime third-party API.

## 1. Product vision and locked decisions

**Audience:** Boys approximately 6–16 years old, using the application together with a parent. Use approachable language that does not feel babyish to teenagers.

**Core experience:** A primarily preference-driven branching quiz. Collect only enough practical information to avoid obviously inappropriate or currently unachievable recommendations. Aim for **5–8 questions on typical paths**, but adapt the path rather than imposing a fixed question count. End with **one primary recommendation and 2–3 alternatives**. Show the haircut's commonly recognized name, a large illustration, and a short, specific script the family can give a barber.

Locked product choices:
- Hybrid quiz: curated branching sequence + rules-based haircut filtering and scoring.
- Practical inputs: **current hair length** and **natural hair texture** only; do not ask about density, face shape, hairline, cowlicks, ethnicity, or gender identity.
- One simple daily styling-effort question.
- Texture: naturally suitable cuts first; adaptations are acceptable, but never suggest that a person must change their natural texture to achieve a style.
- Current length: allow aspirational styles, explicitly explain any need to grow hair. If preferred length conflicts with current length, ask whether the user is willing to grow it out.
- Catalog: **approximately 30–40 commonly recognized styles**, balancing classics, trends, and naturally textured cuts.
- Variations: recognizable styles are separate entries; fade height, taper, and similar details are attributes, not dozens of duplicate styles.
- Question presentation: a sizable **illustration for every question**, with **simple text-based answers** in large buttons. Do not make the user identify complex visual differences from tiny thumbnails.
- Artwork: simple **vector-style illustrated** images, ideally generated with an image tool during implementation. Use a **consistent illustrated boy** across the app so hairstyles are easily comparable; change the hair shape/texture as needed. Store art as static local files.
- Visual theme: contemporary **barbershop-inspired**, not a childish game and not a photo gallery.
- Mobile-first responsive layout; tablets and desktop supported.
- Back navigation lets the family revise answers and immediately recompute results; selected alternative can become the displayed result. No expansive browsing feature required.
- Store current quiz and latest result locally in `localStorage`; provide Start over / clear.
- Result deliberately simple: name, illustration, barber instructions, plus alternatives. **Do not** build a maintenance encyclopedia, print workflow, PDF export, accounts, photo upload, camera/face analysis, product commerce, or social sharing in v1.

## 2. Success criteria and primary journey

1. On landing screen, family sees: **Find your next haircut** / **Pick what you like. We'll suggest a cut and what to tell the barber.** A prominent **Find my haircut** button begins.
2. Ask a short sequence about the child's hair and preferences. Parent may help with the natural-texture and length answers.
3. Ask additional discriminating questions only if they would help separate plausible cuts. Ask about willingness to grow hair when the desired length exceeds current length, or before recommending a specific longer cut that would otherwise win despite the stated length.
4. Show the best recommendation and 2–3 meaningfully different alternatives. Names must be recognizable and barber instructions must describe actual distinguishing features, not generic filler.
5. User can select an alternative, go back to change an answer, or start over.
6. Reloading returns to the same questionnaire position/results and preserves answers unless storage has been cleared or the schema is incompatible.

**Copy:** Keep all quiz choices short and child-readable. Avoid claims like “this will definitely look good on you,” “your hair type cannot wear this,” or instructions that imply a cut is impossible solely due to texture.

## 3. Information architecture / screens

### Landing
- Large title, short explanation, single hero illustration, primary start button.
- Small reassurance: **No photo or account needed.**
- Do not ask for age, name, email, location, or any personal identifier.

### Quiz
- One question per screen, with question headline, one supporting illustration, optional single-sentence helper text, and 2–5 large text answer buttons.
- Visually mark the selected answer when revisiting a step.
- Back button always available after first question; Start over accessible but not overemphasized.
- Use **stage labels** such as “Your hair” / “Your style” rather than `Question 4 of 8`, because question count is adaptive.
- Keyboard operable, touch friendly, focus managed when advancing/backing, errors and selected state announced accessibly.

### Results
- Primary result name, prominent illustration, short one-line descriptor.
- If growth is required, show explicit copy similar to: **You'll need to grow the top longer before this cut is possible.** Do not invent a growth timeline.
- **What to tell the barber:** short, natural, copyable paragraph, e.g., “I'd like a textured crop. Keep the top short with a choppy, forward fringe, and blend the sides into a low taper. Please keep the finish natural, not slicked down.”
- 2–3 alternatives with thumbnail, name, short descriptor; tapping an alternative displays its full instructions.
- Back to answers, Start over. No download or print requirement.
- Include a small non-alarmist note: “Your barber can adjust the cut to your hair and current length.”

## 4. Question bank and branching rules

Represent questions as structured objects keyed by stable IDs, not JSX conditionals scattered across components. All questions have `id`, `stage`, `title`, `helpText?`, `imageAssetId`, and `options` (`value`, `label`, `description?`). The engine computes the next question based on prior answers, suitability scores, and discrimination among top candidates.

| ID | When asked | Question shown to child/parent | Answer values |
| --- | --- | --- | --- |
| `currentLength` | Always, #1 | **How long is your hair right now?** | `buzzed`, `short`, `medium`, `long` |
| `texture` | Always, #2 | **Which looks most like your natural hair?** | `straight`, `wavy`, `curly`, `coily` |
| `preferredLength` | Always, #3 | **How long would you like your next haircut to be?** | `veryShort`, `short`, `medium`, `long`, `notSure` |
| `willingToGrow` | Conditional after preferred length | **That look needs longer hair. Would you be happy to grow it out?** | `yes`, `no`, `notSure` |
| `stylingEffort` | Always | **How much time do you want to spend on your hair?** | `none`, `aLittle`, `happyToStyle` |
| `overallLook` | Usually after core inputs; omit if not helpful | **Which sounds most like your style?** | `neatClassic`, `relaxedTextured`, `bold`, `notSure` |
| `sidesPreference` | When candidate separation is useful | **What do you like on the sides?** | `naturalFuller`, `tapered`, `fadedShort`, `notSure` |
| `frontPreference` | When candidate separation is useful | **What about the hair at the front?** | `forwardFringe`, `upOrBack`, `parted`, `notSure` |

Option helper descriptions (short, displayed as needed):
- Current length is a **rough visual category of the length on top**, not a measurement of side length. Provide consistent reference art with clear length progression. Longer hair can be cut shorter immediately; shorter hair cannot be made longer immediately.
- Texture examples depict the difference between straight, wave, curl, and tight coil. Do not attach ethnicity labels.
- Styling effort: `none` = “Wash and go”; `aLittle` = “A minute or two”; `happyToStyle` = “I don't mind styling it.”
- Side descriptions: natural/full sides = mostly scissors and softer outline; tapered = gradually shorter near edges; faded = close-clipped sides blending upward. Do not force fade/skin exposure as default.
- `notSure` inputs are neutral and must not block completion.

**Sequence logic (deterministic):**
1. Collect `currentLength`, `texture`, `preferredLength` (in this order).
2. Trigger `willingToGrow` immediately after `preferredLength` if requested length is longer than current length (for non-`notSure` answers). Otherwise, before completing the quiz, trigger it only when the would-be primary cut itself needs more current hair length and other expressed preferences strongly favor that cut. Do not ask when the user has enough length or when all leading recommendations are achievable now.
3. Collect `stylingEffort`.
4. Evaluate candidates. Ask `overallLook` unless data already yields a strong, useful ranking. Then consider `sidesPreference` and `frontPreference` in whichever order best distinguishes the leading candidates.
5. Finish after **at least five answered questions** (including conditional growth question if asked) when the top primary is reasonably distinct and 2–3 appropriate alternatives are available. Otherwise ask the most helpful remaining preference question. Limit normal paths to eight and permit nine only for a real ambiguity edge case; do not pad with pointless questions.
6. The engine must not ask already answered questions twice during forward navigation; revisiting an answer via Back should update downstream ranking. Recompute the reachable path, invalidate descendants that are no longer relevant (especially `willingToGrow`), and ensure stale answers never influence results.
7. If fewer than three good alternatives exist, show only valid ones; do not manufacture an incompatible recommendation to fill a slot. The seed catalog should make this uncommon.

**Example paths:**
- Short, straight, wants short, low styling effort -> classic/short suggestions, skip grow-out.
- Buzzed, wants long -> immediately ask willingness to grow. **Yes:** long style may rank first, growth caveat. **No:** primary must be achievable now. **Not sure:** achievable cut first, aspirational cut may be an alternative with caveat.
- Coily, wants more volume -> genuine Afro, flat-top, or other texture-appropriate options; do not favor straight-hair reference cuts because they are more numerous.
- Medium, curly, wants a relaxed look -> curly crop/curly top or related choices, not a cut requiring straightening.

## 5. Haircut catalog and data model

Store data in a typed catalog file (e.g., `src/data/haircuts.ts`) and validate on startup or via a test suite. **Seed the following 38 named styles**, grouped here for authoring only; the app need not surface groups to users.

**Very short and classic (9):**
1. Buzz Cut
2. Butch Cut
3. Crew Cut
4. Ivy League
5. High and Tight
6. Caesar Cut
7. French Crop
8. Textured Crop
9. Short Spiky Cut

**Clean, styled, or structured (8):**
10. Classic Side Part
11. Comb Over
12. Quiff
13. Pompadour
14. Slick Back
15. Undercut
16. Faux Hawk
17. Mohawk

**Fringe, medium, and longer (11):**
18. Textured Fringe
19. Side-Swept Fringe
20. Curtains (Middle Part)
21. Mop Top
22. Bro Flow
23. Shag
24. Wolf Cut
25. Modern Mullet
26. Bowl Cut
27. Surfer Hair
28. Layered Scissor Cut

**Curly/coily and natural-texture looks (10):**
29. Curly Crop
30. Curly High Top
31. Curly Top with Taper
32. Short Afro
33. Rounded Afro
34. Tapered Afro
35. Flat Top
36. Frohawk
37. 360 Waves
38. Twist Top with Taper

This is an initial editorial candidate list, not a claim that each style is equally appropriate for every texture or length. Treat twists/waves as haircut-plus-styling results: instruction copy must not imply a clipper cut alone creates the texture or pattern. Distinguish closely related entries in both silhouette and instructions. Avoid conflating a fade variant with an entirely different named haircut.

### Suggested TypeScript model

```ts
type HairTexture = 'straight' | 'wavy' | 'curly' | 'coily';
type Length = 'buzzed' | 'short' | 'medium' | 'long';
type DesiredLength = 'veryShort' | 'short' | 'medium' | 'long';
type Compatibility = 'ideal' | 'adaptable' | 'notRecommended';
type StylingEffort = 'none' | 'aLittle' | 'happyToStyle';
type Sides = 'naturalFuller' | 'tapered' | 'fadedShort';
type Front = 'forwardFringe' | 'upOrBack' | 'parted';
type Look = 'neatClassic' | 'relaxedTextured' | 'bold';

interface Haircut {
  id: string;                 // stable, URL-safe
  name: string;               // recognizable name
  family: string;             // for alternative diversity
  description: string;        // one short, child-readable line
  imageAssetId: string;
  minCurrentLength: Length;   // minimum current TOP length to achieve now
  resultLength: DesiredLength;
  textureFit: Record<HairTexture, Compatibility>;
  stylingEffort: StylingEffort;
  sideOptions: Sides[];       // styles this cut can support
  frontOptions: Front[];
  lookTags: Look[];
  defaultSides: Sides;
  barberBase: string;         // human-authored, cut-specific text
  barberByTexture?: Partial<Record<HairTexture, string>>;
  barberBySides?: Partial<Record<Sides, string>>;
  growthNote?: string;        // if longer top needed
  sortPriority: number;       // deterministic tie-break, not popularity claim
}

interface QuizAnswers {
  currentLength?: Length;
  texture?: HairTexture;
  preferredLength?: DesiredLength | 'notSure';
  willingToGrow?: 'yes' | 'no' | 'notSure';
  stylingEffort?: StylingEffort;
  overallLook?: Look | 'notSure';
  sidesPreference?: Sides | 'notSure';
  frontPreference?: Front | 'notSure';
}
```

### Catalog authoring requirements

For **every** style, provide: stable ID, meaningful descriptor, minimum length, natural texture suitability with explicit adaptable/not-recommended values, approximate styling effort, possible sides and front treatments, simple barber instructions, illustration asset reference, and diversity family. Do not derive the whole catalog by duplicating one row with renamed titles.

- A style can be suitable for **multiple** textures and can require different wording for each. A short buzz/crew cut should not be arbitrarily blocked for curly/coily hair.
- Styles relying on visible natural curls/coils or waves should be marked not recommended for naturally straight hair **unless a reasonable, clearly explained styling adaptation exists**. Do not imply that product alone creates a different natural hair texture.
- Style-specific instructions should name silhouette (top, sides, fringe/part), treatment (taper/fade/scissor) **only if supported**, and a finish the barber can actually deliver. Avoid speculative exact clipper guard numbers or inch measurements unless genuinely necessary.
- Preserve haircut identity when merging attribute preferences: e.g., don't turn a crew cut into a disconnected undercut merely because the user likes close sides.
- Do not force every haircut to support every side option. If the preferred side treatment is incompatible, score the cut lower or omit that variant; do not write misleading instructions.
- Hair texture suitability and barber terminology should receive human review before public release. Keep editorial copy in the data layer so it can be revised without changing React components.

## 6. Recommendation engine specification

Implement a **pure, deterministic and testable** module, e.g., `src/lib/recommendation.ts`. It should expose roughly:

```ts
getRecommendations(answers: QuizAnswers, catalog: Haircut[]): Recommendation[]
getNextQuestion(answers: QuizAnswers, catalog: Haircut[]): QuestionId | null
buildBarberInstructions(haircut: Haircut, answers: QuizAnswers): string
```

A recommendation includes `haircut`, `score`, `requiresGrowth`, `reasons`, and a prepared barber script. Add `warnings` only for relevant practical qualifications.

**Feasibility first:**
- Map current length to ordered buckets `buzzed(0)`, `short(1)`, `medium(2)`, `long(3)`; map desired `veryShort(0)` to equivalent bucket. This is a coarse heuristic, **not** an inch-accurate clinical or professional assessment.
- If `minCurrentLength > currentLength`, mark `requiresGrowth=true`.
- If `willingToGrow='no'`, a growth-requiring cut **cannot be primary** and normally should not appear among alternatives; prefer feasible cuts matching other preferences.
- If `willingToGrow='yes'`, aspirational cuts remain eligible to win, with an unmistakable growth caveat on the result. If this question was never asked, prioritize immediately achievable primary cuts; do not silently assume willingness to grow.
- If willingness is `notSure`, favor immediately achievable primary; an aspirational alternative may be shown with a caveat.
- `textureFit='notRecommended'` must be excluded from primary and alternatives. `adaptable` is allowed but ranked behind similarly fitting `ideal` cuts; provide adaptation-specific wording when relevant.
- Styling effort is a substantial preference, not an absolute prohibition. Strongly down-rank high-styling cuts for a wash-and-go request.

**Transparent weighted matching** (suggested starting weights, tune via scenario tests):
- Preferred result length: +6 exact bucket, +2 adjacent, -4 more distant; neutral for `notSure`.
- Hair texture: +5 `ideal`, +1 `adaptable`, ineligible `notRecommended`.
- Requested sides: +3 if supported, 0 if no preference, -3 if unsupported.
- Front styling: +3 if supported, 0 if unknown, -3 otherwise.
- Overall look: +2 if matching tag, 0 if not known, -1 otherwise.
- Styling effort: +3 at/below requested effort, -4 if one category more demanding, -8 if two higher.
- Needs grow-out: -5 by default; when `yes`, soften or remove this penalty so a specifically requested longer style can win; when `notSure`, use a larger penalty on primary.

Do not mechanically rank based solely on number of metadata matches. Normalize as necessary for unanswered questions. Breaking ties: higher texture fit, immediate feasibility, closer styling effort, then `sortPriority`, then stable ID. **Avoid repeatedly recommending nearly identical siblings**: choose alternatives using a diversity pass (prefer distinct families/silhouettes, with no duplicate `id`). Do not promise an objectively perfect fit; explain simply why each result matches user answers.

**Adaptive question selection:** On completion of core answers, compute a top candidate pool (e.g., best 8–12 eligible cuts). A remaining preference question is useful when its answer options divide top candidates into materially different groups. Use a small deterministic heuristic (e.g., distribution/entropy across metadata values) and a fixed tie order: `overallLook`, `sidesPreference`, `frontPreference`. A minimum of five answered questions remains required. Stop at a sufficiently clear leader (e.g., score margin of five points after at least five answers), or once no meaningful differentiating question remains, or after the max normal question budget. Document the threshold and test it. Adaptive selection must not produce loops or dead ends.

## 7. Artwork plan and asset fallback

**Preferred:** Generate vector-style illustrations as **static local WebP/PNG or SVG files** during development if Codex has access to image generation. These are *illustrations that look like vector art*, not necessarily true editable vectors. **Do not** call an image model from the browser.

**Asset target:**
- One welcome hero illustration.
- One supporting illustration per possible quiz question ID (8 total), ideally with comparison cues for hair lengths and textures.
- One illustrated hairstyle portrait per catalog entry (38 total).
- Optional alternate side-treatment art for a few popular cuts *only if* it substantially improves consistency and can be produced reliably. Not required in v1.

**Consistent image art direction:**
- Contemporary barbershop editorial illustration: bold, simple shapes, restrained palette, smooth minimal shading, crisp edges, prominent clear hair silhouette.
- Same illustrated boy character in all portraits: approximate early-teen appearance, same face, skin tone, expression, head/shoulder crop, lighting and 3/4 view. Hair texture, top outline, and side silhouette vary appropriately. Do not change the face to represent a different hair texture.
- No text, watermarks, products, logos, tools, distracting backgrounds, hats, or heavy styling effects in illustration assets.
- Warm light/cream or transparent background, consistent square framing, enough clear space for responsive cropping; output preferably 1024x1024 and serve optimized responsive files.
- For cuts where an important side shape would be obscured, choose a consistent 3/4 view that exposes one side and the top. For questions about texture or length, a small diagram/montage of the **same character** may better explain options than one ambiguous portrait.
- Accuracy matters more than fashionable embellishment. Do not falsely show a low taper while saying “fully shaved sides” in the corresponding barber copy.

**Shared base image-generation prompt template:**

> Clean two-dimensional vector-style editorial portrait for a boys' barbershop haircut selector. The same recurring illustrated early-teen boy character in every image; identical face shape, facial features, medium warm-brown skin, neutral friendly expression, shoulders and framing; three-quarter view showing front and one side. Warm cream plain background, deep navy clean outlines, restrained muted green and rust accent tones, simple flat shading, no photorealism, no text, no logo, no facial hair, no accessories. Make the HAIRSTYLE the unmistakable focus: [INSERT PRECISE CUT DEFINITION AND TEXTURE]. Square 1024x1024 composition.

Prefer a reference/character sheet or image-edit workflow to maintain character consistency when supported. Review outputs against cut names manually or with visual inspection; do not accept misleading art just because image generation completed.

**Fallback when image generation is unavailable:**
- Build an actual usable, fully offline-capable local **SVG illustration fallback library**: consistent head silhouette with data-driven hair silhouette/outline for length, texture and shape, plus distinguishable side/top treatments. Use deterministic SVG paths or small composed shapes. Every step and result must have a rendered visual, never a broken image.
- Add `src/data/assetManifest.ts` (mapping asset IDs to generated artwork and fallback SVG) and `docs/illustration-prompts.md` containing individual cut prompts based on the shared template.
- Mark the illustrative assets as `generated` or `fallback` in a developer-facing asset report/README. Do not claim final AI art exists when it does not. Final swap-in should require only replacing files/manifest entries, not application logic.

## 8. UI / design system

**Aesthetic:** Premium but friendly barbershop, accessible to children and comfortable for teens. Avoid infantilizing badges, neon game effects, dark-on-dark low contrast, and stock-photo collage layouts.

**Suggested palette** (adjust for contrast): deep navy `#14202A`, warm bone `#F4EFE6`, muted forest `#305E50`, rust `#C06E46`, near-black ink `#17202A`, neutral white. Use contrast-tested combinations, not color alone to indicate selected answers.

**Typography:** Bold, compact display headings; highly readable system-sans body. Avoid remote font loads; bundle an appropriately licensed font only if one is already available. Roomy line-height, clear hierarchy.

**Layout:**
- Phone-first single-column screen, max content width ~640px for the quiz and ~800px on result pages; don't make full-width stretched choice buttons on huge monitors.
- Hero illustration near top, approximately square aspect ratio; keep key actions in view on a typical phone as much as feasible without making the illustration tiny.
- Answer targets **at least 48px tall**, generous space between them, visible hover/focus/selected states; this intentionally exceeds WCAG 2.2's general 24x24 CSS-pixel minimum target size criterion.
- Screen reader names and alt text identify what the illustration communicates, not generic “image.” Mark purely decorative SVG shapes as hidden from assistive technology.
- Respect `prefers-reduced-motion`; animated transitions are optional, never necessary for functionality.
- No horizontal overflow at 320px viewport width; adapt gracefully to tablet/desktop.
- Use stage indicators rather than misleading numeric percent-complete progress. Persist user selection in buttons when going back.

## 9. Code architecture and project layout

Recommended stack: React, TypeScript (strict), Vite. CSS Modules or organized plain CSS with design tokens is sufficient; avoid unnecessary state-management libraries, routers, UI libraries, or a backend. Optionally use Vitest + React Testing Library for tests; browser-level tests with Playwright are desirable when available.

Suggested files:

```text
src/
  app/App.tsx
  components/{AppShell,QuestionScreen,AnswerChoice,QuestionIllustration,
              ResultScreen,HaircutCard,BarberInstructions,StageIndicator}.tsx
  data/{questions,haircuts,assetManifest}.ts
  lib/{quizFlow,recommendation,barberCopy,persistence,validators}.ts
  types/{quiz,haircut}.ts
  styles/{tokens,global,components}.css
  assets/fallback/...
  tests/{quizFlow,recommendation,barberCopy,persistence,accessibility}.test.ts(x)
public/
  illustrations/{questions,haircuts,hero}/...
docs/
  {catalog-audit,illustration-prompts,design-decisions}.md
README.md
```

This layout is illustrative: adapt to existing repo conventions without building needless scaffolding.

Use a small explicit quiz state machine:
- `landing` -> `quiz` -> `results`.
- `answers: QuizAnswers`, `path: QuestionId[]` (derived when possible), `currentQuestionId`, `selectedResultId?`.
- On answer: update answer map, remove now-invalid downstream answers, derive path/next question; transition to results when engine says complete.
- Back from results returns to last question; edits recompute result and alternatives.
- Selecting an alternative updates selected display item but does **not** mutate answers or silently change the ranking; indicate “Another option” and preserve the algorithm's top suggestion.

**Persistence:** versioned `localStorage` key such as `haircut-finder:v1`. Store only answers, screen/current step, and optional selected result ID. Parse with runtime validation; corrupted, incompatible, or empty storage should reset gracefully. On Start over, clear persisted state and reset. Never store personal data or upload anything. No analytics/cookies required. Handle `localStorage` access errors (private browsing/restricted environments) without crashing.

**No network at runtime:** Images, fonts, catalog, logic, and code shipped with static site. Serve from any static hosting provider, with deployment base path configured appropriately.

## 10. Implementation phases (execute in order)

### Phase 1 — Scaffolding + polished UI shell
- Scaffold or adapt Vite + React + TS; add linting, tests, consistent styles.
- Implement landing/quiz/results skeleton responsive to phone/tablet/desktop.
- Build CSS tokens, accessible choice buttons, heading/focus conventions, fallback illustration component.
- Check static build before continuing.

### Phase 2 — Data-driven questions + catalog
- Encode all 8 possible question definitions and choices.
- Author and validate **all 38** haircut records, with cut-specific copy and compatibility metadata.
- Include a doc noting close-cut differences, editorial assumptions, and areas to validate with a barber.
- Create barber instruction composition with optional side and texture adaptations, producing grammatically sound short paragraphs.

### Phase 3 — Branching/recommendation logic
- Implement pure scoring/filtering, growth detection, adaptive choice of next question, deterministic tie-breaking, and family-diverse alternatives.
- Integrate backtracking, pruning stale answers, alternative selection, and notSure behavior.
- Unit-test edge cases and expected outputs before relying on the UI.

### Phase 4 — Persistence and finish
- Implement versioned localStorage load/save/reset/error behavior.
- Polish result screen, copy, responsive layouts, keyboard navigation, alt text, and reduced motion.
- Perform usability checks: short child-readable text, visible differentiation of choices, no dark-on-dark issues.

### Phase 5 — Illustrations
- Attempt to create the full asset set with an available image generation capability. Write consistent cut-specific prompts, save optimized assets locally and map them through the manifest.
- If unavailable, ship distinguishable generated SVG fallback artwork for **all** haircut/question assets and the prompt catalog. The app still must look intentional and complete, with a clear developer note that art has not been finalized.
- Ensure `npm run build` has no missing asset references and no network-required assets.

### Phase 6 — Test and handoff
- Run lint, unit/component tests, production build, and browser checks if available.
- Test at approximately 320px, 375px, 768px, and 1440px widths; keyboard-only and touch emulation where possible.
- Document commands, algorithm behavior, asset provenance, design trade-offs, known limitations, and optional follow-ups in README.
- Provide a short completion report with actual test outcomes and remaining manual editorial checks.

## 11. Required acceptance tests

1. **Basic flow:** Start -> answer 5–8 reasonable questions -> result and 2–3 alternatives. Every question shows an illustration and answer text.
2. **Buzzed to long:** If buzzed + wants long, asks willingness to grow. `yes` permits aspirational primary with prominent growth note; `no` yields feasible primary; `notSure` favors feasible primary.
3. **No false grow prompt:** Long-haired user preferring short cut never sees willingness-to-grow question.
4. **Texture breadth:** Straight, wavy, curly, and coily users each get reasonable eligible results; don't categorically disqualify close crops from coily users. No curl-dependent style becomes primary for straight hair when marked incompatible.
5. **No styling:** Wash-and-go significantly favors low effort styles over pompadour-like upkeep.
6. **Alternative diversity:** No duplicate IDs; avoid 3 barely differentiated crop variants if other good families exist.
7. **Backtracking:** Change long preference to short; irrelevant growth answer is cleared, results update, no stale answers or duplicated questions.
8. **Incomplete/neutral inputs:** `notSure` choices never cause crashes, blank result cards, or an infinite decision tree.
9. **Catalog integrity:** All 38 entries have valid unique IDs, supported attribute combinations, readable barber copy, and valid image/fallback references.
10. **Barber instructions:** Name the chosen style, describe top and sides accurately, and respect compatible side/texture adaptations; never invent specific guards or measurements from absent data.
11. **Persistence:** Reload mid-quiz or on results restores state; Start over clears it; malformed/old localStorage degrades safely.
12. **Accessibility:** Fully keyboard navigable, visible focus states, correct label/selection semantics, image descriptions, text contrast, reduced-motion behavior, large mobile tap targets.
13. **Responsiveness:** No clipped question text, hidden actions, or sideways scrolling at minimum 320px width.
14. **Offline assets:** No external API, image, font, account, tracking, or AI service requests at runtime; generated build works under static hosting.
15. **Fallback honesty:** When generation tools aren't available, each image has functioning local fallback and README labels artwork status accurately.

## 12. Explicit non-goals and editorial cautions

- No photographic analysis, age or personal-profile capture, location, email, accounts, AI chat, product recommendations, monetization, appointment booking, print/PDF, or social feeds.
- No definitive promises about exactly how a cut will look on an individual; the barber determines final suitability and can adjust for growth patterns, hair density, etc. None of those need to be quiz inputs.
- Avoid asserting that hair texture equals ethnicity or that a style is limited to a race.
- Distinguish barber cuts from ongoing styling (waves, twists) honestly. Some specialty looks may require additional styling expertise or follow-up care even though a haircut can establish their shape.
- Don't surface speculative growth timelines, exact guard numbers, or detailed styling routines beyond the chosen simple result requirement.
- Keep all recommendations editorially reviewable through catalog data.

## 13. Handoff checklist

At completion include:
- Actual commands to run locally (`npm install`, `npm run dev`, `npm run test`, `npm run build`, adapted to project tooling).
- High-level explanation of dynamic question selection and deterministic ranking.
- Count of completed catalog entries, and whether illustrations are generated assets or local SVG fallbacks.
- Tests and build results, with any failures documented.
- Any inaccuracies or terms still needing barber/editor review before release.

**Priority order if time or tool access is constrained:** correct quiz and recommendation behavior > clear child-friendly UX > truthful barber copy > dependable static illustrations > visual flourishes. Never ship broken/missing images as an acceptable fallback.
