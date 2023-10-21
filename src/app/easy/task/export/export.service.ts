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
    doc.autoTable({
      margin: { top: 20 },
      body: _topHeader
    });

    doc.autoTable({
      columnStyles: { },
      body: body,
      columns: tableColumn,
    });
    doc.save(reportTitle.indexOf('.pdf') !== -1 ? reportTitle : reportTitle + '.pdf');
  }

  public exportAsPDFForCustomerPrint(reportTitle: string, header: any[][], tableColumn:any, body:any, isLandscap: boolean): void { 
    const doc = isLandscap ? new jsPDF('l','pt'): new jsPDF();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
    let colSpan :number = header.length == 0 ? 1 : header[0].length;

    let _topHeader:any[]=[[
      {
        content: reportTitle,
        styles: {
          valign: 'middle',
          halign: 'center',
          fontSize: 14,
          fontStyle: 'bold',
          fillColor: [255, 255, 255],
        }
      },
    ]];
    doc.autoTable({
      margin: { top: 20 },
      body: _topHeader
    });

    doc.autoTable({
      columnStyles: {  },
      body: body,
      columns: tableColumn,
      headStyles: { fillColor: [255, 255, 255], valign: 'middle', halign: 'center', textColor: [0, 0, 0] },
      bodyStyles: { fillColor: [255, 255, 255], valign: 'middle', halign: 'center' }
    });
    doc.autoTable({
      columnStyles: { 
        0: { fillColor: [255, 255, 255] },
        1: { fillColor: [255, 255, 255] }
      },
      margin: { top: 20 },
      body: header
    });
    doc.save(reportTitle.indexOf('.pdf') !== -1 ? reportTitle : reportTitle + '.pdf');
  }
}
