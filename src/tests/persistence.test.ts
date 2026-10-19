import { beforeEach, it, expect, vi } from "vitest";
import { initial, loadState, saveState, STORAGE_KEY } from "../lib/persistence";
import { getNextQuestion } from "../lib/quizFlow";
import { haircuts } from "../data/haircuts";
import { questions } from "../data/questions";
import type { QuizAnswers } from "../data/types";
beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});
it("restores quiz position and chosen answers", () => {
  const s = {
    ...initial,
    screen: "quiz" as const,
    answers: { currentLength: "short" as const },
    currentQuestionId: "texture" as const,
  };
  saveState(s);
  expect(loadState()).toEqual(s);
});
it("restores a completed result and selected alternative", () => {
  let answers: QuizAnswers = {};
  for (let i = 0; i < 9; i++) {
    const id = getNextQuestion(answers, haircuts);
    if (!id) break;
    answers = { ...answers, [id]: questions[id].options[0].value };
  }
  const s = {
    ...initial,
    screen: "results" as const,
    answers,
    selectedResultId: "buzz-cut",
  };
  saveState(s);
  expect(loadState().screen).toBe("results");
  expect(loadState().selectedResultId).toBe("buzz-cut");
});
it.each([
  "bad json",
  "{}",
  '{"version":0,"answers":{}}',
  '{"version":1,"screen":"results","answers":{}}',
  '{"version":1,"screen":"quiz","answers":{"texture":"alien"}}',
])("rejects invalid state %s", (value) => {
  localStorage.setItem(STORAGE_KEY, value);
  expect(loadState()).toEqual(initial);
});
it("clears persisted state on reset", () => {
  saveState({ ...initial, screen: "quiz" });
  saveState(initial);
  expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
});
it("survives inaccessible storage", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw Error("blocked");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw Error("blocked");
  });
  expect(loadState()).toEqual(initial);
  expect(() => saveState({ ...initial, screen: "quiz" })).not.toThrow();
});
it("preserves answers when returning home without choosing Start over", () => {
  saveState({ ...initial, answers: { currentLength: "short" } });
  expect(loadState().answers.currentLength).toBe("short");
});
