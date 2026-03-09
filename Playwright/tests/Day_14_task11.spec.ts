import {test, expect} from "@playwright/test"

test("", async({page}) => {

    await page.setDefaultTimeout(20000)

    await page.goto("https://demoapps.qspiders.com/ui/login")

    await page.getByPlaceholder("Enter your email", {exact : true}).fill("khushi123@gmail.com")

    await page.getByPlaceholder("Enter your password", {exact : true}).fill("password123")

    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();

    const email = page.locator("//input[@type='email']")
    const password = page.locator("//input[@type='password']")

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(email).toBeAttached()  
    await expect(password).toBeAttached()

    // await expect(email).toHaveScreenshot()
    // await expect(password).toHaveScreenshot()

    // await expect(email)toContainClass()
    // await expect(password).not.toContainClass()

    await page.screenshot({path :"screenshot/login_demo.png"})
})