import {test, expect} from "@playwright/test"
import ExcelJS from "exceljs"
import * as path from "path"

test("Reading data from excel", async({page}) => {

    const book = new ExcelJS.Workbook()

    await book.xlsx.readFile(
        path.join(__dirname, "Playwright\tests\readexcel.xlsx")
    )

    const sheet = book.getWorksheet("Sheet1")

    if (!sheet) {
        console.log("Sheet not found");
        return
    }

    const totalRows = sheet.rowCount

    for (let i=2 ; i <= totalRows ; i++) {
        
        const firstNameValue = sheet.getRow(i).getCell(1).value
        const lastNameValue = sheet.getRow(i).getCell(2).value
        const emailValue = sheet.getRow(i).getCell(3).value
        const genderValue = sheet.getRow(i).getCell(4).value
        const mobileValue = sheet.getRow(i).getCell(5).value
        const subjectValue = sheet.getRow(i).getCell(6).value
        const addressValue = sheet.getRow(i).getCell(7).value
        const stateValue = sheet.getRow(i).getCell(8).value
        const cityValue = sheet.getRow(i).getCell(9).value


        await page.goto("https://demoqa.com/automation-practice-form")

        await page.locator('#firstName').fill(String(firstNameValue))
        await page.locator('#lastName').fill(String(lastNameValue))
        await page.locator('#userEmail').fill(String(emailValue))

        await page.locator(`//label[text()='${genderValue}']`).click()

        await page.locator('#userNumber').fill(String(mobileValue))
        
        await page.locator('#subjectsInput').fill(String(subjectValue))
        await page.keyboard.press("Enter")

        await page.locator("#hobbies-checkbox-1]").click()

        await page.locator('#currentAddress').fill(String(addressValue))

        await page.locator('#state').selectOption({value : `${stateValue}`})

        await page.locator('#city').selectOption({value : `${cityValue}`})

        await page.locator('#submit').click()

        await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText("Thanks for submitting the form")

        await page.locator('#closeLargeModal').click()
    }


})