import { test, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

test("Login → Add Book → Verify Collection → Logout", async ({ page }) => {

    const data = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../test_data/userData.json"), "utf-8")
    )

    const user = data.user
    const bookName = data.book

    await page.goto("https://demoqa.com/books")

    await page.click('text=Login')

    await page.click('#newUser')

    await page.fill('#firstname', user.firstName)
    await page.fill('#lastname', user.lastName)
    await page.fill('#userName', user.username)
    await page.fill('#password', user.password)

    console.log("Solve captcha manually before continuing")

    await page.pause()

    await page.click('#register')

    await page.goto("https://demoqa.com/login")

    await page.fill('#userName', user.username)
    await page.fill('#password', user.password)
    await page.click('#login')

    await expect(page).toHaveURL(/profile/)

    await page.click('text=Book Store')

    await page.fill('#searchBox', bookName)

    await page.locator('a').filter({ hasText: bookName }).click()

    page.on('dialog', async dialog => {
        await dialog.accept()
    })

    await page.click('text=Add To Your Collection')

    await page.click('text=Profile')

    const collectionText = await page.locator('.rt-table').innerText()

    await expect(collectionText).toContain(bookName)

    await page.click('#submit')

    await expect(page).toHaveURL(/login/)
    
})