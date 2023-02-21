import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { Branch } from '../../models/Branch';
import { Report } from '../../models/Report';
import { Rm } from '../../models/Rm';
import { ServiceRequestData } from '../../models/ServiceRequestData';
import { VasService } from '../../models/VasService';
import { Vendor } from '../../models/Vendor';
import { CommonService } from '../../services/common.service';
import { SessionService } from '../../services/session.service';
import { ExportService } from '../../task/export/export.service';

@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public _vasServices: VasService[];
  _vendors: Vendor[];
  public _branch : Branch[];
  public _ServiceRequestData : ServiceRequestData[];
  public _report: Report;  
  public masterForm: FormGroup; 
  source: LocalDataSource = new LocalDataSource(); 
  submitted = false;
  branchcode: string = this._sessionService.getBranch();
  userid: string = this._sessionService.getUser();
  issearchsection: boolean = true;
  istablesection: boolean = false;
  tablesearch: boolean = false;
  public _rm: Rm[]; 
  reportname: string;
  constructor(private _CommonService: CommonService, private formBuilder: FormBuilder, 
    private _influxToastaService: InfluxToastaService, private _sessionService: SessionService, private exportService:ExportService) { 
      this._report = new Report();
    }

  ngOnInit(): void {
    this.fromCreate();
    this.getAllVasService();
    this.getAllBranch();
    this.getAllVendors();
    this.getBranchWiseRM();
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      confirm_from_date: ['', ],
      confirm_to_date: ['', ],
      arrival_from_date: ['', ],
      arrival_to_date: ['', ],
      departure_from_date: ['', ],
      departure_to_date: ['', ],
      service_code: ['', ],
      vendor_code: ['', ],
      branch_code: ['', ],
      priority_code: ['', ],
      status_code: ['', ],
      birth_month: ['', ],
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

  getAllVasService(){
    this._CommonService.commonGet('ServiceRequest/getAllVasService/' + this._sessionService.getUser())
    .subscribe(
      response => {
        this._vasServices = JSON.parse(JSON.stringify(response)).vasService;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  getAllVendors(){
    this._CommonService.commonGet('ServiceRequest/getAllVendors?puserid=' + this._sessionService.getUser() + '&&vascode=')
    .subscribe(
      response => {
        this._vendors = JSON.parse(JSON.stringify(response)).vendor;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  getAllBranch(){
    this._CommonService.commonGet('ServiceRequest/getAllBranch?userid='+this._sessionService.getUser())
    .subscribe(
      response => {
        this._branch = JSON.parse(JSON.stringify(response)).branches;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  searchCustomer(){
    this._report.service_code = this._report.service_code == null ? "" : this._report.service_code;
    this._report.vendor_code = this._report.vendor_code == null ? "" : this._report.vendor_code;
    this._report.branch_code = this._report.branch_code == null ? "" : this._report.branch_code;
    this._report.priority_code = this._report.priority_code == null ? "" : this._report.priority_code;
    this._report.status_code = this._report.status_code == null ? "" : this._report.status_code;
    this._report.birth_month = this._report.birth_month == null ? "" : this._report.birth_month;
    this._CommonService.commonPost('ServiceRequest/getServiceRequestData/'+ this._sessionService.getUser() ,this._report)
    .subscribe(
      response => {
        this.source.load([]);
        this._ServiceRequestData = JSON.parse(JSON.stringify(response)).reportData;
        this.source.load(this._ServiceRequestData);
        this.issearchsection = !this.issearchsection;
        this.tablesearch = true;
        this.istablesection = !this.istablesection;
        //this.exportAsXLSX();
        // var val = JSON.parse(JSON.stringify(response));
        // if(val.status_code === '40999'){
          
        //   this._influxToastaService.showToast('success', 'Response', val.status_message);
        // }
        // else{
        //   this._influxToastaService.showToast('danger', 'Response', val.status_message);
        // }
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
    let list = this._ServiceRequestData;
    this._vasServices.forEach(x => {
      if(x.service_code == this._report.service_code){
        this.reportname = x.service_name;
      }
    });
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
  
  getBranchWiseRM() {
    this._CommonService.commonGet('ServiceRequest/getAllRM?branchcode=' + this.branchcode + "&&userid=" + this.userid)
      .subscribe(
        response => {
          this._rm = JSON.parse(JSON.stringify(response)).rm;
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

}
