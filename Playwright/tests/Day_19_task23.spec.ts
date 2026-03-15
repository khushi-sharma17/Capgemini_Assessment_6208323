import { test, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

test("Search multiple products and validate details", async ({ page }) => {

    const data = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../test_data/products.json"), "utf-8")
    )

    await page.goto("https://www.amazon.in")

    for (const product of data.products) {

        await page.fill('#twotabsearchtextbox', product)
        await page.click('#nav-search-submit-button')

        await page.waitForSelector('div[data-component-type="s-search-result"]')

        const firstProduct = page.locator('div[data-component-type="s-search-result"] h2 a').first()
        const firstProductTitle = await firstProduct.innerText()

        console.log("First product in results:", firstProductTitle)

        const [newPage] = await Promise.all([
            page.context().waitForEvent("page"),
            firstProduct.click()
        ])

        await newPage.waitForLoadState()

        const title = await newPage.locator('#productTitle').innerText()

        const price = await newPage.locator('.a-price .a-offscreen').first().innerText()

        const rating = await newPage.locator('#acrPopover').getAttribute('title')

        await expect(title).toBeTruthy()
        await expect(price).toBeTruthy()
        await expect(rating).toBeTruthy()

        console.log("Product Title:", title)
        console.log("Price:", price)
        console.log("Rating:", rating)

        await newPage.close()

        await page.fill('#twotabsearchtextbox', "")
    }

})