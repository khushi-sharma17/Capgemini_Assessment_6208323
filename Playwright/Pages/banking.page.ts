import { Page, expect } from '@playwright/test';

export class BankingPage {
  constructor(private page: Page) {}

  // Locators
  bankManagerLoginBtn = 'button[ng-click="manager()"]';
  addCustomerTab = 'button[ng-click="addCust()"]';
  openAccountTab = 'button[ng-click="openAccount()"]';
  customersTab = 'button[ng-click="showCust()"]';

  firstNameInput = 'input[ng-model="fName"]';
  lastNameInput = 'input[ng-model="lName"]';
  postCodeInput = 'input[ng-model="postCd"]';
  addCustomerBtn = 'button[type="submit"]';

  customerDropdown = '#userSelect';
  currencyDropdown = '#currency';
  processBtn = 'button[type="submit"]';

  homeBtn = 'button[ng-click="home()"]';
  customerLoginBtn = 'button[ng-click="customer()"]';
  loginBtn = 'button[type="submit"]';

  depositTab = 'button[ng-click="deposit()"]';
  withdrawTab = 'button[ng-click="withdrawl()"]';
  amountInput = 'input[ng-model="amount"]';
  submitBtn = 'button[type="submit"]';

  balanceText = 'strong.ng-binding:nth-child(2)';
  logoutBtn = 'button[ng-click="byebye()"]';

  // Actions
  async goto(url: string) {
    await this.page.goto(url);
  }

  async loginAsManager() {
    await this.page.click(this.bankManagerLoginBtn);
  }

  async addCustomer(first: string, last: string, post: string) {
    await this.page.click(this.addCustomerTab);
    await this.page.fill(this.firstNameInput, first);
    await this.page.fill(this.lastNameInput, last);
    await this.page.fill(this.postCodeInput, post);
    await this.page.click(this.addCustomerBtn);
    await this.page.on('dialog', dialog => dialog.accept());
  }


  async openAccount(customerName: string) {
    await this.page.click(this.openAccountTab);
    await this.page.selectOption(this.customerDropdown, { label: customerName });
    await this.page.selectOption(this.currencyDropdown, 'Rupee');
    await this.page.click(this.processBtn);
    await this.page.on('dialog', dialog => dialog.accept());
  }

  async switchToCustomerLogin() {
    await this.page.click(this.homeBtn);
    await this.page.click(this.customerLoginBtn);
  }

  async loginCustomer(name: string) {
    await this.page.selectOption(this.customerDropdown, { label: name });
    await this.page.click(this.loginBtn);
  }

  async deposit(amount: string) {
    await this.page.click(this.depositTab);
    await this.page.fill(this.amountInput, amount);
    await this.page.click(this.submitBtn);
  }


  async withdraw(amount: string) {
    await this.page.click(this.withdrawTab);
    await this.page.fill(this.amountInput, amount);
    await this.page.click(this.submitBtn);
  }

  async getBalance(): Promise<number> {
    const balance = await this.page.textContent(this.balanceText);
    return Number(balance);
  }


  async logout() {
    await this.page.click(this.logoutBtn);
  }
}