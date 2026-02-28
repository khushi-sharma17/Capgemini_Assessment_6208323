import { test, expect } from '@playwright/test';

test('fetch first product', async ({ page }) => {

  await page.goto('https://www.amazon.com/s?k=shoes');

  await page.waitForSelector('//div[@data-component-type="s-search-result"]');

  const name = await page.locator(
    '(//div[@data-component-type="s-search-result"]//h2//span)[1]'
  ).textContent();

  const price = await page.locator(
    '(//div[@data-component-type="s-search-result"]//span[@class="a-price-whole"])[1]'
  ).textContent();

  console.log("Name:", name?.trim());
  console.log("Price:", price?.trim());

  await page.screenshot({path:'screenshot/question_1_${Date.now()}.png'});    
});