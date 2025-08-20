import { HelperBase } from "./helperBase";
import { Download } from "@playwright/test";
import { paths } from "../utils/paths";
import {expect} from "@playwright/test"

export class UploadDownloadPage extends HelperBase {

  async downloadExcel(): Promise<Download> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.getByRole("button", { name: "Download" }).click()
    ]);
    return download;
  }

  async uploadExcel() {
    const input = await this.page.locator('input[type="file"]');
    await input.setInputFiles(paths.downloadedPath);
  }

  async successTextIsVisible() {
    await this.page.locator('.Toastify__toast--success').isVisible();
  }

  async findValueInTable(expectedText: string) {
    const table = await this.page.getByRole("table");
    const cell = await table.getByRole("cell");
    const matchingCell = cell.filter({ hasText: expectedText });
    await expect(matchingCell).toHaveCount(1);
}}