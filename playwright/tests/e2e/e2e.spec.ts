import { expect } from "@playwright/test";
import { test  } from "../../fixtures/base";

test.describe("guest user tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Should register a new account", async ({ page, pageManager, testData }) => {
    await pageManager.signUpPage.navigateToPage(("/signup"));
    await pageManager.signUpPage.fillTheSignUpForm(testData.generateFirstName(), testData.generateLastName(), testData.generateFirstName() + "_" + testData.generateLastName(), "123123", "123123");
    await pageManager.signUpPage.clickSignUpButton();
    await expect(page).toHaveURL("/signin");
  });
});

test.describe("auth user tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.beforeEach(async ({ pageManager }) => {
    await pageManager.signInPage.fillSignInForm("TestUser", "123123");
    await pageManager.signInPage.clickSignInButton();
  });


  test("Should log in with existing account and check the data", async ({ pageManager }) => {
    expect(pageManager.accountPage.userSettings.isVisible());
    await expect(pageManager.accountPage.userName).toHaveText("@TestUser");
    await pageManager.accountPage.clickTheFirstTransaction();
    await expect(pageManager.accountPage.transactionDetailHeader).toHaveText("Transaction Detail");
    await expect(pageManager.accountPage.userBalance).toHaveText("$0.00");
  });

  test("Should update account user settings", async ({ page, pageManager, testData }) => {
    const firstName = testData.generateFirstName();
    const lastName = testData.generateLastName();
    await pageManager.accountPage.clickAccountDetailsLink();
    await expect(page.getByText("User Settings")).toBeVisible();
    await pageManager.settingsPage.fillTheAccountForm(firstName, lastName, testData.generateEmail(), testData.generatePhoneNumber());
    await pageManager.settingsPage.clickSaveButton();
    await expect(pageManager.settingsPage.firstName).toHaveValue(firstName);
    await expect(pageManager.settingsPage.lastName).toHaveValue(lastName);
  });

  test("Should add new bank account and delete", async ({ pageManager, testData }) => {
    await pageManager.accountPage.clickBankAccountsLink();
    await pageManager.bankAccountPage.clickCreateButton();
    const bankName = testData.generateBankName();
    await pageManager.bankAccountPage.fllCreateBankAccountForm(bankName, "123123123", "123123123");
    await pageManager.bankAccountPage.clickSaveButton();
    expect(await pageManager.bankAccountPage.checkTheBankAccountListContains(bankName));
    await pageManager.bankAccountPage.deleteBankAccount(bankName);
    expect(await pageManager.bankAccountPage.checkTheBankAccountListContains(bankName + " (Deleted)"));
  });

});