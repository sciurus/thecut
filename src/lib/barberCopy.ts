import type { Haircut, QuizAnswers } from "../data/types";
export function buildBarberInstructions(h: Haircut, a: QuizAnswers): string {
  const side =
    a.sidesPreference &&
    a.sidesPreference !== "notSure" &&
    h.sideOptions.includes(a.sidesPreference)
      ? a.sidesPreference
      : undefined;
  return [
    h.barberBase,
    a.texture ? h.barberByTexture?.[a.texture] : undefined,
    side ? h.barberBySides[side] : undefined,
  ]
    .filter(Boolean)
    .join(" ");
}
