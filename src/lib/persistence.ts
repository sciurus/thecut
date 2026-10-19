import type { QuestionId, QuizAnswers } from "../data/types";
import { questions } from "../data/questions";
import { derivePath } from "./quizFlow";
import { haircuts } from "../data/haircuts";
export const STORAGE_KEY = "haircut-finder:v1";
export interface State {
  screen: "landing" | "quiz" | "results";
  answers: QuizAnswers;
  currentQuestionId: QuestionId;
  selectedResultId?: string;
}
export const initial: State = {
  screen: "landing",
  answers: {},
  currentQuestionId: "currentLength",
};
export function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...initial };
    const v = JSON.parse(raw);
    if (
      v.version !== 1 ||
      !v.answers ||
      typeof v.answers !== "object" ||
      !["landing", "quiz", "results"].includes(v.screen)
    )
      return { ...initial };
    for (const [key, val] of Object.entries(v.answers)) {
      if (!questions[key as QuestionId]?.options.some((o) => o.value === val))
        return { ...initial };
    }
    const flow = derivePath(v.answers, haircuts);
    if (v.screen === "results" && !flow.complete) return { ...initial };
    return {
      screen: v.screen,
      answers: flow.answers,
      currentQuestionId: flow.path.includes(v.currentQuestionId)
        ? v.currentQuestionId
        : (flow.path.at(-1) ?? "currentLength"),
      selectedResultId:
        typeof v.selectedResultId === "string" ? v.selectedResultId : undefined,
    };
  } catch {
    return { ...initial };
  }
}
export function saveState(s: State) {
  try {
    if (s.screen === "landing" && Object.keys(s.answers).length === 0)
      localStorage.removeItem(STORAGE_KEY);
    else
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...s, version: 1 }));
  } catch {
    /* Storage restrictions must never prevent the quiz. */
  }
}
