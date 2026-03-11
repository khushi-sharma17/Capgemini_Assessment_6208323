import {test} from "@playwright/test"

test("Locate Bangalore in Store Locator", async({page}) => {

    await page.goto("https://www.lenskart.com/", { waitUntil: "domcontentloaded" })

    test.setTimeout(60000)
    
    await page.locator("//a[@id='lrd9']").hover()
    // await page.getByText("Store Locator").hover()

    await page.getByText("Locate a Store").click()

    await page.getByPlaceholder("Search by State/Pincode/Locality").fill("Bangalore")

    await page.locator("//div[text()='Bangalore, Karnataka, India']").click()
    
    // await page.keyboard.press("Enter")  
})