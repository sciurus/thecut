import { generatedAssets } from "./generatedAssets";
import { haircuts } from "./haircuts";
import { questions } from "./questions";
export interface Asset {
  status: "generated" | "fallback";
  src: string;
  alt: string;
  fallback: string;
}
export const assetManifest: Record<string, Asset> = Object.fromEntries([
  [
    "hero",
    {
      status: "fallback",
      src: "illustrations/hero.svg",
      fallback: "illustrations/hero.svg",
      alt: "The same illustrated boy wearing three different haircuts: textured crop, curly top, and longer curtains.",
    },
  ],
  ...haircuts.map((h) => [
    h.id,
    {
      status: "fallback",
      src: `illustrations/${h.id}.svg`,
      fallback: `illustrations/${h.id}.svg`,
      alt: `Three-quarter illustration of a ${h.name}: ${h.description}`,
    },
  ]),
  ...Object.values(questions).map((q) => [
    q.imageAssetId,
    {
      status: "fallback",
      src: `illustrations/${q.imageAssetId}.svg`,
      fallback: `illustrations/${q.imageAssetId}.svg`,
      alt:
        q.id === "texture"
          ? "The same boy with straight, wavy, curly, and coily hair, shown in that order."
          : q.id === "currentLength" || q.id === "preferredLength"
            ? "The same boy with progressively longer hair on top: buzzed, short, medium, and long."
            : {
                willingToGrow:
                  "Close and longer hairstyles on the same boy, illustrating a look to grow toward.",
                stylingEffort:
                  "A simple short cut, a textured crop, and a lifted styled cut on the same boy.",
                overallLook:
                  "The same boy in neat, relaxed, and bold haircut silhouettes.",
                sidesPreference:
                  "The same boy with fuller scissor-cut sides, tapered edges, and close faded sides.",
                frontPreference:
                  "The same boy with a forward fringe, lifted front, and a middle part.",
              }[
                q.id as
                  | "willingToGrow"
                  | "stylingEffort"
                  | "overallLook"
                  | "sidesPreference"
                  | "frontPreference"
              ],
    },
  ]),
] as [string, Asset][]);

for (const [id, src] of Object.entries(generatedAssets)) {
  if (assetManifest[id])
    assetManifest[id] = { ...assetManifest[id], status: "generated", src };
}
