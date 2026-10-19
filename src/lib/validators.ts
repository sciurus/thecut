import type { Haircut } from "../data/types";
const textures = ["straight", "wavy", "curly", "coily"] as const;
export function validateCatalog(c: Haircut[]) {
  const ids = new Set<string>();
  for (const h of c) {
    if (
      ids.has(h.id) ||
      !/^[a-z0-9-]+$/.test(h.id) ||
      !h.name ||
      !h.family ||
      !h.description ||
      !h.imageAssetId ||
      !h.barberBase.toLowerCase().includes(h.name.toLowerCase()) ||
      !["buzzed", "short", "medium", "long"].includes(h.minCurrentLength) ||
      !["veryShort", "short", "medium", "long"].includes(h.resultLength) ||
      !["none", "aLittle", "happyToStyle"].includes(h.stylingEffort) ||
      !h.sideOptions.length ||
      !h.sideOptions.includes(h.defaultSides) ||
      !h.sideOptions.every((s) =>
        ["naturalFuller", "tapered", "fadedShort"].includes(s),
      ) ||
      !h.frontOptions.length ||
      !h.frontOptions.every((s) =>
        ["forwardFringe", "upOrBack", "parted"].includes(s),
      ) ||
      !h.lookTags.length ||
      !h.lookTags.every((s) =>
        ["neatClassic", "relaxedTextured", "bold"].includes(s),
      ) ||
      !textures.every((t) =>
        ["ideal", "adaptable", "notRecommended"].includes(h.textureFit[t]),
      ) ||
      !Number.isFinite(h.sortPriority) ||
      Object.keys(h.barberBySides).some(
        (s) => !h.sideOptions.includes(s as typeof h.defaultSides),
      )
    )
      throw Error(`Invalid haircut: ${h.id}`);
    ids.add(h.id);
  }
  return true;
}
