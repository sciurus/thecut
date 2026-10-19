import { test, expect } from "@playwright/test";
for (const width of [320, 375, 768, 1440])
  test(`complete and restore quiz at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    const external: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => {
      if (!r.url().startsWith("http://127.0.0.1:4183")) external.push(r.url());
    });
    await page.goto("/");
    await page.screenshot({
      path: `test-results/landing-${width}.png`,
      fullPage: true,
    });
    const check = async () => {
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await expect
        .poll(() =>
          page
            .locator("img")
            .evaluateAll((imgs) =>
              imgs.every((img) => img.complete && img.naturalWidth > 0),
            ),
        )
        .toBe(true);
    };
    await check();
    await page.getByRole("button", { name: /Find my haircut/ }).click();
    await page.getByRole("button", { name: /Buzzed/ }).click();
    await page.getByRole("button", { name: "Coily", exact: true }).click();
    await page.getByRole("button", { name: "Long", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: /happy to grow/ }),
    ).toBeFocused();
    await check();
    await page.getByRole("button", { name: "Yes, I can wait" }).click();
    await page.getByRole("button", { name: /Wash and go/ }).click();
    for (let i = 0; i < 4 && (await page.getByRole("group").count()); i++) {
      await check();
      await page.getByRole("group").getByRole("button").last().click();
    }
    await expect(
      page.getByRole("heading", { name: "What to tell the barber" }),
    ).toBeVisible();
    await check();
    const title = await page.locator("h1").textContent();
    await page.reload();
    await expect(page.locator("h1")).toHaveText(title!);
    await page.locator(".haircut-card").first().click();
    const alternative = await page.locator("h1").textContent();
    await page.reload();
    await expect(page.locator("h1")).toHaveText(alternative!);
    await page.screenshot({
      path: `test-results/results-${width}.png`,
      fullPage: true,
    });
    await page.getByRole("button", { name: "← Back to answers" }).click();
    await expect(page.getByRole("button", { pressed: true })).toHaveCount(1);
    await page.getByRole("button", { name: /Start over/ }).click();
    await expect(
      page.getByRole("button", { name: /Find my haircut/ }),
    ).toBeVisible();
    expect(errors).toEqual([]);
    expect(external).toEqual([]);
  });
test("keyboard navigation and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: /Find my haircut/ }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "The Cut home" })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator("h1")).toBeFocused();
  await page.keyboard.press("Tab");
  const choice = page.getByRole("button", { name: /Buzzed/ });
  await expect(choice).toBeFocused();
  await expect(choice).toHaveCSS("min-height", "56px");
  await page.keyboard.press("Enter");
  await expect(page.locator("h1")).toHaveText(
    "Which looks most like your natural hair?",
  );
});

test("touch navigation and a shorter cut never ask for growth", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4183/");
  await page.getByRole("button", { name: /Find my haircut/ }).tap();
  await page.getByRole("button", { name: /Long Around/ }).tap();
  await page.getByRole("button", { name: "Wavy", exact: true }).tap();
  await page.getByRole("button", { name: "Short", exact: true }).tap();
  await expect(page.locator("h1")).toHaveText(
    "How much time do you want to spend on your hair?",
  );
  await page.getByRole("button", { name: /Wash and go/ }).tap();
  for (let i = 0; i < 4 && (await page.getByRole("group").count()); i++)
    await page.getByRole("group").getByRole("button").last().tap();
  await expect(
    page.getByRole("heading", { name: "What to tell the barber" }),
  ).toBeVisible();
  await expect(page.locator(".growth")).toHaveCount(0);
  await page.locator(".haircut-card").first().tap();
  await expect(
    page.getByText("ANOTHER OPTION", { exact: true }).first(),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await context.close();
});
