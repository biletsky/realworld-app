import { HelperBase } from "./helperBase";
import { Page } from "@playwright/test";

export class SignInPage extends HelperBase {

  constructor(page: Page) {
    super(page);
  }

  async fillSignInForm(username: string, password: string) {
    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);
  }

  async clickSignInButton() {
    await this.page.getByRole("button", { name: "Sign In" }).click();
  }

}