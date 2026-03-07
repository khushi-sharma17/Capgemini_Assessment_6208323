import { test } from "@playwright/test";

test("Find Silver medals of Emma McKeon", async ({ page }) => {

  await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020", {
    waitUntil: "domcontentloaded"
  });

  await page.locator('#onetrust-accept-btn-handler').click();

  await page.locator('//a[contains(text(),"All Athletes")]').click();

  await page.locator('//h2[contains(text(),"Medalists")]').click();

  const goldMedals = await page.locator(
    '(//h3[text()="Emma MCKEON"]/ancestor::li[contains(@data-cy,"athlete-row")]//span[@data-cy="ocs-text-module"])[1]'
  ).innerText();

  console.log("Silver medals of Emma McKeon:", goldMedals);

  await page.screenshot({ path: "screenshot/silver-medal.png" });

});