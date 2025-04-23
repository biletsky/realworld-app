import { HelperBase } from "./helperBase";
import { Page } from "@playwright/test";

export class SignUpPage extends HelperBase {

  constructor(page: Page) {
    super(page);
  }

  async fillTheSignUpForm(firstName: string, lastName: string, userName: string, password: string, confirmPassword: string) {
    await this.page.getByLabel("First Name").fill(firstName);
    await this.page.getByLabel("Last Name").fill(lastName);
    await this.page.getByLabel("Username").fill(userName);
    await this.page.getByLabel("Password *", { exact: true }).fill(password);
    await this.page.getByLabel("Confirm Password *", { exact: true }).fill(confirmPassword);
  }

  async clickSignUpButton() {
    await this.page.getByRole("button", { name: "Sign Up" }).click();
  }

}