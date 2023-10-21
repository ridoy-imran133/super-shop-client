import { Component, OnInit } from '@angular/core';
import { ReportPerams } from '../../../shared/models/reports/ReportPerams';
import { SalesReport } from '../../../shared/models/reports/SalesReport';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { CommonApiConnectService } from '../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { LocalSessionService } from '../../../shared/_services/local-session.service';
import { ExportService } from '../../../easy/task/export/export.service';

@Component({
  selector: 'ngx-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  public _sales : SalesReport[];
  public _report: ReportPerams;  
  public masterForm: FormGroup; 
  source: LocalDataSource = new LocalDataSource(); 
  submitted = false;
  issearchsection: boolean = true;
  istablesection: boolean = false;
  tablesearch: boolean = false;
  reportname: string;
  constructor(private _CommonService: CommonApiConnectService, private formBuilder: FormBuilder, 
    private _influxToastaService: InfluxToastaService, private _sessionService: LocalSessionService, private exportService:ExportService) { 
      this._report = new ReportPerams();
    }


  ngOnInit(): void {
    this.fromCreate();
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      from_date: ['', ],
      to_date: ['', ],
    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  settings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
    },

    columns: {
      // e_mail:{
      //   type: 'custom',
      //   valuePrepareFunction: (cell, row) => row,
      //   renderComponent: CheckBoxComponent,
      // },
      // c: {
      //   title: '',
      //   type: 'html',
      //   valuePrepareFunction: (value) => { return this._sanitizer.bypassSecurityTrustHtml(this.input); },
      //   filter: false
      // },
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.source.getPaging();
          const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

          return ret;
        },
      },
      cust_no: {
        title: 'Customer No',
        type: 'string',
        show: false
      },
      cust_name: {
        title: 'Customer Name',
        type: 'string',
        width: '250px'
      },
      branch_name: {
        title: 'Branch Name',
        type: 'string',
      },
      work_date: {
        title: 'Work Date',
        type: 'string',
      },
    },
    selectMode: "single",
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 20,
    },
  };

  searchCustomer(){
    // this._report.service_code = this._report.service_code == null ? "" : this._report.service_code;
    // this._report.vendor_code = this._report.vendor_code == null ? "" : this._report.vendor_code;
    // this._report.branch_code = this._report.branch_code == null ? "" : this._report.branch_code;
    // this._report.priority_code = this._report.priority_code == null ? "" : this._report.priority_code;
    // this._report.status_code = this._report.status_code == null ? "" : this._report.status_code;
    // this._report.birth_month = this._report.birth_month == null ? "" : this._report.birth_month;
    this._CommonService.commonPost('ServiceRequest/getServiceRequestData/',this._report)
    .subscribe(
      response => {
        this.source.load([]);
        this._sales = JSON.parse(JSON.stringify(response)).reportData;
        this.source.load(this._sales);
        this.issearchsection = !this.issearchsection;
        this.tablesearch = true;
        this.istablesection = !this.istablesection;
      },
      error => {
      },
      () => {
        // No errors, route to new page
      }
    );

  }

  exportAsXLSX(){
    //let list = JSON.parse(JSON.stringify(response));
    let list = this._sales;
    // this._vasServices.forEach(x => {
    //   if(x.service_code == this._report.service_code){
    //     this.reportname = x.service_name;
    //   }
    // });
    this.reportname = this.reportname == null? "All Service": this.reportname;
    list = list == null ? []: list;
    this.exportService.exportAsExcelFile(list, this.reportname);

    // this._UserService.getAllUsers()
    // .subscribe(
    //   response => {

    //     let list = JSON.parse(JSON.stringify(response));
    //     list = list == null ? []: list;
    //     this.exportService.exportAsExcelFile(list, 'Complain');
        
    //   },
    //   error => {
    //     // this._influxToastaService.showToast('danger', 'Response', error.message);
    //   },
    //   () => {
    //   },
    // );
  }

  clearformdata(){
    this.source.load([]);
  }

  arrowButtonFunction(){
    this.issearchsection = !this.issearchsection;
    this.istablesection = !this.issearchsection;
  }

}
