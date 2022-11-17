import { test, expect } from "@playwright/test";

test("should render home page title", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText(
    "Welcome to the Maker Academy"
  );
});

test("should render about page title", async ({ page }) => {
  // The new URL should be "/about" (baseURL is used there)
  await page.goto(`/about/mission`);

  // The new page should contain an h1 with "About Page"
  await expect(page.locator("h2")).toContainText("Our Mission");
});
