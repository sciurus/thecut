import { expect, it } from "vitest";
import { filterHaircuts, filterQuery, readFilters } from "../lib/browse";
import { haircuts } from "../data/haircuts";

it("combines search, texture, length and effort without including unsuitable styles", () => {
  const filters = readFilters("q=AFRO&texture=coily&length=medium&effort=none");
  expect(filterHaircuts(filters).map((h) => h.id)).toEqual([
    "rounded-afro",
    "tapered-afro",
  ]);
  expect(
    filterHaircuts(readFilters("texture=straight")).some(
      (h) => h.id === "rounded-afro",
    ),
  ).toBe(false);
  expect(
    filterHaircuts(readFilters("texture=curly")).some(
      (h) => h.id === "rounded-afro",
    ),
  ).toBe(true);
  expect(filterHaircuts(readFilters("q=does-not-exist"))).toEqual([]);
});
it("round-trips shareable filters and ignores unknown filter values", () => {
  const filters = {
    search: "crop & fringe",
    texture: "curly",
    length: "short",
    effort: "aLittle",
  };
  expect(readFilters(filterQuery(filters))).toEqual(filters);
  expect(readFilters("texture=invalid&length=invalid&effort=invalid")).toEqual({
    search: "",
    texture: "",
    length: "",
    effort: "",
  });
});
it("shows the complete catalog sorted by length and name", () => {
  const result = filterHaircuts(readFilters(""));
  expect(result).toHaveLength(haircuts.length);
  const order = ["veryShort", "short", "medium", "long"];
  for (let i = 1; i < result.length; i++) {
    const previous = result[i - 1],
      current = result[i];
    expect(order.indexOf(current.resultLength)).toBeGreaterThanOrEqual(
      order.indexOf(previous.resultLength),
    );
    if (current.resultLength === previous.resultLength)
      expect(previous.name.localeCompare(current.name)).toBeLessThan(0);
  }
});
