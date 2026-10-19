import type { Haircut, QuizAnswers } from "../data/types";
import { buildBarberInstructions } from "./barberCopy";
export const lengths = {
  buzzed: 0,
  veryShort: 0,
  short: 1,
  medium: 2,
  long: 3,
};
const efforts = { none: 0, aLittle: 1, happyToStyle: 2 };
export interface Recommendation {
  haircut: Haircut;
  score: number;
  requiresGrowth: boolean;
  reasons: string[];
  barberScript: string;
}
export function rankCandidates(a: QuizAnswers, c: Haircut[]): Recommendation[] {
  return c
    .filter((h) => !a.texture || h.textureFit[a.texture] !== "notRecommended")
    .map((h) => {
      const requiresGrowth =
        a.currentLength !== undefined &&
        lengths[h.minCurrentLength] > lengths[a.currentLength];
      const fit = a.texture ? h.textureFit[a.texture] : undefined;
      const distance =
        a.preferredLength && a.preferredLength !== "notSure"
          ? Math.abs(lengths[h.resultLength] - lengths[a.preferredLength])
          : undefined;
      const effort = a.stylingEffort
        ? efforts[h.stylingEffort] - efforts[a.stylingEffort]
        : 0;
      let score = fit === "ideal" ? 5 : fit === "adaptable" ? 1 : 0;
      // Reward genuinely natural curl/coil silhouettes rather than catalog abundance.
      if (
        fit === "ideal" &&
        Object.values(h.textureFit).filter((v) => v === "notRecommended")
          .length >= 2
      )
        score += 1;
      if (distance !== undefined)
        score += distance === 0 ? 6 : distance === 1 ? 2 : -4;
      if (a.stylingEffort) score += effort <= 0 ? 3 : effort === 1 ? -4 : -8;
      if (a.sidesPreference && a.sidesPreference !== "notSure")
        score += h.sideOptions.includes(a.sidesPreference) ? 3 : -3;
      if (a.frontPreference && a.frontPreference !== "notSure")
        score += h.frontOptions.includes(a.frontPreference) ? 3 : -3;
      if (a.overallLook && a.overallLook !== "notSure")
        score += h.lookTags.includes(a.overallLook) ? 2 : -1;
      if (requiresGrowth && a.willingToGrow !== "yes")
        score -= a.willingToGrow === "notSure" ? 9 : 5;
      const reasons = [
        fit === "ideal"
          ? "Works with your natural texture."
          : "Can be adapted to your natural texture.",
        distance === 0 ? "Matches the length you chose." : undefined,
        a.stylingEffort && effort <= 0
          ? "Fits your styling routine."
          : undefined,
      ].filter((s): s is string => !!s);
      return {
        haircut: h,
        score,
        requiresGrowth,
        reasons,
        barberScript: buildBarberInstructions(h, a),
      };
    })
    .filter((r) => a.willingToGrow !== "no" || !r.requiresGrowth)
    .sort(
      (x, y) =>
        y.score - x.score ||
        (a.texture && y.haircut.textureFit[a.texture] === "ideal" ? 1 : 0) -
          (a.texture && x.haircut.textureFit[a.texture] === "ideal" ? 1 : 0) ||
        Number(x.requiresGrowth) - Number(y.requiresGrowth) ||
        (a.stylingEffort
          ? Math.abs(
              efforts[x.haircut.stylingEffort] - efforts[a.stylingEffort],
            ) -
            Math.abs(
              efforts[y.haircut.stylingEffort] - efforts[a.stylingEffort],
            )
          : 0) ||
        x.haircut.sortPriority - y.haircut.sortPriority ||
        x.haircut.id.localeCompare(y.haircut.id),
    );
}
export function getRecommendations(
  a: QuizAnswers,
  c: Haircut[],
): Recommendation[] {
  const ranked = rankCandidates(a, c);
  const primary = ranked.find(
    (r) => a.willingToGrow === "yes" || !r.requiresGrowth,
  );
  if (!primary) return [];
  const chosen = [primary];
  const families = new Set([primary.haircut.family]);
  const pool = ranked.filter(
    (r) =>
      r.haircut.id !== primary.haircut.id &&
      r.score >= primary.score - 9 &&
      (a.willingToGrow === "yes" ||
        a.willingToGrow === "notSure" ||
        !r.requiresGrowth),
  );
  for (const r of pool)
    if (!families.has(r.haircut.family) && chosen.length < 4) {
      chosen.push(r);
      families.add(r.haircut.family);
    }
  for (const r of pool)
    if (chosen.length < 4 && !chosen.includes(r)) chosen.push(r);
  return chosen;
}
