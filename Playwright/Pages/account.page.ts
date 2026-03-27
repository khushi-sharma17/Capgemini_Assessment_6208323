import {Locator, expect, Page} from "@playwright/test"
import path from "path"
import fs from "fs"
const data = fs.readFileSync(path.join(__dirname, "../test-data/testData.json"), 'utf-8')
const jsondata = JSON.parse(data)


class Account {
    
    page : Page
    jsData : any = jsondata

    customerLoginButton : Locator
    nameSelect : Locator
    loginButton : Locator

    depositButton : Locator
    depositMoneyTextField : Locator
    depositMoneyButton : Locator

    withdrwawButton : Locator
    withdrawMoneyTextField : Locator
    withdrawMoneyButton : Locator

    balance : Locator

    constructor(page : Page) {
        this.page = page
        this.customerLoginButton = page.getByRole("button", {name : "Customer Login"})
        this.nameSelect = page.locator('#userSelect')
        this.loginButton = page.getByRole("button", {name : "Login"})

        this.depositButton = page.getByRole("button", {name : "Deposit ", exact : true})
        this.depositMoneyTextField = page.getByPlaceholder("amount")
        this.depositMoneyButton = page.getByRole("button", {name : "Deposit ", exact : true}).last()

        this.withdrwawButton = page.getByRole("button",{name : "Withdrawl ", exact : true})
        this.withdrawMoneyTextField = page.getByPlaceholder("amount")
        this.withdrawMoneyButton = page.getByRole("button",{name:"Withdraw",exact:true}).last()

        // check it once again
        this.balance = page.locator('(//div[@ng-hide="noAccount"]/strong)[2]')
    }


    async accountLogin() {
        await this.customerLoginButton.click()
        await this.nameSelect.selectOption({label : `${this.jsData.customer.firstName} ${this.jsData.customer.lastName}`})
        await this.loginButton.click()
    }


    async depositAmount() {
        await this.depositButton.click()
        await this.depositMoneyTextField.fill(this.jsData.transaction.depositAmount)
        await this.depositMoneyButton.click()

        const balanceAmount = this.balance
        await expect(balanceAmount).toHaveText(this.jsData.transaction.depositAmount)       // exact match for toHaveText
    }

    async withdrawAmount() {

        await this.withdrwawButton.click()
        // await this.page.waitForSelector(this.withdrawMoneyTextField)
        await this.withdrawMoneyTextField.fill(this.jsData.transaction.withdraw)
        await this.withdrawMoneyButton.click()

        const balanceAmount = this.balance
        // await this.page.waitForSelector(balanceAmount)
        await expect(balanceAmount).toHaveText(this.jsData.transaction.afterWithdraw)
    }
}


export default Account