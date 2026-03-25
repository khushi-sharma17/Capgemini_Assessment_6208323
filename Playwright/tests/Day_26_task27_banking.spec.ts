import { test, expect } from '@playwright/test';
import { BankingPage } from '../Pages/banking.page';
import testData from '../test-data/testData.json';

test('E2E Banking Flow', async ({ page }) => {
  const banking = new BankingPage(page);

  const fullName = `${testData.customer.firstName} ${testData.customer.lastName}`;

  await banking.goto(testData.url);

  await banking.loginAsManager();

  await banking.addCustomer(
    testData.customer.firstName,
    testData.customer.lastName,
    testData.customer.postCode
  );

  await banking.openAccount(fullName);

  await banking.switchToCustomerLogin();

  await banking.loginCustomer(fullName);

  await banking.deposit(testData.transaction.depositAmount);

  await banking.withdraw(testData.transaction.withdrawAmount);

  const balance = await banking.getBalance();
  const expectedBalance =
    Number(testData.transaction.depositAmount) -
    Number(testData.transaction.withdrawAmount);

  expect(balance).toBe(expectedBalance);

  await banking.logout();
});