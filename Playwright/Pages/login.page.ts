import {Locator, expect, Page} from "@playwright/test"
import path from "path"
import fs from "fs"
const data = fs.readFileSync(path.join(__dirname, "../test-data/testData.json"), 'utf-8')
const jsonData = JSON.parse(data)

class Banking {

  bankManagerLoginButton : Locator
  addCustomerButton : Locator
  firstName : Locator
  lastName : Locator
  postalCode : Locator
  submitButton : Locator

  openAccountButton : Locator
  customerName : Locator
  currency : Locator
  processButton : Locator
  homeButton : Locator

  jsData : any = jsonData
  page : Page

  constructor(page : Page) {
    this.page = page
    this.bankManagerLoginButton = page.getByRole("button", {name : "Bank Manager Login"})
    this.addCustomerButton = page.getByRole("button", {name : "Add Customer "})
    this.firstName = page.getByPlaceholder("First Name")
    this.lastName = page.getByPlaceholder("Last Name")
    this.postalCode = page.getByPlaceholder("Post Code")
    this.submitButton = page.getByRole("button", {name : "Add Customer"}).last()    
    // why .last() here above ?
    this.openAccountButton = page.getByRole("button", {name : "Open Account "})
    this.customerName = page.locator("#userSelect")
    this.currency = page.locator("#currency")
    this.processButton = page.getByRole("button", {name : "Process"})
    this.homeButton = page.getByRole("button", {name : "Home"})
  }

  async addNewCustomer() {
    await this.bankManagerLoginButton.click()
    await this.addCustomerButton.click()
    await this.firstName.fill(this.jsData.customer.firstName)
    await this.lastName.fill(this.jsData.customer.lastName)
    await this.postalCode.fill(this.jsData.customer.postCode)
    await this.submitButton.click()
  }


  async createAccount() {
    await this.openAccountButton.click()
    await this.customerName.selectOption({label : `${this.jsData.customer.firstName} ${this.jsData.lastName}`})
    // await this.currency.selectOption({value : "Rupee"})
    await this.currency.selectOption("Rupee")
    await this.processButton.click()
    await this.homeButton.click()
  }
}


export default Banking