import type { Haircut, QuestionId, QuizAnswers } from "../data/types";
import { getRecommendations, lengths, rankCandidates } from "./recommendation";
export function getNextQuestion(
  a: QuizAnswers,
  c: Haircut[],
): QuestionId | null {
  for (const id of ["currentLength", "texture", "preferredLength"] as const)
    if (!a[id]) return id;
  if (
    a.preferredLength !== "notSure" &&
    lengths[a.preferredLength!] > lengths[a.currentLength!] &&
    !a.willingToGrow
  )
    return "willingToGrow";
  if (!a.stylingEffort) return "stylingEffort";
  const count = Object.keys(a).length;
  const potential = rankCandidates({ ...a, willingToGrow: "yes" }, c);
  if (
    !a.willingToGrow &&
    potential[0]?.requiresGrowth &&
    potential[0].score -
      (potential.find((r) => !r.requiresGrowth)?.score ?? 0) >=
      5
  )
    return "willingToGrow";
  const ranked = getRecommendations(a, c);
  if (
    count >= 5 &&
    (count >= 8 ||
      (ranked.length > 1 && ranked[0].score - ranked[1].score >= 5))
  )
    return null;
  const pool = rankCandidates(a, c)
    .filter((r) => a.willingToGrow === "yes" || !r.requiresGrowth)
    .slice(0, 10);
  const candidates = (
    ["overallLook", "sidesPreference", "frontPreference"] as const
  )
    .filter((id) => !a[id])
    .map((id) => {
      const signatures = pool.map((r) =>
        (id === "overallLook"
          ? r.haircut.lookTags
          : id === "sidesPreference"
            ? r.haircut.sideOptions
            : r.haircut.frontOptions
        )
          .slice()
          .sort()
          .join(","),
      );
      const groups = new Map<string, number>();
      for (const s of signatures) groups.set(s, (groups.get(s) ?? 0) + 1);
      const entropy = [...groups.values()].reduce(
        (sum, n) => sum - (n / pool.length) * Math.log2(n / pool.length),
        0,
      );
      return { id, entropy };
    });
  // The broad look question comes first when useful; detail questions use entropy and fixed tie order.
  if (
    !a.overallLook &&
    candidates.find((x) => x.id === "overallLook")!.entropy > 0
  )
    return "overallLook";
  candidates.sort((a, b) => b.entropy - a.entropy);
  return candidates.find((x) => x.entropy > 0.05 || count < 5)?.id ?? null;
}
export function derivePath(answers: QuizAnswers, c: Haircut[]) {
  const clean: QuizAnswers = {};
  const path: QuestionId[] = [];
  for (let i = 0; i < 9; i++) {
    const next = getNextQuestion(clean, c);
    if (!next) break;
    path.push(next);
    if (!answers[next]) break;
    Object.assign(clean, { [next]: answers[next] });
  }
  return { answers: clean, path, complete: getNextQuestion(clean, c) === null };
}
export function answerAt(
  answers: QuizAnswers,
  id: QuestionId,
  value: string,
  c: Haircut[],
) {
  const { path } = derivePath(answers, c);
  const index = path.indexOf(id);
  const clean: QuizAnswers = {};
  for (const key of path.slice(0, index))
    Object.assign(clean, { [key]: answers[key] });
  Object.assign(clean, { [id]: value });
  return derivePath(clean, c);
}
