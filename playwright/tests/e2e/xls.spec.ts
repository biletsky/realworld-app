import { test  } from "../../fixtures/base";
import { paths } from "../../utils/paths";
import { XslService } from "../../utils/xlsService";

test("replace the value in xls table", async ({pageManager}) => {
  await pageManager.navigateToPage("https://rahulshettyacademy.com/upload-download-test/index.html");
  const download = await pageManager.uploadDownloadPage.downloadExcel();
  await download.saveAs(paths.downloadedPath);
  await XslService.modifyExcelCell('B3');
  await pageManager.uploadDownloadPage.uploadExcel();
  await pageManager.uploadDownloadPage.successTextIsVisible();
  await pageManager.uploadDownloadPage.findValueInTable("Modified");
})

test("search and replace the value in xls table", async ({pageManager}) => {
  await pageManager.navigateToPage("https://rahulshettyacademy.com/upload-download-test/index.html");
  const download = await pageManager.uploadDownloadPage.downloadExcel();
  await download.saveAs(paths.downloadedPath);
  await XslService.searchAndModifyExcel('Papaya', 'Football');
  await pageManager.uploadDownloadPage.uploadExcel();
  await pageManager.uploadDownloadPage.successTextIsVisible();
  await pageManager.uploadDownloadPage.findValueInTable("Football");
})
