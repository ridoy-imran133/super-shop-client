import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }


  public exportAsPDF(reportTitle: string, header: any[][], tableColumn:any, body:any, isLandscap: boolean): void {
    
    const doc = isLandscap ? new jsPDF('l','pt'): new jsPDF();
    
    let colSpan :number = header.length == 0 ? 1 : header[0].length;

    let _topHeader:any[]=[[
      {
        content: reportTitle,
        colSpan: colSpan,
        rowSpan: 1,
        styles: {
          valign: 'middle',
          halign: 'center',
          fontSize: 14,
          fontStyle: 'bold'
        }
      },""
    ]];
    header.forEach(element => {
      _topHeader.push(element);      
    });
// need jspdf version 3.5.22
    doc.autoTable({
      margin: { top: 20 },
      body: _topHeader,
    });

    doc.autoTable({
      columnStyles: { },
      body: body,
      columns: tableColumn,
    })

    doc.save(reportTitle.indexOf('.pdf') !== -1 ? reportTitle : reportTitle + '.pdf');
  }
}
