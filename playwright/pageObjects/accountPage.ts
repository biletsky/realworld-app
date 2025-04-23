import { HelperBase } from "./helperBase";
import { Page } from "@playwright/test";

export class AccountPage extends HelperBase {

  constructor(page: Page) {
    super(page);
  }

  async clickAccountDetailsLink() {
    await this.page.getByText('My account').click();
  }

  async clickBankAccountsLink() {
    await this.page.getByText('Bank Accounts').click();
  }

  async clickTheFirstTransaction() {
    await this.page.locator('[data-test="transaction-list"] .MuiListItem-root').first().click();
  }

}
