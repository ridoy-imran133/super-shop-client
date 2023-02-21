import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../../shared/_services/influx.toast.service';
import { ServiceRequest } from '../../../../models/ServiceRequest';
import { Vendor } from '../../../../models/Vendor';
import { CommonService } from '../../../../services/common.service';
import { SessionService } from '../../../../services/session.service';
import { MeetGreetComponent } from '../../meet-greet.component';

@Component({
  selector: 'ngx-add-mg-approval',
  templateUrl: './add-mg-approval.component.html',
  styleUrls: ['./add-mg-approval.component.scss']
})
export class AddMgApprovalComponent implements OnInit, OnChanges {
  servicename: string = "Airport Meet and Greet";
  @Input() _serviceRequestfromother: ServiceRequest;
  _serviceRequest: ServiceRequest;
  public limit_status: string;
  public casa_status: string;
  public fd_status: string;
  public total_status: string;
  public masterForm: FormGroup;
  public _vendors : Vendor[];
  need_recomendation: boolean = false;
  submitted = false;
  //_testVal: boolean;

  constructor(private _CommonService: CommonService, private meetgreet: MeetGreetComponent,
    private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService, private _sessionService: SessionService) { 
    this._serviceRequest = new ServiceRequest();
  }

  ngOnInit(): void {
    this.fromCreate();
    this.getAllVendors();
  }

  ngOnChanges() {
    this.submitted = false;
    this._serviceRequest = this._serviceRequestfromother;
    //alert(this._vendor.vendor_code);
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
        // this.dismiss();
        // this._influxToastaService.showToast('success', 'Response', response.toString());
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );
  }

  dismiss() {
    //this.ref.close(this._serviceRequest);
    this.meetgreet.closePopupForApproval(this._serviceRequestfromother);
  }

  dismissfornovalue() {
    this.meetgreet.closePopupFornoneApproval();
  }

  getAllVendors(){
    this._CommonService.commonGet('ServiceRequest/getAllVendors?puserid =' + this._sessionService.getUser() + '&&vascode=' + this._sessionService.getMeetandGreet())
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
        // this.dismiss();
        // this._influxToastaService.showToast('success', 'Response', response.toString());
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );
  }
}
