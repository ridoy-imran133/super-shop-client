import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerUBS } from '../../../models/CustomerUBS';
import { ServiceRequest } from '../../../models/ServiceRequest';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { GenerateRequestComponent } from '../generate-request.component';

@Component({
  selector: 'ngx-cust-history',
  templateUrl: './cust-history.component.html',
  styleUrls: ['./cust-history.component.scss']
})
export class CustHistoryComponent implements OnInit, OnChanges {
  @Input() _customerfromgenerateRequest: CustomerUBS;  
  @Input() textfromother: string;
  cusinifo: CustomerUBS;
  public allService: ServiceRequest[];
  public mgServices: ServiceRequest[];
  public pdServices: ServiceRequest[];
  public bdServices: ServiceRequest[];
  public slServices: ServiceRequest[];

  
  mgsource: LocalDataSource = new LocalDataSource();
  pdsource: LocalDataSource = new LocalDataSource();
  bdsource: LocalDataSource = new LocalDataSource();
  slsource: LocalDataSource = new LocalDataSource();

  mgsettings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },

    columns: {
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.mgsource.getPaging();
          const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

          return ret;
        },
      },
      cust_no: {
        title: 'Customer No',
        type: 'string',
      },
      cust_name: {
        title: 'Customer Name',
        type: 'string',
      },
      cust_mobile: {
        title: 'Mobile Number',
        type: 'string',
      },
      ins_by: {
        title: 'Created By',
        type: 'string',
      },
      apv_by: {
        title: 'Approved By',
        type: 'string',
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 15,
    },
  };

  pdsettings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },

    columns: {
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.pdsource.getPaging();
          const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

          return ret;
        },
      },
      cust_no: {
        title: 'Customer No',
        type: 'string',
      },
      cust_name: {
        title: 'Customer Name',
        type: 'string',
      },
      cust_mobile: {
        title: 'Mobile Number',
        type: 'string',
      },
      ins_by: {
        title: 'Created By',
        type: 'string',
      },
      apv_by: {
        title: 'Approved By',
        type: 'string',
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 15,
    },
  };

  bdsettings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },

    columns: {
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.bdsource.getPaging();
          const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

          return ret;
        },
      },
      cust_no: {
        title: 'Customer No',
        type: 'string',
      },
      cust_name: {
        title: 'Customer Name',
        type: 'string',
      },
      cust_mobile: {
        title: 'Mobile Number',
        type: 'string',
      },
      ins_by: {
        title: 'Created By',
        type: 'string',
      },
      apv_by: {
        title: 'Approved By',
        type: 'string',
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 15,
    },
  };

  slsettings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },

    columns: {
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.slsource.getPaging();
          const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

          return ret;
        },
      },
      cust_no: {
        title: 'Customer No',
        type: 'string',
      },
      cust_name: {
        title: 'Customer Name',
        type: 'string',
      },
      cust_mobile: {
        title: 'Mobile Number',
        type: 'string',
      },
      ins_by: {
        title: 'Created By',
        type: 'string',
      },
      apv_by: {
        title: 'Approved By',
        type: 'string',
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 15,
    },
  };
  constructor(private _CommonService: CommonService, private _sessionService: SessionService, private generaterequest: GenerateRequestComponent ) { }

  ngOnInit(): void {
    this.getbirthday();
    this.getMeetGreet();
    this.getpickdrop();
    this.getskylounge();
    this.cusinifo = new CustomerUBS();
  }

  ngOnChanges() {
    this.cusinifo = this._customerfromgenerateRequest;
    if(this.textfromother == 'block'){
      this.getbirthday();
      this.getMeetGreet();
      this.getpickdrop();
      this.getskylounge();
    }
  }

  getbirthday(){
    this._CommonService.commonGet('ServiceRequest/custWiseServiceRequest/'+ this.cusinifo.cust_no + '/' + this._sessionService.getBirthday()+ "/" + this._sessionService.getUser())
    .subscribe(
      response => {
        this.bdsource.load([]);
        this.bdServices = JSON.parse(JSON.stringify(response)).servicerequest;
        this.bdsource.load(this.bdServices);
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  getMeetGreet(){
    this._CommonService.commonGet('ServiceRequest/custWiseServiceRequest/'+ this.cusinifo.cust_no + '/' + this._sessionService.getMeetandGreet()+ "/" + this._sessionService.getUser())
    .subscribe(
      response => {
        this.mgsource.load([]);
        this.mgServices = JSON.parse(JSON.stringify(response)).servicerequest;
        this.mgsource.load(this.mgServices);
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  getpickdrop(){
    this._CommonService.commonGet('ServiceRequest/custWiseServiceRequest/'+ this.cusinifo.cust_no + '/' + this._sessionService.getPickandDrop()+ "/" + this._sessionService.getUser())
    .subscribe(
      response => {
        this.pdsource.load([]);
        this.pdServices = JSON.parse(JSON.stringify(response)).servicerequest;
        this.pdsource.load(this.pdServices);
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  getskylounge(){
    this._CommonService.commonGet('ServiceRequest/custWiseServiceRequest/'+ this.cusinifo.cust_no + '/' + this._sessionService.getSkyLounge()+ "/" + this._sessionService.getUser())
    .subscribe(
      response => {
        this.slsource.load([]);
        this.slServices = JSON.parse(JSON.stringify(response)).servicerequest;
        this.slsource.load(this.slServices);
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  dismiss() {
    this.generaterequest.closePopupforCustHistory()
  }

}
