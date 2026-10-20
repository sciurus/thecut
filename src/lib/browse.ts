import { haircuts } from "../data/haircuts";
import type { Effort, Haircut, Texture } from "../data/types";

export const textures: Record<Texture, string> = {
  straight: "Straight",
  wavy: "Wavy",
  curly: "Curly",
  coily: "Coily",
};
export const lengths: Record<Haircut["resultLength"], string> = {
  veryShort: "Very short",
  short: "Short",
  medium: "Medium",
  long: "Long",
};
export const efforts: Record<Effort, string> = {
  none: "Wash and go",
  aLittle: "A little styling",
  happyToStyle: "Happy to style",
};
export const sides = {
  naturalFuller: "Natural / fuller",
  tapered: "Tapered",
  fadedShort: "Short fade",
};
export interface Filters {
  search: string;
  texture: string;
  length: string;
  effort: string;
}
export function readFilters(query: string): Filters {
  const p = new URLSearchParams(query);
  return {
    search: p.get("q") ?? "",
    texture: Object.hasOwn(textures, p.get("texture") ?? "")
      ? p.get("texture")!
      : "",
    length: Object.hasOwn(lengths, p.get("length") ?? "")
      ? p.get("length")!
      : "",
    effort: Object.hasOwn(efforts, p.get("effort") ?? "")
      ? p.get("effort")!
      : "",
  };
}
export function filterHaircuts(filters: Filters) {
  const order = Object.keys(lengths);
  return haircuts
    .filter(
      (h) =>
        h.name.toLowerCase().includes(filters.search.trim().toLowerCase()) &&
        (!filters.texture ||
          h.textureFit[filters.texture as Texture] !== "notRecommended") &&
        (!filters.length || h.resultLength === filters.length) &&
        (!filters.effort || h.stylingEffort === filters.effort),
    )
    .sort(
      (a, b) =>
        order.indexOf(a.resultLength) - order.indexOf(b.resultLength) ||
        a.name.localeCompare(b.name),
    );
}
export function filterQuery(filters: Filters) {
  const p = new URLSearchParams();
  for (const [key, value] of Object.entries(filters))
    if (value) p.set(key === "search" ? "q" : key, value);
  return p.size ? `?${p}` : "";
}
