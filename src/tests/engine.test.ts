import { describe, it, expect } from "vitest";
import { haircuts } from "../data/haircuts";
import { questions } from "../data/questions";
import type { QuizAnswers } from "../data/types";
import { getRecommendations } from "../lib/recommendation";
import { answerAt, derivePath, getNextQuestion } from "../lib/quizFlow";
import { validateCatalog } from "../lib/validators";
const base: QuizAnswers = {
  currentLength: "short",
  texture: "straight",
  preferredLength: "short",
  stylingEffort: "none",
};
describe("catalog and recommendations", () => {
  it("validates all 38 unique records", () => {
    expect(haircuts).toHaveLength(38);
    expect(validateCatalog(haircuts)).toBe(true);
  });
  it.each(["yes", "no", "notSure"] as const)(
    "handles buzzed to long: %s",
    (willingToGrow) => {
      const a: QuizAnswers = {
        ...base,
        currentLength: "buzzed",
        preferredLength: "long",
        willingToGrow,
      };
      const r = getRecommendations(a, haircuts);
      expect(r.length).toBeGreaterThan(1);
      expect(r[0].requiresGrowth).toBe(willingToGrow === "yes");
      if (willingToGrow === "no")
        expect(r.every((x) => !x.requiresGrowth)).toBe(true);
    },
  );
  it.each(["straight", "wavy", "curly", "coily"] as const)(
    "covers %s naturally",
    (texture) => {
      const r = getRecommendations({ ...base, texture }, haircuts);
      expect(r.length).toBeGreaterThan(2);
      expect(
        r.every((x) => x.haircut.textureFit[texture] !== "notRecommended"),
      ).toBe(true);
      expect(new Set(r.map((x) => x.haircut.family)).size).toBeGreaterThan(2);
    },
  );
  it("favors easy hair and distinct alternatives", () => {
    const r = getRecommendations(base, haircuts);
    expect(r[0].haircut.stylingEffort).toBe("none");
    expect(new Set(r.map((x) => x.haircut.id)).size).toBe(r.length);
    expect(getRecommendations(base, haircuts)).toEqual(r);
  });
  it("names every cut and respects supported sides in copy", () => {
    for (const h of haircuts) {
      const r = getRecommendations(
        {
          ...base,
          currentLength: "long",
          texture: Object.entries(h.textureFit).find(
            ([, v]) => v === "ideal",
          )![0] as QuizAnswers["texture"],
          stylingEffort: "happyToStyle",
        },
        [h],
      )[0];
      expect(r.barberScript.toLowerCase()).toContain(h.name.toLowerCase());
      expect(r.barberScript).not.toMatch(/\d+ inches|guard \d/i);
    }
  });
});
describe("adaptive flow", () => {
  it("asks immediate growth only when needed", () => {
    expect(
      getNextQuestion(
        {
          currentLength: "buzzed",
          texture: "straight",
          preferredLength: "long",
        },
        haircuts,
      ),
    ).toBe("willingToGrow");
    expect(
      getNextQuestion(
        {
          currentLength: "long",
          texture: "straight",
          preferredLength: "short",
        },
        haircuts,
      ),
    ).toBe("stylingEffort");
  });
  it("prunes growth and descendants on length edit", () => {
    const r = answerAt(
      {
        ...base,
        preferredLength: "long",
        willingToGrow: "yes",
        overallLook: "bold",
      },
      "preferredLength",
      "short",
      haircuts,
    );
    expect(r.answers.willingToGrow).toBeUndefined();
    expect(r.answers.overallLook).toBeUndefined();
    expect(r.path).not.toContain("willingToGrow");
  });
  it("completes every combination of core inputs without loops, with 5–8 questions", () => {
    for (const currentLength of questions.currentLength.options)
      for (const texture of questions.texture.options)
        for (const preferredLength of questions.preferredLength.options) {
          let a: QuizAnswers = {};
          const seen = new Set();
          for (let i = 0; i < 10; i++) {
            const id = getNextQuestion(a, haircuts);
            if (!id) break;
            expect(seen.has(id)).toBe(false);
            seen.add(id);
            const value =
              id === "currentLength"
                ? currentLength.value
                : id === "texture"
                  ? texture.value
                  : id === "preferredLength"
                    ? preferredLength.value
                    : questions[id].options.at(-1)!.value;
            a = { ...a, [id]: value };
          }
          expect(getNextQuestion(a, haircuts)).toBeNull();
          expect(seen.size).toBeGreaterThanOrEqual(5);
          expect(seen.size).toBeLessThanOrEqual(8);
          expect(getRecommendations(a, haircuts).length).toBeGreaterThan(0);
          expect(derivePath(a, haircuts).complete).toBe(true);
        }
  });
});
it("keeps natural-texture styles prominent rather than favoring abundant straight references", () => {
  const coily = getRecommendations(
    {
      currentLength: "medium",
      texture: "coily",
      preferredLength: "medium",
      stylingEffort: "none",
      overallLook: "relaxedTextured",
    },
    haircuts,
  );
  expect(["curly-top-with-taper", "rounded-afro", "tapered-afro"]).toContain(
    coily[0].haircut.id,
  );
  const curly = getRecommendations(
    {
      currentLength: "medium",
      texture: "curly",
      preferredLength: "short",
      stylingEffort: "none",
      overallLook: "relaxedTextured",
    },
    haircuts,
  );
  expect(curly[0].haircut.id).toBe("curly-crop");
});
