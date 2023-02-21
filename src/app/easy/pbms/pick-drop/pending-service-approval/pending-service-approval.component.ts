import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { ServiceRequest } from '../../../models/ServiceRequest';
import { Vendor } from '../../../models/Vendor';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { AddMgApprovalComponent } from '../../meet-greet/meet-greet-pending/add-mg-approval/add-mg-approval.component';
import { PickDropComponent } from '../pick-drop.component';

@Component({
  selector: 'ngx-pending-service-approval',
  templateUrl: './pending-service-approval.component.html',
  styleUrls: ['./pending-service-approval.component.scss']
})
export class PendingServiceApprovalComponent implements OnInit, OnChanges {
  servicename: string = "Airport Pick and Drop";
  public _serviceCode = this._sessionService.getPickandDrop();
  public _limitApplicable = "Y";
  @Input() _serviceRequestfromother: ServiceRequest;
  _serviceRequest: ServiceRequest;
  public limit_status: string;
  public casa_status: string;
  public fd_status: string;
  public total_status: string;
  public masterForm: FormGroup;
  public _vendors : Vendor[];
  need_recomendation: boolean = false;
  //_testVal: boolean;

  constructor(private _CommonService: CommonService, private pickdropcomponent: PickDropComponent,
    private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService, private _sessionService: SessionService) { 
    this._serviceRequest = new ServiceRequest();
  }

  ngOnChanges() {
    this._serviceRequest = this._serviceRequestfromother;
    this.submitted = false;
    this.getAllVendors();
    //alert(this._vendor.vendor_code);
  }

  ngOnInit(): void {
    this.fromCreate();
    this.getAllVendors();
    //this.checkRecomendation(this._serviceRequest.cust_no, this._serviceRequest.casa_bal.toString(), this._serviceRequest.fd_bal.toString(), this._serviceRequest.tot_bal.toString());
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
         cust_no: ['', ],
         customer_name: ['', ],
         casa_balance: ['', ],
         fd_balance: ['', ],
         total_balance: ['', ],
         cust_mobile: ['', ],
         cust_birthday: ['', ],
         request_date: ['', ],
         airline_code: ['', ],
         flight_no: ['', ],
         reporting_date: ['', ],
         airline_code_return: ['', ],
         flight_no_return: ['', ],
         reporting_date_return: ['', ],
         alternet_contact_name: ['', ],
         alternet_contact_mobile: ['', ],
         remarks: ['', [Validators.required]],
         service_code: ['', ],
         vendor_code: ['', [Validators.required]],
         _testVal: ['', ],
         servicename: ['', []] ,
      // StartDate: ['', [Validators.required]],
      // EndDate: ['', [Validators.required]],
      // Status: ['', [Validators.required]],

    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  checkRecomendation(cust_no: string, casa_balance: string, fd_balance: string, total_balance: string){
    this._CommonService.commonGet('ServiceRequest/checkRecomendation?cust_no=' + cust_no + "&&casa_balance=" + casa_balance + "&&fd_balance=" + fd_balance + "&&total_balance=" + total_balance)
    .subscribe(
      response => {
        this.limit_status = JSON.parse(JSON.stringify(response)).limit_status;
        this.casa_status = JSON.parse(JSON.stringify(response)).casa_status;
        this.fd_status = JSON.parse(JSON.stringify(response)).fd_status;
        this.total_status = JSON.parse(JSON.stringify(response)).total_status;
        if(this.limit_status == 'N' || this.casa_status == 'N' || this.fd_status == 'N' || this.total_status == 'N' ){
          this.need_recomendation = true;
        }
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  submitted: boolean = true;
  approveServiceReq(){
    this.submitted = true;
    if (this.masterForm.invalid) {
      return;
    }
    this._serviceRequest.status_code = "A";
    this._serviceRequest.apv_by = sessionStorage.getItem("userId");
    this._serviceRequest.casa_bal = typeof(this._serviceRequest.casa_bal) === "string" ? Number(this._serviceRequest.casa_bal): this._serviceRequest.casa_bal;

    this._CommonService.commonPost('ServiceRequest/approveServiceRequest/'+ this._sessionService.getUser() ,this._serviceRequest)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.dismiss();
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

  dismiss() {
    this.submitted = false;
    var passvalue = this._serviceRequest;
    this._serviceRequest = new ServiceRequest();
    this.pickdropcomponent.closePopupForApproval(passvalue);
    //this.ref.close(this._serviceRequest);
  }

  dismissfornone() {
    this.submitted = false;
    this.pickdropcomponent.closePopupFornoneApproval();
    //this.ref.close(this._serviceRequest);
  }

  getAllVendors(){
    this._CommonService.commonGet('ServiceRequest/getAllVendors?puserid=' + this._sessionService.getUser() + '&&vascode=' + this._sessionService.getPickandDrop())
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

  cancelRequest(){
    this.submitted = true;
    if (this.masterForm.invalid) {
      return;
    }
    this._serviceRequest.status_code = "C";
    this._serviceRequest.apv_by = sessionStorage.getItem("userId");
    this._serviceRequest.casa_bal = typeof(this._serviceRequest.casa_bal) === "string" ? Number(this._serviceRequest.casa_bal): this._serviceRequest.casa_bal;

    this._CommonService.commonPost('ServiceRequest/approveServiceRequest/'+ this._sessionService.getUser() ,this._serviceRequest)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.dismiss();
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
}
