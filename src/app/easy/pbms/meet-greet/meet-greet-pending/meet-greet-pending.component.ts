import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { ServiceRequest } from '../../../models/ServiceRequest';
import { CommonService } from '../../../services/common.service';
import { PermitedMenuService } from '../../../services/permited-menu.service';
import { AddMeetGteetComponent } from '../add-meet-gteet/add-meet-gteet.component';
import { AddMgApprovalComponent } from './add-mg-approval/add-mg-approval.component';

@Component({
  selector: 'ngx-meet-greet-pending',
  templateUrl: './meet-greet-pending.component.html',
  styleUrls: ['./meet-greet-pending.component.scss']
})
export class MeetGreetPendingComponent implements OnInit {
  public _serviceRequestPen: ServiceRequest[];
  sourcePen: LocalDataSource = new LocalDataSource();
  tableDataPen: boolean= false;
  private customArrayPen: any =[];
  constructor(private _CommonService: CommonService, private _influxToastaService: InfluxToastaService,
              private dialogService: NbDialogService, private _permitedMenuService: PermitedMenuService) { }

  ngOnInit(): void {
    this.getPendingMeetAndGreetService();
    this.loadPenMenuPermission();
  }

  settings = {

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
      cust_mobile: {
        title: 'Mobile Number',
        type: 'string',
      },
      casa_balance: {
        title: 'CASA Balance',
        type: 'string',
      },
      fd_balance: {
        title: 'FD Balance',
        type: 'string',
      },
      total_balance: {
        title: 'Total Balance',
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

  onCustom(event): void {
    if (event.action === 'Approval') {
      this.approvedServiceRequest(event.data);
    }    
    else if(event.action === 'Edit'){
      this.editMeetAndGreetRequest(event.data);
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
        
      },
      error => {
       this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  approvedServiceRequest(pService){
    const dialogRef = this.dialogService.open(AddMgApprovalComponent, {
      context: {
        _serviceRequest: pService
      },
      //closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(val => {
      this.getPendingMeetAndGreetService();
      if(val != null){
        //this.sourcePen.append(val);
      }
      //this.selectedRow(val.Name);
    });
  }

  loadPenMenuPermission() {
    this.customArrayPen = this._permitedMenuService.setCutomActionItemsForPendingList();
    this.settings.actions.custom = this.customArrayPen;
    this.settings = Object.assign({}, this.settings);
  }

  editMeetAndGreetRequest(event){
    const dialogRef = this.dialogService.open(AddMeetGteetComponent, {
      context: {
        text: "Edit",
        service: event
      },
      //closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(val => {
      if(val != null){
        
        //this.meetGreetRecommendationComponent.valueReceive(val);
        //this.sourcePen.append(val);
      }
      //this.selectedRow(val.Name);
    });
  }
}
