import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { AirLine } from '../../../models/AirLine';
import { ServiceRequest } from '../../../models/ServiceRequest';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { SkyLoungeComponent } from '../sky-lounge.component';

@Component({
  selector: 'ngx-add-sky-lounge',
  templateUrl: './add-sky-lounge.component.html',
  styleUrls: ['./add-sky-lounge.component.scss']
})
export class AddSkyLoungeComponent implements OnInit, OnChanges {
  birthdate: string;
  @Input() textfromanother: string;
  @Input() _serviceRequestfromother: ServiceRequest;
  text: string;
  submitted: boolean = false;
  service: ServiceRequest;
  public masterForm: FormGroup;
  public _airlines: AirLine[];
  rep_date: Date = null;
  constructor(private router: Router, private skylounge: SkyLoungeComponent, public datepipe: DatePipe,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private _influxToastaService: InfluxToastaService, private _CommonService: CommonService,
    private _sessionService: SessionService) { }

  ngOnInit(): void {
    this.fromCreate();
    this.getAllAirline();
  }

  ngOnChanges() {
    this.submitted = false;
    this.service = this._serviceRequestfromother;
    this.text = this.textfromanother;    
    this.birthdate = this.datepipe.transform(this.service.cust_birthday, 'dd/MM/yyyy');
    this.rep_date = this._sessionService.formatdate(this.service.reporting_date);
    this.getAllAirline();
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
         customer_no: ['',],
         customer_name: ['',],
         casa_balance: ['', ],
         fd_balance: ['', ],
         total_balance: ['', ],
         cust_mobile: ['', ],
         cust_birthday: ['', ],
         request_date: ['', ],
         airline_code: ['', [Validators.required] ],
         flight_no: ['', [Validators.required]],
         reporting_date: ['', [Validators.required]],
         airline_code_return: ['', ],
         flight_no_return: ['', ],
         reporting_date_return: ['', ],
         alternet_contact_name: ['', ],
         alternet_contact_mobile: ['', ],
         remarks: ['', ],
         total_person: ['', [Validators.required]],

    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  onSaverequest(){
    this.submitted = true;
    if(this.rep_date != null){
      this.masterForm.controls.reporting_date.setValidators(null);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
    }
    if (this.masterForm.invalid) {
      return;
    }
    if(this.service.airline_code != null)
    this._airlines.forEach(x =>{
      if(x.airline_code == this.service.airline_code){
        this.service.airline_name = x.airline_name;
      }
    })
    this.service.reporting_date = this.rep_date != null ? this._sessionService.dateformat(this.rep_date) : "";
    this.service.priority_code = sessionStorage.getItem("BranchCode");
    this.service.userid = sessionStorage.getItem("userId");
    this.service.total_person = this.service.total_person.includes('e') ? this.service.total_person.replace('e', '') : this.service.total_person;
    this._CommonService.commonPost('ServiceRequest/saveServiceRequest' ,this.service)
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

  getAllAirline(){
    this._CommonService.commonGet('ServiceRequest/getAllAirLines/'+this._sessionService.getUser())
    .subscribe(
      response => {
        this._airlines = JSON.parse(JSON.stringify(response)).airLine;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  dismiss() {
    //this.service = new ServiceRequest();
    //this.ref.close(this.service);
    this.rep_date = null;
    var passreq = this.service;
    this.service = new ServiceRequest();
    this.textfromanother = "block";
    this.birthdate = null;
    this.skylounge.closePopupForEdit(passreq);
  }

  dismissforcancel() {
    this.rep_date = null;
    this.service = new ServiceRequest();
    this.textfromanother = "block";
    this.birthdate = null;
    this.skylounge.closePopupForCancel();
  }

}
