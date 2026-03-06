import { test } from "@playwright/test";

test("ICC ranking - David Warner rating", async ({ page }) => {

  await page.goto("https://www.icc-cricket.com/rankings/mens/player-rankings/odi/batting");

  const rating = await page.locator('//a[text()="David Warner"]/ancestor::tr/td[4]').innerText();

  console.log("David Warner Rating:", rating);

  await page.screenshot({ path: "screenshot/david_warner_rating.png" });

});