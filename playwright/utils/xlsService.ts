import * as XLSX from "xlsx";
import { paths } from "./paths";

export class XslService {

static async modifyExcelCell(cell: string) {
  const downloadedPath = paths.downloadedPath;
  const workbook = XLSX.readFile(downloadedPath)
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  XLSX.utils.sheet_add_aoa(worksheet, [['Modified']], {origin:cell});
  XLSX.writeFile(workbook, downloadedPath)
}

  static async searchAndModifyExcel(searchValue: string, modifyValue: string) {
    const downloadedPath = paths.downloadedPath;
    const workbook = XLSX.readFile(downloadedPath)
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');

    let found = false;

    for(let row= range.s.r; row < range.e.r; row++) {
      for (let col = range.s.c; col < range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({r:row,c:col});
        const cell = worksheet[cellAddress];

        if(cell?.v === searchValue) {
          found = true;
          cell.v = modifyValue;
          console.log(`${searchValue} value is found and modified, cell address is: ${cellAddress}`);
        }
      }
    }

    if(!found) {
      console.warn(`Could not find cell address: ${searchValue}`);
    }

    XLSX.writeFile(workbook, downloadedPath)
  }

}

