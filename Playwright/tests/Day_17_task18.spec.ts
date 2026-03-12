import { test, expect } from '@playwright/test';

test("Handle browser notification popup on Justdial", async ({ browser }) => {

  // 1. Create a browser context with notification permission allowed
  const context = await browser.newContext({
    permissions: ['notifications'],
    geolocation: { latitude: 28.6139, longitude: 77.2090 } // optional
  });

  const page = await context.newPage();

  // 2. Navigate to Justdial
  await page.goto("https://www.justdial.com");

  // 3. Wait for homepage to load
  await page.waitForLoadState('domcontentloaded');

  // 4. Verify homepage search input is visible
  const searchBox = page.locator('input[placeholder*="Search"]');
  await expect(searchBox).toBeVisible();

  // 5. Enter "Restaurants"
  await searchBox.fill("Restaurants");

  // 6. Press Enter to search
  await page.keyboard.press("Enter");

  // 7. Wait for results page
  await page.waitForLoadState('networkidle');

  // 8. Verify results page contains restaurant listings
  const results = page.locator("div.resultbox_title_anchor");
  await expect(results.first()).toBeVisible();

  console.log("Restaurant results displayed successfully");

});