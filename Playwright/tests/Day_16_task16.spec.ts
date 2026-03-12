import { test, expect } from '@playwright/test';

test("saucedemo dropdown sorting", async ({ page }) => {

  await page.goto("https://www.saucedemo.com")
  await page.locator("#user-name").fill("standard_user")
  await page.locator("#password").fill("secret_sauce")
  await page.locator("#login-button").click()
  await page.locator(".product_sort_container").click()
  await page.locator('.product_sort_container').selectOption("lohi")

  let prices = await page.locator(".inventory_item_price").all()
  let priceList = []

  for (let p of prices) {
    const text : any = await p.textContent()
    let value = parseFloat(text.replace("$",""))
    priceList.push(value)
  }

  console.log(priceList)

  let firstProduct = await page.locator(".inventory_item").first()
  await firstProduct.locator("button").click()
  await expect(firstProduct.locator("button")).toHaveText("Remove")
  await expect(page.locator(".shopping_cart_badge")).toHaveText("1")

})