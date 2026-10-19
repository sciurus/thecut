# Design and engine decisions

React + strict TypeScript + Vite, no router or state library. The app is frontend only. System fonts, local images, no analytics, cookies, APIs, remote fonts or runtime AI. All host requests are static files. `base: './'` supports a subdirectory deployment; serve `dist/` over HTTP rather than opening index.html as a file.

## Ranking
Lengths are ordered coarse buckets, with veryShort equivalent to buzzed. Scoring: exact desired length +6, adjacent +2, distant -4; ideal texture +5, adaptable +1, incompatible excluded; +1 for an ideal natural-texture silhouette with at least two incompatible texture categories; sides and front +3 supported / -3 unsupported; look +2 match / -1 mismatch; effort +3 at or below requested effort, -4 one step higher, -8 two steps higher. Growth costs 5 without permission, 9 when unsure, zero when yes. No-growth excludes aspirational cuts entirely; without yes, the primary is always achievable now. An unsure family can see an aspirational alternative with a warning.

Ties use natural texture fit, immediate feasibility, closest effort, editorial priority, stable ID. Alternatives prefer distinct families within 9 points of the primary before allowing siblings. The nine-point pool permits variety without adding incompatible cuts.

## Branching and editing
Current length, texture and desired length come first. Requested extra length triggers a grow question immediately. A later grow question is allowed when a hypothetical permitted aspirational leader is 5 points above an achievable cut. Styling effort is always collected. Broad look comes next when it discriminates. Detail questions use entropy across metadata signatures in the best ten candidates, with sides before front on equal entropy. Five answers minimum, eight maximum; stop with a five-point margin over the best diverse alternative, or when no useful preference remains. `notSure` scores neutrally, except that growth uncertainty enforces an achievable primary.

Paths are replayed from empty answers through the pure next-question function. Editing clears subsequent answers and replays the path so stale descendants cannot influence ranking. The family answers any remaining useful questions again. Selecting an alternative preserves the ranked primary and answers. Local persistence has schema version 1, validates allowed values, rebuilds the reachable path, and tolerates malformed or inaccessible storage.

## UI and accessibility
Warm bone, navy, forest green, darker rust for accessible text contrast. No remote fonts. Stage labels instead of a false fixed question count. Text answer buttons have visible check marks, aria-pressed, and at least 56px height. Focus moves to the heading after navigation. Reduced-motion preference is respected. No animation is needed. Results have copyable barber instructions, honest growth warnings, and alternative selection. Clipboard failures offer manual selection.

## Art
All 47 IDs have deterministic SVG fallbacks using a shared face and individually authored hair silhouettes. Built-in image generation is attempted during development with a character reference. Optimized WebP sources are selected by the manifest. Generation prompts are stored in illustration-prompts.md and JSON. Artwork and texture terminology still require human barber review before public release.
