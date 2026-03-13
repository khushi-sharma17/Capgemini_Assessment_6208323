import { test, expect } from '@playwright/test';

test("Verify product details in new tab", async ({ page, context }) => {

  await page.goto("https://www.amazon.in");

  await page.locator("#twotabsearchtextbox").fill("Samsung Mobile");
  await page.locator("#nav-search-submit-button").click();
  // This ensures the page is ready before clicking.

  await page.waitForSelector("div.s-main-slot");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator("div.s-main-slot div[data-component-type='s-search-result'] h2 a").first().click()
  ]);

  await newPage.waitForLoadState();

  const productTitle = newPage.locator("#productTitle");

  await expect(productTitle).toBeVisible();

  console.log("Product Title:", await productTitle.textContent());

  await newPage.close();

  await page.bringToFront();

});