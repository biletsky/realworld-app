import { HelperBase } from "./helperBase";

export class AccountPage extends HelperBase {

  userSettings = this.page.locator("[data-test=sidenav-user-settings]");
  userName = this.page.locator("[data-test=sidenav-username]");
  transactionDetailHeader = this.page.locator("[data-test=transaction-detail-header]");
  userBalance = this.page.locator("[data-test=sidenav-user-balance]");

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
