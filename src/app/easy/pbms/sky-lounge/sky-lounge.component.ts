import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { ServiceRequest } from '../../models/ServiceRequest';
import { CommonService } from '../../services/common.service';
import { PermitedMenuService } from '../../services/permited-menu.service';
import { SessionService } from '../../services/session.service';
import { AddSkyLoungeComponent } from './add-sky-lounge/add-sky-lounge.component';

@Component({
  selector: 'ngx-sky-lounge',
  templateUrl: './sky-lounge.component.html',
  styleUrls: ['./sky-lounge.component.scss']
})
export class SkyLoungeComponent implements OnInit {
  public srforedit: ServiceRequest;
  public textforedit: string = "Edit";
  _pendingcount = 0;
  _isshown: boolean;
  private customArray: any =[];
  public _serviceRequest: ServiceRequest[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private dialogService: NbDialogService, private _CommonService: CommonService, private _sessionService: SessionService,
    private _influxToastaService: InfluxToastaService, private _permitedMenuService: PermitedMenuService) { }

  ngOnInit(): void {
    this.getSkyLoungeService();
    this.loadMenuPermission();
    this.srforedit = new ServiceRequest();
  }

  settings = {

    actions: {
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
      cust_mobile: {
        title: 'Mobile Number',
        type: 'string',
      },
      airline_name: {
        title: 'Airline',
        type: 'string',
      },
      flight_no: {
        title: 'Flight No',
        type: 'string',
      },
      reporting_date: {
        title: 'Reporting Date',
        type: 'string',
        valuePrepareFunction: (reporting_date) => {
          var val = reporting_date.split(" ");
          return val[0];
        }
      },
      total_person: {
        title: 'Person',
        type: 'string',
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 3,
    },
  };

  loadMenuPermission() {
    this.customArray = this._permitedMenuService.setCutomActionItemsForSkyLounge();
    this.settings.actions.custom = this.customArray;
    this.settings = Object.assign({}, this.settings);
  }

  onCustom(event): void {
    if (event.action === 'Approval') {
      event.data.status_code = "A";
      this.approveServiceReq(event.data);
    }    
    else if (event.action === 'Cancel') {
      event.data.status_code = "C";
      this.approveServiceReq(event.data);
    }  
    else if(event.action === 'Edit'){
      this.editSkyLoungeRequest(event.data);
    }
  }

  public getSkyLoungeService(){
    this._CommonService.commonGet('ServiceRequest/getAllServiceRequest?pstatusode=' + "P" + "&&pservicecode=" + "S004" + "&&pbranchcode=" + sessionStorage.getItem("BranchCode") + "&&pprojid=P026" + "&&proleid=" + sessionStorage.getItem("RoleId") + "&&puserid=" + sessionStorage.getItem("userId"))
    .subscribe(
      response => {
        this.source.load([]);
        this._serviceRequest = JSON.parse(JSON.stringify(response)).servicerequest;
        //this._serviceRequestPen == null ? this.tableDataPen = true : '';
        this.source.load(this._serviceRequest);
        this._pendingcount = this._serviceRequest.length;
        this._isshown = this._pendingcount == 0 ? false : true;
      },
      error => {
       this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
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
          field: 'cust_mobile',
          search: query
        },
        {
          field: 'reporting_date',
          search: query
        }
      ], false); 
    }
  }
  approveServiceReq(servicereq: ServiceRequest){

    //servicereq.priority_code = sessionStorage.getItem("BranchCode");
    servicereq.userid = sessionStorage.getItem("userId");

    this._CommonService.commonPost('ServiceRequest/approveServiceRequest/'+ this._sessionService.getUser() , servicereq)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.source.remove(servicereq);
          this._pendingcount = this._pendingcount - 1;
          this._influxToastaService.showToast('success', 'Response', val.status_message);
        }
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );
  }

  // addMeetAndGreetRequest(){
  //   const dialogRef = this.dialogService.open(AddSkyLoungeComponent, {
  //     context: {
  //       text: "Add",
  //       service: null
  //     },
  //     //closeOnBackdropClick: false,
  //   });
  //   dialogRef.onClose.subscribe(val => {
  //     if(val != null){
  //       this.source.append(val);
  //     }
  //   });
  // }

  editSkyLoungeRequest(event){
    this.srforedit = event;
    this.textforedit = "Edit";
    this.openPopupForEdit();
    // const dialogRef = this.dialogService.open(AddSkyLoungeComponent, {
    //   context: {
    //     text: "Edit",
    //     service: event
    //   },
    // });
    // dialogRef.onClose.subscribe(val => {
    //   if(val != null){
    //   }
    // });
  }

  displayforedit = "none";
  
  openPopupForEdit() {
    this.displayforedit = "block";
  }
  closePopupForEdit(service: ServiceRequest) {
    this.source.update(this.srforedit, service);
    this.displayforedit = "none";
  }

  closePopupForCancel() {
    this.displayforedit = "none";
  }

}
