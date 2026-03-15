import { test, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

test("Submit multiple student registrations using JSON data", async ({ page }) => {

    const data = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../test_data/students.json"), "utf-8")
    )

    await page.goto("https://demoqa.com/automation-practice-form")

    for (const student of data.students) {

        await page.fill('#firstName', student.firstName)

        await page.fill('#lastName', student.lastName)

        await page.fill('#userEmail', student.email)

        await page.locator(`label:has-text("${student.gender}")`).click()

        await page.fill('#userNumber', student.phone)

        await page.click('#dateOfBirthInput')
        await page.locator('.react-datepicker__year-select').selectOption("1998")
        await page.locator('.react-datepicker__month-select').selectOption("4")
        await page.click('.react-datepicker__day--015')

        await page.locator('label:has-text("Sports")').click()

        await page.setInputFiles('#uploadPicture',
            path.join(__dirname, "../uploads/profile.jpg")
        )

        await page.fill('#currentAddress', student.address)

        await page.locator('#state').click()
        await page.locator(`div:has-text("${student.state}")`).click()

        await page.locator('#city').click()
        await page.locator(`div:has-text("${student.city}")`).click()

        await page.click('#submit')

        await page.waitForSelector('.modal-content')

        const modalText = await page.locator('.table').innerText()

        await expect(modalText).toContain(student.firstName)
        await expect(modalText).toContain(student.lastName)
        await expect(modalText).toContain(student.email)
        await expect(modalText).toContain(student.phone)
        await expect(modalText).toContain(student.address)

        await page.click('#closeLargeModal')

        await page.reload()
    }
})