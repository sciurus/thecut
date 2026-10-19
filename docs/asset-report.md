# Artwork report

47 of 47 assets use AI-generated artwork from the built-in imagegen tool: one hero, eight question images and 38 haircut portraits in the complete set. All 47 assets have deterministic local SVG fallbacks. Portrait artwork is optimized to 768px WebP. The eight served question illustrations are labelled, self-contained SVG comparison diagrams composed from generated portraits. Raw AI-generated question montages were not selected because their ordering and cut distinctions were unclear. PNG originals are retained locally under artwork/originals (excluded from git and the production bundle). No runtime generation or third-party requests.

## Review

The initial slick-back image resembled a side part. A second generated image was selected after reviewing backward hair direction and the open forehead.

Character consistency and major silhouettes received implementation review. Professional barber/editor approval is still pending for all assets and texture suitability.

The textured-crop original was the identity reference for subsequent portraits. The hero was generated separately using the shared character description. Prompts are in illustration-prompts.md; reference-image calls additionally instructed exact preservation of face, pose, shirt and rendering style.

| Asset ID | Status | Served file | Fallback |
| --- | --- | --- | --- |
| 360-waves | generated | 360-waves.webp | 360-waves.svg |
| bowl-cut | generated | bowl-cut.webp | bowl-cut.svg |
| bro-flow | generated | bro-flow.webp | bro-flow.svg |
| butch-cut | generated | butch-cut.webp | butch-cut.svg |
| buzz-cut | generated | buzz-cut.webp | buzz-cut.svg |
| caesar-cut | generated | caesar-cut.webp | caesar-cut.svg |
| classic-side-part | generated | classic-side-part.webp | classic-side-part.svg |
| comb-over | generated | comb-over.webp | comb-over.svg |
| crew-cut | generated | crew-cut.webp | crew-cut.svg |
| curly-crop | generated | curly-crop.webp | curly-crop.svg |
| curly-high-top | generated | curly-high-top.webp | curly-high-top.svg |
| curly-top-with-taper | generated | curly-top-with-taper.webp | curly-top-with-taper.svg |
| curtains | generated | curtains.webp | curtains.svg |
| faux-hawk | generated | faux-hawk.webp | faux-hawk.svg |
| flat-top | generated | flat-top.webp | flat-top.svg |
| french-crop | generated | french-crop.webp | french-crop.svg |
| frohawk | generated | frohawk.webp | frohawk.svg |
| hero | generated | hero.webp | hero.svg |
| high-and-tight | generated | high-and-tight.webp | high-and-tight.svg |
| ivy-league | generated | ivy-league.webp | ivy-league.svg |
| layered-scissor-cut | generated | layered-scissor-cut.webp | layered-scissor-cut.svg |
| modern-mullet | generated | modern-mullet.webp | modern-mullet.svg |
| mohawk | generated | mohawk.webp | mohawk.svg |
| mop-top | generated | mop-top.webp | mop-top.svg |
| pompadour | generated | pompadour.webp | pompadour.svg |
| question-currentLength | generated | question-currentLength-diagram.svg | question-currentLength.svg |
| question-frontPreference | generated | question-frontPreference-diagram.svg | question-frontPreference.svg |
| question-overallLook | generated | question-overallLook-diagram.svg | question-overallLook.svg |
| question-preferredLength | generated | question-preferredLength-diagram.svg | question-preferredLength.svg |
| question-sidesPreference | generated | question-sidesPreference-diagram.svg | question-sidesPreference.svg |
| question-stylingEffort | generated | question-stylingEffort-diagram.svg | question-stylingEffort.svg |
| question-texture | generated | question-texture-diagram.svg | question-texture.svg |
| question-willingToGrow | generated | question-willingToGrow-diagram.svg | question-willingToGrow.svg |
| quiff | generated | quiff.webp | quiff.svg |
| rounded-afro | generated | rounded-afro.webp | rounded-afro.svg |
| shag | generated | shag.webp | shag.svg |
| short-afro | generated | short-afro.webp | short-afro.svg |
| short-spiky-cut | generated | short-spiky-cut.webp | short-spiky-cut.svg |
| side-swept-fringe | generated | side-swept-fringe.webp | side-swept-fringe.svg |
| slick-back | generated | slick-back-reviewed.webp | slick-back.svg |
| surfer-hair | generated | surfer-hair.webp | surfer-hair.svg |
| tapered-afro | generated | tapered-afro.webp | tapered-afro.svg |
| textured-crop | generated | textured-crop.webp | textured-crop.svg |
| textured-fringe | generated | textured-fringe.webp | textured-fringe.svg |
| twist-top-with-taper | generated | twist-top-with-taper.webp | twist-top-with-taper.svg |
| undercut | generated | undercut.webp | undercut.svg |
| wolf-cut | generated | wolf-cut.webp | wolf-cut.svg |
