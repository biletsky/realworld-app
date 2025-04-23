import { HelperBase } from "./helperBase";
import { Page } from "@playwright/test";

export class SettingsPage extends HelperBase {

  firstName = this.page.getByPlaceholder("First Name");
  lastName = this.page.getByPlaceholder("Last Name");
  email = this.page.getByPlaceholder("Email");
  phone = this.page.getByPlaceholder("Phone");


  async fillTheAccountForm(firstName: string, lastName: string, email: string, phone: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.phone.fill(phone);
  }

  async clickSaveButton() {
    await this.page.getByRole("button", { name: "Save" }).click();
  }

}