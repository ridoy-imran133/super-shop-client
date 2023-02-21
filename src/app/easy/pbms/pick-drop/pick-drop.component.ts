import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { ServiceRequest } from '../../models/ServiceRequest';
import { CommonService } from '../../services/common.service';
import { PermitedMenuService } from '../../services/permited-menu.service';
import { SessionService } from '../../services/session.service';
import { AddPickDropComponent } from './add-pick-drop/add-pick-drop.component';
import { PendingServiceApprovalComponent } from './pending-service-approval/pending-service-approval.component';
import { RecomServiceApprovalComponent } from './recom-service-approval/recom-service-approval.component';

@Component({
  selector: 'ngx-pick-drop',
  templateUrl: './pick-drop.component.html',
  styleUrls: ['./pick-drop.component.scss']
})
export class PickDropComponent implements OnInit {

  _pendingcount = 0;
  _recomcount = 0;
  public _serviceCode = this._sessionService.getPickandDrop();
  _isshownpen: boolean;
  _isshownrec: boolean;

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
  public srforrecom: ServiceRequest;
  public srforedit: ServiceRequest;
  public textforedit: string = "Edit";

  constructor(private dialogService: NbDialogService, private _CommonService: CommonService, 
    private _influxToastaService: InfluxToastaService, private _permitedMenuService: PermitedMenuService,
    private _sessionService: SessionService){

  }
  ngOnInit(): void {
    //this.v = "15";
    this.getPendingMeetAndGreetService();
    this.loadPenMenuPermission();

    this.getRecomMeetAndGreetService();
    this.loadRecomMenuPermission();
    this.srforapproval = new ServiceRequest();
    this.srforrecom = new ServiceRequest();
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
      reporting_date: {
        title: 'Departure Date',
        type: 'string',
      },
      reporting_date_return: {
        title: 'Return Date',
        type: 'string',
      },
      casa_bal: {
        title: 'Total Balance',
        type: "html",
        valuePrepareFunction: (casa_bal) => { return '<p class="cell_right">' + casa_bal + '</p>'; },
      },
      fd_bal: {
        title: 'Total Balance',
        type: "html",
        valuePrepareFunction: (fd_bal) => { return '<p class="cell_right">' + fd_bal + '</p>'; },
      },
      tot_bal: {
        title: 'Total Balance',
        type: "html",
        valuePrepareFunction: (tot_bal) => { return '<p class="cell_right">' + tot_bal + '</p>'; },
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
  };

  public getPendingMeetAndGreetService(){
    this._CommonService.commonGet('ServiceRequest/getAllServiceRequest?pstatusode=' + "P" + "&&pservicecode=" + this._serviceCode + "&&pbranchcode=" + sessionStorage.getItem("BranchCode") + "&&pprojid=P026" + "&&proleid=" + sessionStorage.getItem("RoleId") + "&&puserid=" + sessionStorage.getItem("userId"))
    .subscribe(
      response => {
        this.sourcePen.load([]);
        this._serviceRequestPen = JSON.parse(JSON.stringify(response)).servicerequest;
        this._serviceRequestPen == null ? this.tableDataPen = true : '';
        this.sourcePen.load(this._serviceRequestPen);
        this._pendingcount = this._serviceRequestPen.length;
        this._isshownpen = this._pendingcount == 0 ? false : true;
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
    setTimeout(() => {
      this.openPopupForApproval();
     }, 300);
    // this.openPopupForApproval();
    // const dialogRef = this.dialogService.open(PendingServiceApprovalComponent, {
    //   context: {
    //     _serviceRequest: pService
    //   }, dialogClass: 'model-full'
    // });
    // dialogRef.onClose.subscribe(val => {
    //   if(val.vendor_code != null){
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
      reporting_date: {
        title: 'Departure Date',
        type: 'string',
      },
      reporting_date_return: {
        title: 'Return Date',
        type: 'string',
        // valuePrepareFunction: (reporting_date_return) => {
        //   return new DatePipe('en-EN').transform(new Date(reporting_date_return), 'dd/MM/yyyy');
        // }
      },
      casa_bal: {
        title: 'Total Balance',
        type: "html",
        valuePrepareFunction: (casa_bal) => { return '<p class="cell_right">' + casa_bal + '</p>'; },
      },
      fd_bal: {
        title: 'Total Balance',
        type: "html",
        valuePrepareFunction: (fd_bal) => { return '<p class="cell_right">' + fd_bal + '</p>'; },
      },
      tot_bal: {
        title: 'Total Balance',
        type: "html",
        valuePrepareFunction: (tot_bal) => { return '<p class="cell_right">' + tot_bal + '</p>'; },
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
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
  public getRecomMeetAndGreetService(){
    this._CommonService.commonGet('ServiceRequest/getAllServiceRequest?pstatusode=' + "R" + "&&pservicecode=" + this._serviceCode + "&&pbranchcode=" + sessionStorage.getItem("BranchCode") + "&&pprojid=P026" + "&&proleid=" + sessionStorage.getItem("RoleId") + "&&puserid=" + sessionStorage.getItem("userId"))
    .subscribe(
      response => {
        this.sourceRecom.load([]);
        this._serviceRequestRecom = JSON.parse(JSON.stringify(response)).servicerequest;
        //this._serviceRequestRecom == null ? '' : this.tableDataRecom = true;
        this.sourceRecom.load(this._serviceRequestRecom);
        this._recomcount = this._serviceRequestRecom.length;
        this._isshownrec = this._recomcount == 0 ? false : true;        
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

  recomMeetAndGreetRequest(pService){
    this.srforrecom = pService;
    this.openPopupForRecom();
    // const dialogRef = this.dialogService.open(RecomServiceApprovalComponent, {
    //   context: {
    //     _serviceRequest: pService
    //   },
    // });
    // dialogRef.onClose.subscribe(val => {
    //   if(val.recom_note != null){
    //     this.sourceRecom.remove(val);
    //     this._recomcount = this._recomcount -1;
    //     if(val.status_code === 'P'){
    //       this.sourcePen.append(val);
    //       this._pendingcount = this._pendingcount + 1;
    //     }
    //   }
    // });
  }

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
    const dialogRef = this.dialogService.open(AddPickDropComponent, {
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
    else if (event.action === 'Recom') {
      this.recomMeetAndGreetRequest(event.data)
    }  
    else if(event.action === 'Edit'){
      this.editMeetAndGreetRequest(event.data);
    }
  }

  editMeetAndGreetRequest(event){
    this.srforedit = event;
    this.textforedit = "Edit";
    this.openPopupForEdit();
    // const dialogRef = this.dialogService.open(AddPickDropComponent, {
    //   context: {
    //     text: "Edit",
    //     service: event
    //   },
    // });
    // dialogRef.onClose.subscribe(val => {
    //   if(val == event){
    //     if(val.status_code === this._sessionService.getPending()){
    //     }
    //     else{
    //     }
    //   }
    //   else{
    //   }
    // });
  }

  displayforapproval = "none";
  
  openPopupForApproval() {
    this.displayforapproval = "block";
  }
  closePopupForApproval(pservice: ServiceRequest) {
    debugger
    this.sourcePen.remove(pservice);
    this._pendingcount = this._pendingcount - 1;
    this.displayforapproval = "none";
    
  }

  displayforrecom = "none";
  
  openPopupForRecom() {
    this.displayforrecom = "block";
  }
  closePopupForRecom(pService: ServiceRequest) {
    if(pService.status_code === 'P'){
      this.sourceRecom.remove(pService);
      this._recomcount = this._recomcount -1;
      this.sourcePen.append(pService);
      this._pendingcount = this._pendingcount +1;
    }
    else{
      this.sourceRecom.remove(pService);
      this._recomcount = this._recomcount -1;
    }
    this.displayforrecom = "none";
  }
  // closePopupForApproval(pservice: ServiceRequest) {
  //   this.sourcePen.remove(pservice);
  //   this.displayforapproval = "none";
  //   this._pendingcount = this._pendingcount - 1;
  // }

  displayforedit = "none";
  
  openPopupForEdit() {
    this.displayforedit = "block";
  }
  closePopupForEdit(pservice: ServiceRequest) {
    this.sourcePen.update(this.srforedit, pservice);
    this.sourceRecom.update(this.srforedit, pservice);
    this.displayforedit = "none";
  }

  closePopupFornoneApproval() {    
    this.displayforedit = "none";
    this.displayforrecom = "none";
    this.displayforapproval = "none";
  }
}
