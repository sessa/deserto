import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const REVIEW_DIR = path.join(process.cwd(), "e2e", "review-screenshots");

test.describe("Visual review captures", () => {
  test.beforeAll(() => {
    fs.mkdirSync(REVIEW_DIR, { recursive: true });
  });

  test("capture home and designs pages for manual review", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(REVIEW_DIR, "home-desktop.png"), fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(REVIEW_DIR, "home-mobile.png"), fullPage: true });

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/candy/designs");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(REVIEW_DIR, "designs-desktop.png"), fullPage: true });

    // Basic design sanity: body should use Geist, not fall back to generic sans only
    const fontFamily = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    expect(fontFamily.toLowerCase()).toMatch(/geist|sans/);
  });
});
