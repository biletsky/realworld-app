import { HelperBase } from "./helperBase";
import { Page, expect } from "@playwright/test";

export class BankAccountPage extends HelperBase {

  constructor(page: Page) {
    super(page);
  }

  async clickCreateButton() {
    await this.page.getByRole('button', {name: 'Create'}).click();
  }

  async fllCreateBankAccountForm(bankName: string, routingNumber: string, accountNumber: string) {
    await this.page.getByPlaceholder("Bank Name").fill(bankName);
    await this.page.getByPlaceholder("Routing Number").fill(routingNumber);
    await this.page.getByPlaceholder("Account Number").fill(accountNumber);
  }

  async clickSaveButton() {
    await this.page.getByRole('button', {name: 'Save'}).click();
  }

  async checkTheBankAccountListContains(bankAccount: string) {
    await expect(this.page.locator(" [data-test=bankaccount-list] li div p").last()).toContainText(bankAccount);
  }

  async deleteBankAccount(bankAccount: string) {
    const listItem = this.page.locator('[data-test=bankaccount-list] li div', { hasText: bankAccount }).first();
    await expect(listItem).toBeVisible();
    const deleteButton = listItem.getByRole('button', { name: 'Delete' });
    await deleteButton.click();
  }

}