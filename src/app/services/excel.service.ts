import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {

  constructor() {
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = {Sheets: {'data': myworksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(myworkbook, {bookType: 'xlsx', type: 'array'});
    ExcelService.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private static saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }
}
