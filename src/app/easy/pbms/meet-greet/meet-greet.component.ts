import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { ServiceRequest } from '../../models/ServiceRequest';
import { CommonService } from '../../services/common.service';
import { PermitedMenuService } from '../../services/permited-menu.service';
import { AddMeetGteetComponent } from './add-meet-gteet/add-meet-gteet.component';
import { AddMgApprovalComponent } from './meet-greet-pending/add-mg-approval/add-mg-approval.component';

@Component({
  selector: 'ngx-meet-greet',
  templateUrl: './meet-greet.component.html',
  styleUrls: ['./meet-greet.component.scss']
})
export class MeetGreetComponent implements OnInit {

  _pendingcount = 0;

  _isshown: boolean;

  //Pending
  public _serviceRequestPen: ServiceRequest[];
  sourcePen: LocalDataSource = new LocalDataSource();
  tableDataPen: boolean= false;

  arrowButton:boolean = true;
  tablearrowButton:boolean = false;
  tablearrowheaderButton:boolean = false;

  private customArrayPen: any =[];

  //Recommendation
  public _serviceRequestRecom: ServiceRequest[];
  sourceRecom: LocalDataSource = new LocalDataSource();
  tableDataRecom: boolean= false;
  private customArrayRecom: any =[];

  public srforapproval: ServiceRequest;
  public srforedit: ServiceRequest;
  public textforedit: string = "Edit";

  constructor(private dialogService: NbDialogService, private _CommonService: CommonService, 
    private _influxToastaService: InfluxToastaService, private _permitedMenuService: PermitedMenuService){

  }
  ngOnInit(): void {
    this.getPendingMeetAndGreetService();
    this.loadPenMenuPermission();

    //this.getRecomMeetAndGreetService();
    this.loadRecomMenuPermission();

    this.srforapproval = new ServiceRequest();
    this.srforedit = new ServiceRequest();
  }

  //pending
  settingsPen = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: this.customArrayPen,
      position: 'right',
    },

    columns: {
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.sourcePen.getPaging();
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
      airline_name: {
        title: 'Airline',
        type: 'string',
      },
      flight_no: {
        title: 'Flight',
        type: 'string',
      },
      reporting_date: {
        title: 'Reporting Date',
        type: 'string',
        // valuePrepareFunction: (reporting_date) => {
        //   var val = reporting_date == null ? "" : new DatePipe('en-EN').transform(new Date(reporting_date), 'dd/MM/yyyy');
        //   return val;
        // }
      },
      airline_name_return: {
        title: ' Return Airline',
        type: 'string',
      },
      flight_no_return: {
        title: 'Return Flight',
        type: 'string',
      },
      reporting_date_return: {
        title: 'Return Date',
        type: 'string',
        // valuePrepareFunction: (reporting_date_return) => {
        //   return new DatePipe('en-EN').transform(new Date(reporting_date_return), 'dd/MM/yyyy');
        // }
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 5,
    },
  };

  onSearch(query: string = '') {
    if (query.trim().length > 0){
      this.sourcePen.setFilter([
        {
          field: 'cust_no',
          search: query
        },
        {
          field: 'cust_name',
          search: query
        },
        {
          field: 'reporting_date',
          search: query
        },
        {
          field: 'reporting_date_return',
          search: query
        }
      ], false); 
    }
  }

  public getPendingMeetAndGreetService(){
    this._CommonService.commonGet('ServiceRequest/getAllServiceRequest?pstatusode=' + "P" + "&&pservicecode=" + "S003" + "&&pbranchcode=" + sessionStorage.getItem("BranchCode") + "&&pprojid=P026" + "&&proleid=" + sessionStorage.getItem("RoleId") + "&&puserid=" + sessionStorage.getItem("userId"))
    .subscribe(
      response => {
        this.sourcePen.load([]);
        this._serviceRequestPen = JSON.parse(JSON.stringify(response)).servicerequest;
        this._serviceRequestPen == null ? this.tableDataPen = true : '';
        this.sourcePen.load(this._serviceRequestPen);
        this._pendingcount = this._serviceRequestPen.length;
        this._isshown = this._pendingcount == 0 ? false : true;
      },
      error => {
       this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  approvedServiceRequest(pService){
    this.srforapproval = pService;
    this.openPopupForApproval();
    // const dialogRef = this.dialogService.open(AddMgApprovalComponent, {
    //   context: {
    //     _serviceRequest: pService
    //   },
    // });
    // dialogRef.onClose.subscribe(val => {
    //   this.getPendingMeetAndGreetService();
    //   if(val != null){
    //     this.sourcePen.remove(val);
    //     this._pendingcount = this._pendingcount - 1;
    //   }
    // });
    
  }

  loadPenMenuPermission() {
    this.customArrayPen = this._permitedMenuService.setCutomActionItemsForPendingList();
    this.settingsPen.actions.custom = this.customArrayPen;
    this.settingsPen = Object.assign({}, this.settingsPen);
  }

  //Recom
  settingsRecom = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: this.customArrayRecom,
      position: 'right',
    },

    columns: {
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.sourceRecom.getPaging();
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
      airline_code: {
        title: 'Airline',
        type: 'string',
      },
      flight_no: {
        title: 'Flight',
        type: 'string',
      },
      reporting_date: {
        title: 'Reporting Date',
        valuePrepareFunction: (reporting_date) => {
          return new DatePipe('en-EN').transform(new Date(reporting_date), 'dd/MM/yyyy');
        }
      },
      airline_code_return: {
        title: ' Return Airline',
        type: 'string',
      },
      flight_no_return: {
        title: 'Return Flight',
        type: 'string',
      },
      reporting_date_return: {
        title: 'Return Date',
        valuePrepareFunction: (reporting_date_return) => {
          return new DatePipe('en-EN').transform(new Date(reporting_date_return), 'dd/MM/yyyy');
        }
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 6,
    },
  };

  public getRecomMeetAndGreetService(){
    this._CommonService.commonGet('ServiceRequest/getAllServiceRequest?pstatusode=' + "R" + "&&pservicecode=" + "S003" + "&&pbranchcode=" + sessionStorage.getItem("BranchCode") + "&&pprojid=P026" + "&&proleid=" + sessionStorage.getItem("RoleId") + "&&puserid=" + sessionStorage.getItem("userId"))
    .subscribe(
      response => {
        this.sourceRecom.load([]);
        this._serviceRequestRecom = JSON.parse(JSON.stringify(response)).servicerequest;
        //this._serviceRequestRecom == null ? '' : this.tableDataRecom = true;
        this.sourceRecom.load(this._serviceRequestRecom);
        
      },
      error => {
       this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  loadRecomMenuPermission() {
    this.customArrayRecom = this._permitedMenuService.setCutomActionItemsForRecomendationList();
    this.settingsRecom.actions.custom = this.customArrayRecom;
    this.settingsRecom = Object.assign({}, this.settingsRecom);
  }

  // recomMeetAndGreetRequest(pService){
  //   const dialogRef = this.dialogService.open(AddMgRecomendationComponent, {
  //     context: {
  //       _serviceRequest: pService
  //     },
  //     //closeOnBackdropClick: false,
  //   });
  //   dialogRef.onClose.subscribe(val => {
  //     this.getRecomMeetAndGreetService();
  //     if(val != null){
  //       //this.sourceRecom.append(val);
  //       this.sourceRecom.remove(val);
  //       if(val.status_code === 'P'){
  //         this.sourcePen.append(val);
  //       }
  //     }
  //     //this.selectedRow(val.Name);
  //   });
  // }

  //Common

  tabs: any[] = [
    {
      title: 'Pending ',
      route: '/easy/pbms/meet-greet/pending',
    },
    {
      title: 'Recommendation',
      route: '/easy/pbms/meet-greet/recommendation',
    },
    // {
    //   title: 'Success',
    //   route: '/easy/pbms/meet-greet/success',
    // },
  ];

  addMeetAndGreetRequest(){
    const dialogRef = this.dialogService.open(AddMeetGteetComponent, {
      context: {
        text: "Add",
        service: null
      },
      //closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(val => {
      if(val != null){
        
        //this.meetGreetRecommendationComponent.valueReceive(val);
        if(val.status_code === "P"){
          this.sourcePen.append(val);
        }
        else{
          this.sourceRecom.append(val);
        }
      }
      //this.selectedRow(val.Name);
    });
  }

  onCustom(event): void {
    if (event.action === 'Approval') {
      this.approvedServiceRequest(event.data);
    }    
    // else if (event.action === 'Recom') {
    //   this.recomMeetAndGreetRequest(event.data)
    // }  
    else if(event.action === 'Edit'){
      this.editMeetAndGreetRequest(event.data);
    }
  }

  editMeetAndGreetRequest(event){
    this.srforedit = event;
    this.textforedit = "Edit";
    this.openPopupForEdit();
    // const dialogRef = this.dialogService.open(AddMeetGteetComponent, {
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

  displayforapproval = "none";
  
  openPopupForApproval() {
    this.displayforapproval = "block";
  }
  closePopupForApproval(pservice: ServiceRequest) {
    this.sourcePen.remove(pservice);
    this.displayforapproval = "none";
    this._pendingcount = this._pendingcount - 1;
  }
  closePopupFornoneApproval() {    
    this.displayforapproval = "none";
  }

  displayforedit = "none";
  
  openPopupForEdit() {
    this.displayforedit = "block";
  }
  closePopupForEdit(service: ServiceRequest) {
    this.sourcePen.update(this.srforedit, service);
    this.displayforedit = "none";
  }
}
