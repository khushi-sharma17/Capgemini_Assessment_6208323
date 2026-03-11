import {test} from "@playwright/test"

test("Gmail Login", async({page}) => {
    
    await page.goto("https://mail.google.com/", { waitUntil: "domcontentloaded" })

    // test.setTimeout(60000)

    await page.getByText("Compose").click()

    // compose
    // await page.locator("//div[@class='T-I T-I-KE L3']").click()
    
    await page.click("//div[@class='aoD hl']")
    await page.keyboard.type("khushi.sharma59559@gmail.com")
    
    await page.locator("//input[@name='subjectbox']").click()
    await page.keyboard.type("Playwright Test Mail")

    await page.locator("//div[@aria-label='Message Body']").click()
    await page.keyboard.type("Hi, How are you !!")

    await page.getByText("Send").click()

    // await page.keyboard.press("Control+Enter")
    
    // await page.locator("//div[@class='T-I J-J5-Ji aoO v7 T-I-atl L3']").click()

    await page.screenshot({path : "screenshot/task13.png", fullPage : true})

})




// // import { test } from "@playwright/test"

// test("Gmail Login test", async ({ page }) => {

//   await page.goto("https://mail.google.com/")

//   // Enter Email
//   await page.getByLabel("Email or phone").fill("khushiastrogeek@gmail.com")
//   await page.getByRole("button", { name: "Next" }).click()

//   // Enter Password
//   await page.getByLabel("Enter your password").fill("khushi@cosmos89U")
//   await page.getByRole("button", { name: "Next" }).click()

//   // Wait for inbox
//   await page.waitForSelector("//div[text()='Compose']")

//   // Click Compose
//   await page.getByText("Compose").click()

//   // Fill To field
//   await page.locator("//textarea[@name='to']").fill("khushi.sharma59559@gmail.com")

//   // Subject
//   await page.locator("//input[@name='subjectbox']").fill("Playwright Test")

//   // Message
//   await page.locator("//div[@aria-label='Message Body']").fill("Hi, How are you!!")

//   // Send
//   await page.keyboard.press("Control+Enter")

//   // Screenshot
//   await page.screenshot({ path: "gmail.png", fullPage: true })

// })