import { test as baseTest } from "@playwright/test";
import { PageManager } from "../pageObjects/pageManager";
import { TestDataGenerator } from "../utils/testDataGenerator";

interface MyFixtures {
  pageManager: PageManager;
  testData: TestDataGenerator;
}

export const test = baseTest.extend<MyFixtures>({
  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },

  testData: async ({}, use) => {
    const generator = new TestDataGenerator();
    await use(generator);
  },
});