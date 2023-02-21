import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { Gift } from '../../models/Gift';
import { ServiceRequest } from '../../models/ServiceRequest';
import { CommonService } from '../../services/common.service';
import { PermitedMenuService } from '../../services/permited-menu.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'ngx-birthday-cake',
  templateUrl: './birthday-cake.component.html',
  styleUrls: ['./birthday-cake.component.scss']
})
export class BirthdayCakeComponent implements OnInit {

  public userid: string;
  public masterForm: FormGroup;
  defaultRowPerPage = 10;
  gift_type: string;
  _gifts: Gift[];
  private customArray: any =[];
  _pendingcount = 0;
  _servicerequest: ServiceRequest[];  
  source: LocalDataSource = new LocalDataSource();  
  public selectedrows: Array<ServiceRequest> = [];
  roleid: string = this._sessionService.getRole();
  _isshown: boolean;

  smode: string = "multi";
  constructor(private _CommonService: CommonService, private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService,
          private _permitedMenuService: PermitedMenuService, private _sessionService: SessionService) { }

  ngOnInit(): void {
    this.userid = this._sessionService.getUser();
    if(this.roleid == this._sessionService.getAdmin() || this.roleid == this._sessionService.getVC()){
      this.settings.selectMode = "multi";
  }
    this.fromCreate();
    this.getAllGifts();
    this.getBirthdayService();
    this.loadMenuPermission();
  }

  settings = {

    actions: {
      columnTitle: 'Service',
      add: false,
      edit: false,
      delete: false,
      custom: this.customArray,
      position: 'right',
    },

    columns: {
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
      },
      cust_name: {
        title: 'Customer Name',
        type: 'string',
      },
      branch_name: {
        title: 'Branch Name',
        type: 'string',
      },
      cust_birthday: {
        title: 'Birthday',
        valuePrepareFunction: (cust_birthday) => {
          return new DatePipe('en-EN').transform(new Date(cust_birthday), 'dd/MM/yyyy');
        }
      },
      gift_name: {
        title: 'Gift',
        type: 'string',
      },
      vendor_name: {
        title: 'Vendor',
        type: 'string',
      },
      cust_address: {
        title: 'Address',
        type: 'string',
      },
    },
    selectMode: 'single',
   mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
  };
  fromCreate() {
    this.masterForm = this.formBuilder.group({
      gift_type: ['', ] ,

    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  loadMenuPermission() {
    this.customArray = this._permitedMenuService.setCutomActionItemsForBirthday();
    this.settings.actions.custom = this.customArray;
    this.settings = Object.assign({}, this.settings);
  }

  searchBirthdayRequest(){
    this._CommonService.commonGet('ServiceRequest/getAllBirthdayServiceRequest/' + this.gift_type + "/" + this._sessionService.getUser())
    .subscribe(
      response => {
        this.source.load([]);
        this._servicerequest = JSON.parse(JSON.stringify(response)).servicerequest;
        this.source.load(this._servicerequest);
        this.defaultRowPerPage = this._servicerequest.length;
        this.setPager(this.defaultRowPerPage);
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  public getBirthdayService(){
    this._CommonService.commonGet('ServiceRequest/getAllServiceRequest?pstatusode=' + this._sessionService.getPending() + "&&pservicecode=" + this._sessionService.getBirthday() + "&&pbranchcode=" + this._sessionService.getBranch() + "&&pprojid=" + this._sessionService.getProject() + "&&proleid=" + this._sessionService.getRole() + "&&puserid=" + this.userid)
    .subscribe(
      response => {
        this.source.load([]);
        this._servicerequest = JSON.parse(JSON.stringify(response)).servicerequest;
        //this._serviceRequestPen == null ? this.tableDataPen = true : '';
        this.source.load(this._servicerequest);
        this._pendingcount = this._servicerequest.length;
        this._isshown = this._pendingcount == 0 ? false : true;
      },
      error => {
       this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  setPager(val: number) {
    this.source.setPaging(1, this.defaultRowPerPage, true);
    this.settings = Object.assign({}, this.settings);
  }

  onUserRowSelect(event){
    this.selectedrows = event.selected;
  }

  getAllGifts(){
    this._CommonService.commonGet('ServiceRequest/getAllGifts?userid=' + this._sessionService.getUser())
    .subscribe(
      response => {
        this._gifts = JSON.parse(JSON.stringify(response)).gifts;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  onCustom(event): void {
    if (event.action === 'Approval') {
      event.data.status_code = this._sessionService.getApprove();
      this.approveServiceReq(event.data);
    }    
    else if(event.action === 'Cancel'){
      event.data.status_code = this._sessionService.getCancel();
      this.approveServiceReq(event.data);
    }
  }

  approveMultipleBirthday(){
    if(this.selectedrows.length == 0){
      this._influxToastaService.showToast('danger', 'Response', "Select at least one customer");
      return;
    }
    this._CommonService.commonPost('ServiceRequest/approveMultipleServiceRequest/' + this.userid, this.selectedrows)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this._influxToastaService.showToast('success', 'Response', val.status_message);
          this.selectedrows.forEach(x =>{
            this.source.remove(x);
            this._pendingcount = this._pendingcount -1;
          })
        }
      },
      error => {
      },
      () => {
        // No errors, route to new page
      }
    );
  }

  onSearch(query: string = '') {
    if (query.trim().length > 0){
      this.source.setFilter([
        {
          field: 'cust_no',
          search: query
        },
        {
          field: 'cust_name',
          search: query
        },
        {
          field: 'gift_name',
          search: query
        },
        {
          field: 'vendor_name',
          search: query
        }
      ], false); 
    }
  }

  approveServiceReq(servicereq: ServiceRequest){
    servicereq.userid = this._sessionService.getUser();

    this._CommonService.commonPost('ServiceRequest/approveServiceRequest/'+ this._sessionService.getUser() , servicereq)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.source.remove(servicereq);
          this._pendingcount = this._pendingcount - 1;
          this._influxToastaService.showToast('success', 'Response', val.status_message);
        }
        //this._influxToastaService.showToast('success', 'Response', response.toString());
        //this.dismiss();
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );
  }
}
