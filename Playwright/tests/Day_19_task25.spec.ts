import { test, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

test("Login → Update Profile → Logout using JSON data", async ({ page }) => {

    const data = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../test_data/users.json"), "utf-8")
    )

    for (const user of data.users) {

        await page.goto("https://demoqa.com/login")

        await page.fill('#userName', user.username)

        await page.fill('#password', user.password)

        await page.click('#login')

        await expect(page).toHaveURL(/profile/)

        await page.click('text=Edit Profile')

        await page.fill('#firstName', user.newFirstName)
        await page.fill('#lastName', user.newLastName)
        await page.fill('#email', user.email)

        await page.click('#saveProfile')

        const profileText = await page.locator('.profile-info').innerText()

        await expect(profileText).toContain(user.newFirstName)
        await expect(profileText).toContain(user.newLastName)
        await expect(profileText).toContain(user.email)

        await page.click('#submit')

        await expect(page).toHaveURL(/login/)
    }

})