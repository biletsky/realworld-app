import {expect, test} from "@playwright/test";
import { PageManager } from "../../pageObjects/pageManager";
import faker from "@faker-js/faker";

test.describe('guest user tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Should register a new account', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.signUpPage.navigateToPage(('/signup'));
    await pm.signUpPage.fillTheSignUpForm(faker.name.firstName(), faker.name.lastName(), faker.name.firstName + '_'+ faker.name.lastName, '123123','123123');
    await pm.signUpPage.clickSignUpButton();
    await expect(page).toHaveURL('/signin');
  });
})

test.describe('auth user tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    const pm = new PageManager(page);
    await pm.signInPage.fillSignInForm('TestUser', '123123');
    await pm.signInPage.clickSignInButton();
  });


  test('Should log in with existing account and check the data', async ({ page }) => {
    const pm = new PageManager(page);
    expect(page.locator("[data-test=sidenav-user-settings]").isVisible());
    await expect(page.locator("[data-test=sidenav-username]")).toHaveText('@TestUser');
    await pm.accountPage.clickTheFirstTransaction();
    await expect(page.locator('[data-test=transaction-detail-header]')).toHaveText('Transaction Detail');
    await expect(page.locator('[data-test=sidenav-user-balance]')).toHaveText('$0.00');
  });

  test('Should update account user settings', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.accountPage.clickAccountDetailsLink();
    await expect(page.getByText('User Settings')).toBeVisible();
    await pm.settingsPage.fillTheAccountForm('Jack', 'Lowrence', '123@ae.com', '123123564');
    await pm.settingsPage.clickSaveButton();
    await expect(pm.settingsPage.firstName).toHaveValue('Jack');
    await expect(pm.settingsPage.lastName).toHaveValue('Lowrence');
  });

  test('Should add new bank account and delete', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.accountPage.clickBankAccountsLink();
    await pm.bankAccountPage.clickCreateButton();
    const bankName = faker.company.companyName();
    await pm.bankAccountPage.fllCreateBankAccountForm(bankName, '123123123', '123123123');
    await pm.bankAccountPage.clickSaveButton();
    expect(await pm.bankAccountPage.checkTheBankAccountListContains(bankName));
    await pm.bankAccountPage.deleteBankAccount(bankName);
    expect(await pm.bankAccountPage.checkTheBankAccountListContains(bankName + ' (Deleted)'));
  });

});