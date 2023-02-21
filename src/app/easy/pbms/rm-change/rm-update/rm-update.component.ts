import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { Rm } from '../../../models/Rm';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { RmChangeComponent } from '../rm-change.component';
import * as $ from 'jquery';
import { CustomerUBS } from '../../../models/CustomerUBS';
import { DatePipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { Branch } from '../../../models/Branch';

@Component({
  selector: 'ngx-rm-update',
  templateUrl: './rm-update.component.html',
  styleUrls: ['./rm-update.component.scss']
})
export class RmUpdateComponent implements OnInit, OnChanges {
  isngchangecall: number = 0;
  isLoader: boolean = true;
  loading: boolean = true;
  @Input() _rmFromOther: Rm;
  _rmdetails: Rm;
  submitted = false;
  roleid: string = this._sessionService.getRole();
  branchcode: string = this._sessionService.getBranch();
  userid: string = this._sessionService.getUser();
  _prioritycodenew: string;
  public _rm: Rm[];  
  public _customers: CustomerUBS[];
  public masterForm: FormGroup;
  @Input() textfromother: string;
  public selectedrows: Array<CustomerUBS> = [];
  count: number = 0;
  _branch: Branch[];
  branch_code: string;
  isbranchopen: boolean = false;
  constructor(private _CommonService: CommonService, private formBuilder: FormBuilder, private _sessionService: SessionService, 
    private _influxToastaService: InfluxToastaService, private rmchangecomponent : RmChangeComponent) { 
      this._rmdetails = new Rm();
    }

  ngOnInit(): void {
    this.fromCreate();    
    if(this.roleid == 'R001'){
      this.isbranchopen = true;
      this.getAllBranch();
    }
    else{
      this.getBranchWiseRM();
    }
    //this.getCustomersWiseRM(this._rmFromOther.priority_code);
  }

  ngOnChanges() {
    this.count = 0;
    this.submitted = false;
    this._rmdetails = this._rmFromOther;
    if(this.textfromother == 'block'){
      this.getCustomersWiseRM(this._rmdetails.priority_code);
    }
    //alert(this._vendor.vendor_code);
  }

  source: LocalDataSource = new LocalDataSource();
  settings = {

    actions: {
      columnTitle: 'Service',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },

    columns: {
      // index: {
      //   title: 'SL',
      //   type: 'text',
      //   valuePrepareFunction: (val, row, cell) => {
      //     const pager = this.source.getPaging();
      //     const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

      //     return ret;
      //   },
      // },
      cust_no: {
        title: 'Customer No',
        type: 'string',
        show: false
      },
      customer_name: {
        title: 'Customer Name',
        type: 'string',
        width: '250px'
      },
      branch_name: {
        title: 'Branch',
        type: 'string',
        valuePrepareFunction: (branch_name) => {
          var val = branch_name.split(" Branch");
          return val[0];
        }
      },
      // mobile_number: {
      //   title: 'Mobile Number',
      //   type: 'string',
      // },
      // birth_date: {
      //   title: 'Birth Date',
      //   valuePrepareFunction: (date_of_birth) => {
      //     return new DatePipe('en-EN').transform(new Date(date_of_birth), 'dd/MM/yyyy');
      //   }
      // },
      // total_balance: {
      //   title: 'Total Balance',
      //   type: "html",
      //   valuePrepareFunction: (total_balance) => { return '<p class="cell_right">' + total_balance + '</p>'; },
      // },
    },
    selectMode: "multi",
    hideSubHeader: true,
    pager: {
      display: false,
      perPage: 5,
    },
  };

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      updatermval: ['', [Validators.required]],
      branch_code: ['', []]
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  onUserRowSelect(event){
    this.selectedrows = event.selected;
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

  getCustomersWiseRM(prioritycode: string){
    this._CommonService.commonGet('ServiceRequest/getAllCustomers?userId=' + '' + "&&roleId=" + '' + "&&areacode=" + '' + "&&branchCode=" + '' + "&&custno=" + '' + "&&birthmonth=" + '' + "&&birthrecom=" + '' + "&&isbirth=" + false + "&&prioritycode=" + prioritycode)
      .subscribe(
        response => {
          this.source.load([]);
          this._customers = JSON.parse(JSON.stringify(response)).customerInformation;
          this.count = this._customers.length;
          this.isLoader = !this.isLoader;
          this.loading = !this.loading;
          // if(this._customers.length > 0){
            
          // }
          // else{
          // }
          this.source.load(this._customers);
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  savepriority(){
    // if(this._prioritycodenew == null || this._prioritycodenew == ""){
    //   this._influxToastaService.showToast('danger', 'Response', "please select a RM");
    //   return;
    // }
    this.submitted = true;
    if (this.masterForm.invalid) {
      return;
    }
    if(this.selectedrows.length == 0){
      this._influxToastaService.showToast('danger', 'Response', "Select at least one customer");
      return;
    }
    this._CommonService.commonPost('ServiceRequest/updateCustomerList/' + this._prioritycodenew + '/' + this._sessionService.getUser(), this.selectedrows)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
           //this.dismiss();
           this.selectedrows.forEach(x =>{
            this.source.remove(x);
            this.count = this.count -1;
          })
          this._prioritycodenew = null;
          this.submitted = false;
          this.selectedrows = [];
          this._influxToastaService.showToast('success', 'Response', val.status_message);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', val.status_message);
        }
      },
      error => {
      },
      () => {
        // No errors, route to new page
      }
    );
  }

  dismiss(){
    this._prioritycodenew = "";
    this.isLoader = true;
    this.loading = true;
    this._customers = [];
    this.count = 0;
    this.isngchangecall = 0;
    this.rmchangecomponent.closePopup();
    //this.ref.close();
  }

  checkdate(){
    $('#basic_example_3').datetimepicker({
      timeFormat: "hh:mm tt"
    });
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

  branchselect(){
    this._prioritycodenew = null;
    this.branchcode = this.branch_code;
    this.getBranchWiseRM();
  }

}
