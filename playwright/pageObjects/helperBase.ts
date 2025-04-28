import { Page } from "@playwright/test";
import * as fs from "fs/promises";
import faker from "@faker-js/faker";
import path = require("node:path");

export class HelperBase {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPage(url: string) {
    await this.page.goto(url);
  }

  async loadGraphQL(filePath: string): Promise<string> {
    const absolutePath = path.join(__dirname, filePath);
    const buffer = await fs.readFile(absolutePath, "utf-8");
    return buffer.toString();
  }

  generateFirstName() {
    return faker.name.firstName();
  }

  generateLastName() {
    return faker.name.firstName();
  }

  generateEmail() {
    return faker.internet.email();
  }

  generatePhoneNumber() {
    return faker.phone.phoneNumber('1234567890');
  }

  generateBankName() {
    return faker.company.companyName();
  }

}

