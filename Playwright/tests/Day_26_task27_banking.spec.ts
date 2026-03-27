import {expect, test} from "@playwright/test"
import Login from "../Pages/login.page"
import Account from "../Pages/account.page"
import path from "path"
import fs from "fs"

const data = fs.readFileSync(path.join(__dirname, "../test-data/testData.json"), 'utf-8')
const jsonData = JSON.parse(data)


// why we have done this ?
test.use({
  launchOptions : {
    slowMo : 500
  }
})


test("Banking Application", async({page}) => {
  page.on("dialog", async d => {
    await d.accept();
  })

  test.slow()
  await page.goto(jsonData.url)

  const login = new Login(page);
  await login.addNewCustomer();
  await login.createAccount();

  const account = new Account(page);
  await account.accountLogin()
  await account.depositAmount()
  await account.withdrawAmount()

})