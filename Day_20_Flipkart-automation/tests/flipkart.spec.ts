import { test } from "@playwright/test"
import HomePage from "../pages/home.page"
import StorePage from "../pages/store.page"
import CartPage from "../pages/cart.page"
import fs from "fs"
import path from "path"

const data = JSON.parse(
fs.readFileSync(
path.join(__dirname,"../test-data/data.json"),
"utf-8"
))

test("Flipkart Gudi Padwa Store Purchase", async ({ page }) => {

    const home = new HomePage(page)
    const store = new StorePage(page)
    const cart = new CartPage(page)

    await home.goto(data.url)

    await home.openGudiPadwaStore()

    await store.selectProduct(data.productIndex1)
    await store.addToCart()

    await page.goBack()

    await store.selectProduct(data.productIndex2)
    await store.addToCart()

    await cart.increaseQuantityForAll()

    await cart.placeOrder()

    await page.screenshot({path : `screenshot/flipkart-automation`})

})