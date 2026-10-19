import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("landing, quiz and results have no automated WCAG A/AA violations", async ({
  page,
}) => {
  await page.goto("/");
  const check = async () => {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  };
  await check();
  await page.getByRole("button", { name: /Find my haircut/ }).click();
  await check();
  await page.getByRole("button", { name: /Short A little/ }).click();
  await page.getByRole("button", { name: "Straight", exact: true }).click();
  await page.getByRole("button", { name: "Short", exact: true }).click();
  await page.getByRole("button", { name: /Wash and go/ }).click();
  for (let i = 0; i < 4 && (await page.getByRole("group").count()); i++)
    await page.getByRole("group").getByRole("button").last().click();
  await expect(
    page.getByRole("heading", { name: "What to tell the barber" }),
  ).toBeVisible();
  await check();
});
