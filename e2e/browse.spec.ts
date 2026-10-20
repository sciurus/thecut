import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [320, 768, 1440]) {
  test(`browse, filter, details and restore at ${width}px`, async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page
      .getByRole("link", { name: "Browse hairstyles", exact: true })
      .click();
    await expect(page.locator(".browse-grid .haircut-card")).toHaveCount(38);
    await expect(page.locator("h1")).toBeFocused();
    await page
      .getByRole("combobox", { name: "Hair texture", exact: true })
      .selectOption("curly");
    await page.getByLabel("Search hairstyles").fill("afro");
    await expect(page.getByLabel("Search hairstyles")).toBeFocused();
    await expect(
      page.getByText("Adaptable fit", { exact: true }).first(),
    ).toBeVisible();
    const galleryUrl = page.url();
    await page.getByRole("link", { name: /Rounded Afro/ }).click();
    await expect(page.locator("h1")).toHaveText("Rounded Afro");
    await expect(page.locator("h1")).toBeFocused();
    const detailUrl = page.url();
    await page.reload();
    await expect(page.locator("h1")).toHaveText("Rounded Afro");
    await page.getByLabel("Your hair texture").selectOption("curly");
    await expect(page.locator(".barber")).toContainText(
      "Keep my natural texture visible",
    );
    await page.getByRole("button", { name: "Copy text", exact: true }).click();
    await expect(page.getByText("Copied to clipboard.")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
      "rounded afro",
    );
    await page.getByLabel("Your hair texture").selectOption("straight");
    await expect(
      page.getByRole("button", { name: "Copy text" }),
    ).toBeDisabled();
    await expect(page.locator(".barber")).toContainText(
      "not recommended for your natural texture",
    );
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.goBack();
    await expect(page).toHaveURL(galleryUrl);
    await expect(page.getByLabel("Search hairstyles")).toHaveValue("afro");
    await page.goForward();
    await expect(page).toHaveURL(detailUrl);
    await page.getByRole("link", { name: "← Back to hairstyles" }).click();
    await page
      .getByRole("button", { name: "Clear filters", exact: true })
      .click();
    await page.getByLabel("Search hairstyles").fill("no such hairstyle");
    await expect(
      page.getByRole("heading", { name: "No hairstyles match these filters." }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Clear filters", exact: true })
      .last()
      .click();
    await expect(page.locator(".browse-grid .haircut-card")).toHaveCount(38);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/browse-${width}.png`,
      fullPage: true,
    });
  });
}

test("preserves quiz progress while browsing and handles browser home navigation", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Find my haircut/ }).click();
  await page.getByRole("button", { name: /Short A little/ }).click();
  await page
    .getByRole("link", { name: "Browse hairstyles", exact: true })
    .click();
  await page.getByRole("button", { name: /Take the quiz/ }).click();
  await expect(page.locator("h1")).toHaveText(
    "Which looks most like your natural hair?",
  );
  await page.reload();
  await expect(page.locator("h1")).toHaveText(
    "Which looks most like your natural hair?",
  );
  await page.getByRole("link", { name: /THE CUT/ }).click();
  await page.getByRole("button", { name: /Find my haircut/ }).click();
  await page.goBack();
  await expect(
    page.getByRole("button", { name: /Find my haircut/ }),
  ).toBeVisible();
  await page.goForward();
  await expect(page.locator("h1")).toHaveText(
    "Which looks most like your natural hair?",
  );
});

test("restores gallery scroll and supports a directly opened hairstyle link", async ({
  page,
}) => {
  await page.goto("/#/browse");
  const card = page.getByRole("link", { name: /Tapered Afro/ });
  await card.scrollIntoViewIfNeeded();
  const scroll = await page.evaluate(() => window.scrollY);
  await card.click();
  await page.getByRole("link", { name: "← Back to hairstyles" }).click();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeCloseTo(scroll, -1);
  await page.goto("/#/hairstyles/french-crop");
  await expect(page.locator("h1")).toHaveText("French Crop");
  await page.getByLabel("Your hair texture").selectOption("curly");
  await page
    .getByRole("combobox", { name: "Sides", exact: true })
    .selectOption("fadedShort");
  await expect(page.locator(".barber")).toContainText(
    "Blend the close-clipped sides upward",
  );
  await expect(page.locator(".barber")).toContainText(
    "Keep my natural texture visible",
  );
  await page.goto("/#/hairstyles/unknown-style");
  await expect(page.locator("h1")).toHaveText("Hairstyle not found");
});
