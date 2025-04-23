import { expect, test } from "@playwright/test";
import { PageManager } from "../../pageObjects/pageManager";

test.describe("guest user tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Should register a new account", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.signUpPage.navigateToPage(("/signup"));
    await pm.signUpPage.fillTheSignUpForm(pm.generateFirstName(), pm.generateLastName(), pm.generateFirstName() + "_" + pm.generateLastName(), "123123", "123123");
    await pm.signUpPage.clickSignUpButton();
    await expect(page).toHaveURL("/signin");
  });
});

test.describe("auth user tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    await pm.signInPage.fillSignInForm("TestUser", "123123");
    await pm.signInPage.clickSignInButton();
  });


  test("Should log in with existing account and check the data", async ({ page }) => {
    const pm = new PageManager(page);
    expect(pm.accountPage.userSettings.isVisible());
    await expect(pm.accountPage.userName).toHaveText("@TestUser");
    await pm.accountPage.clickTheFirstTransaction();
    await expect(pm.accountPage.transactionDetailHeader).toHaveText("Transaction Detail");
    await expect(pm.accountPage.userBalance).toHaveText("$0.00");
  });

  test("Should update account user settings", async ({ page }) => {
    const pm = new PageManager(page);
    const firstName = pm.generateFirstName();
    const lastName = pm.generateLastName();
    await pm.accountPage.clickAccountDetailsLink();
    await expect(page.getByText("User Settings")).toBeVisible();
    await pm.settingsPage.fillTheAccountForm(firstName, lastName, pm.generateEmail(), pm.generatePhoneNumber());
    await pm.settingsPage.clickSaveButton();
    await expect(pm.settingsPage.firstName).toHaveValue(firstName);
    await expect(pm.settingsPage.lastName).toHaveValue(lastName);
  });

  test("Should add new bank account and delete", async ({ page }) => {
    const pm = new PageManager(page);
    await pm.accountPage.clickBankAccountsLink();
    await pm.bankAccountPage.clickCreateButton();
    const bankName = pm.generateBankName();
    await pm.bankAccountPage.fllCreateBankAccountForm(bankName, "123123123", "123123123");
    await pm.bankAccountPage.clickSaveButton();
    expect(await pm.bankAccountPage.checkTheBankAccountListContains(bankName));
    await pm.bankAccountPage.deleteBankAccount(bankName);
    expect(await pm.bankAccountPage.checkTheBankAccountListContains(bankName + " (Deleted)"));
  });

});