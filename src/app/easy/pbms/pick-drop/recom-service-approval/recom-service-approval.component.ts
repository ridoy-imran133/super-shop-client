import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { ServiceRequest } from '../../../models/ServiceRequest';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { PickDropComponent } from '../pick-drop.component';

@Component({
  selector: 'ngx-recom-service-approval',
  templateUrl: './recom-service-approval.component.html',
  styleUrls: ['./recom-service-approval.component.scss']
})
export class RecomServiceApprovalComponent implements OnInit, OnChanges {
  insdate: string;
  servicename: string = "Airport Pick and Drop";
  @Input() _serviceRequestfromother: ServiceRequest;
  submitted: boolean = false;
  _serviceRequest: ServiceRequest;
  public limit_status: string;
  public casa_status: string;
  public fd_status: string;
  public total_status: string;
  public masterForm: FormGroup;

  constructor(private _CommonService: CommonService, private pickdropcomponent: PickDropComponent, public datepipe: DatePipe,
    private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService, private _sessionService: SessionService) { 
    this._serviceRequest = new ServiceRequest();
  }

  ngOnInit(): void {
    this.fromCreate();
    this.checkRecomendation(this._serviceRequest.cust_no, this._serviceRequest.casa_bal.toString(), this._serviceRequest.fd_bal.toString(), this._serviceRequest.tot_bal.toString());
  }

  ngOnChanges() {
    this._serviceRequest = this._serviceRequestfromother;
    this.insdate = this.datepipe.transform(this._serviceRequest.ins_date, 'dd/MM/yyyy');
    //alert(this._serviceRequest.recom_message);
    //alert(this._vendor.vendor_code);
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
         cust_id: ['', ],
         customer_no: ['', ],
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
         servicename: ['', []] ,
         ins_date: ['', []] ,
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
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }


  recommendationServiceReq(){
    this.submitted = true;
    if (this.masterForm.invalid) {
      return;
    }
    this._serviceRequest.status_code = "P";
    this._serviceRequest.recom_by = this._sessionService.getUser();
    this._serviceRequest.userid = this._sessionService.getUser();

    this._CommonService.commonPost('ServiceRequest/recommServiceRequest/'+this._sessionService.getUser() ,this._serviceRequest)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.dismiss();
          this._influxToastaService.showToast('success', 'Response', val.status_message);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', "Failed");
        }
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );
  }
  cancelRequest(){
    this.submitted = true;
    if (this.masterForm.invalid) {
      return;
    }
    this._serviceRequest.status_code = "C";
    this._serviceRequest.recom_by = sessionStorage.getItem("userId");

    this._CommonService.commonPost('ServiceRequest/recommServiceRequest/'+this._sessionService.getUser() ,this._serviceRequest)
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
    this.insdate = null;
    this.pickdropcomponent.closePopupForRecom(this._serviceRequest);
    //this.ref.close(this._serviceRequest);
  }
  dismissfornone() {
    this.insdate = null;
    this.pickdropcomponent.closePopupFornoneApproval();
    //this.ref.close(this._serviceRequest);
  }

}
