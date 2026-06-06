import { expect, test, type Page } from "@playwright/test";

const STORAGE_KEY = "deserto_candy_picks_v1";
const WHEEL_DESIGN_KEY = "deserto_wheel_design_v1"; // matches WHEEL_DESIGN_STORAGE_KEY

async function clearAppStorage(page: Page) {
  await page.goto("/");
  await page.evaluate(
    ([pickKey, designKey]) => {
      localStorage.removeItem(pickKey);
      localStorage.removeItem(designKey);
    },
    [STORAGE_KEY, WHEEL_DESIGN_KEY],
  );
  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: "DESERTO" })).toBeVisible();
}

async function spinAndWait(page: Page) {
  const spin = page.getByRole("button", { name: "Spin the wheel" });
  await expect(spin).toBeEnabled();
  await spin.click();
  await expect(page.getByRole("button", { name: "Spinning" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Spin the wheel" })).toBeVisible({
    timeout: 10_000,
  });
}

test.describe("Candy room — core flow", () => {
  test.beforeEach(async ({ page }) => {
    await clearAppStorage(page);
  });

  test("renders main UI with wheel, calendar, and accessible controls", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "DESERTO" })).toBeVisible();
    await expect(page.getByLabel("Wheel style")).toBeVisible();
    await expect(page.getByRole("img", { name: "Prize wheel with three candies" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Spin the wheel" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Save today’s pick" })).toBeDisabled();
    await expect(page.getByRole("heading", { name: "Treat calendar" })).toBeVisible();
    await expect(page.getByText("Tap Spin in the center to reveal today’s treat")).toBeVisible();
  });

  test("spin → save → calendar reflects today’s pick", async ({ page }) => {
    await spinAndWait(page);

    const landed = page.getByText(/^You landed on /);
    await expect(landed).toBeVisible();
    const landedText = (await landed.textContent()) ?? "";
    const treatName = landedText.replace("You landed on ", "").trim();
    expect(treatName.length).toBeGreaterThan(0);

    const saveBtn = page.getByRole("button", { name: "Save today’s pick" });
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();

    await expect(page.getByRole("status")).toContainText("Saved! Check the calendar below.");

    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const todayCell = page.getByRole("button", { name: new RegExp(`Day ${today.getDate()}`) });
    await todayCell.click();
    await expect(page.getByText(`${todayKey}:`)).toBeVisible();
    await expect(page.locator(`text=${todayKey}:`).locator("..").getByText(treatName, { exact: true })).toBeVisible();
  });

  test("wheel design selection persists across reload", async ({ page }) => {
    const select = page.locator("#wheel-design");
    await expect(select).toBeEnabled();
    await select.selectOption("cookie");
    await expect(select).toHaveValue("cookie");
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(select).toHaveValue("cookie");
  });

  test("all wheel designs render without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    const select = page.getByLabel("Wheel style");
    const options = await select.locator("option").allTextContents();

    for (const _label of options) {
      const value = await select.locator("option").nth(options.indexOf(_label)).getAttribute("value");
      if (!value) continue;
      await select.selectOption(value);
      await expect(page.getByRole("img", { name: "Prize wheel with three candies" })).toBeVisible();
    }

    expect(errors).toEqual([]);
  });

  test("calendar month navigation works", async ({ page }) => {
    const calendar = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { name: "Treat calendar" }) })
      .filter({ visible: true });
    const monthLabel = calendar.locator("p").filter({ hasText: /\w+ \d{4}/ });
    const before = (await monthLabel.textContent()) ?? "";

    await calendar.getByRole("button", { name: "Next month" }).click();
    const afterNext = (await monthLabel.textContent()) ?? "";
    expect(afterNext).not.toBe(before);

    await calendar.getByRole("button", { name: "Previous month" }).click();
    await expect(monthLabel).toHaveText(before);
  });
});

test.describe("Routes and 404", () => {
  test("/candy redirects to home", async ({ page }) => {
    await page.goto("/candy");
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "DESERTO" })).toBeVisible();
  });

  test("404 page links home", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await page.getByRole("link", { name: "Go home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("designs gallery loads and links back", async ({ page }) => {
    await page.goto("/candy/designs");
    await expect(page.getByRole("heading", { name: "Prize wheel visual options" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Candy room" })).toBeVisible();
    await page.getByRole("link", { name: "Back to Candy room" }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Visual layout", () => {
  test("desktop layout shows sidebar calendar", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const calendars = page.getByRole("heading", { name: "Treat calendar" });
    await expect(calendars).toHaveCount(1);
  });

  test("mobile layout stacks calendar below wheel", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "DESERTO" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Treat calendar" })).toBeVisible();
  });
});
