import { it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { assetManifest } from "../data/assetManifest";
import { haircuts } from "../data/haircuts";
import { questions } from "../data/questions";
it("ships local artwork and SVG fallbacks for every screen and haircut", () => {
  expect(Object.keys(assetManifest)).toHaveLength(47);
  for (const id of [
    "hero",
    ...haircuts.map((h) => h.imageAssetId),
    ...Object.values(questions).map((q) => q.imageAssetId),
  ]) {
    const asset = assetManifest[id];
    expect(asset.alt.length).toBeGreaterThan(20);
    expect(existsSync(`public/${asset.src}`)).toBe(true);
    expect(existsSync(`public/${asset.fallback}`)).toBe(true);
    expect(readFileSync(`public/${asset.fallback}`, "utf8")).toContain("<svg");
    expect(asset.src).not.toMatch(/^https?:/);
  }
});
it("has a different fallback silhouette for all 38 styles", () => {
  const artwork = haircuts.map((h) =>
    readFileSync(`public/${assetManifest[h.imageAssetId].fallback}`, "utf8"),
  );
  expect(new Set(artwork).size).toBe(38);
});
