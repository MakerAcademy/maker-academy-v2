import { test, expect } from "@playwright/test";
import { url } from "./config";

test("should navigate to the about page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto(url);

  // Find an element with the text 'About Page' and click on it
  await page.locator('button:has-text("About")').click();

  // The new URL should be "/about" (baseURL is used there)
  await expect(page).toHaveURL(`${url}/about/mission`);

  // The new page should contain an h1 with "About Page"
  await expect(page.locator("h2")).toContainText("Our Mission");
});
