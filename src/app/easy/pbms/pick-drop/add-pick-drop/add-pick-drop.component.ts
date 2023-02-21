import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AirLine } from '../../../models/AirLine';
import { AirPort } from '../../../models/AirPort';
import { CustomerUBS } from '../../../models/CustomerUBS';
import { ServiceRequest } from '../../../models/ServiceRequest';
import { VehichleType } from '../../../models/VehichleType';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { AddMeetGteetComponent } from '../../meet-greet/add-meet-gteet/add-meet-gteet.component';
import { PickDropComponent } from '../pick-drop.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-add-pick-drop',
  templateUrl: './add-pick-drop.component.html',
  styleUrls: ['./add-pick-drop.component.scss']
})
export class AddPickDropComponent implements OnInit, OnChanges {
  birthdate: string;
  servicename: string = "Airport Pick and Drop";
  public _serviceCode = this._sessionService.getPickandDrop();
  public _limitApplicable = "Y";
  @Input() textfromanother: string;
  text: string;
  service: ServiceRequest;
  @Input() _serviceRequestfromother: ServiceRequest;
  public _serviceRequest: ServiceRequest;
  //@Input() _serviceRequest: ServiceRequest;
  customer_name: string = "";
  public masterForm: FormGroup;  
  submitted = false;  
  @Input() textfrompickgreet: string;
  @ViewChild('autoInput') input;
  options: string[];
  filteredOptions$: Observable<string[]>;
  public _customers: CustomerUBS[];
  public _airlines: AirLine[];
  public limit_status: string;
  public casa_status: string;
  public fd_status: string;
  public total_status: string;
  need_recomendation: boolean = false;
  public _airport : AirPort[];
  public _vehichle_type : VehichleType[];
  public custstatus: string = this._sessionService.getPending();

  isdeparture: boolean = false;
  isreturn: boolean = false;

  rep_date: Date = null;
  rep_date_ret: Date = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private _influxToastaService: InfluxToastaService, private _CommonService: CommonService, private pickdrop: PickDropComponent,
    private _sessionService: SessionService, public datepipe: DatePipe) 
    { 
      this._serviceRequest = new ServiceRequest();
      this.service = new ServiceRequest();
    }

  ngOnInit(): void {
    this.fromCreate();
    this.text ==='Add' ? this.getAllCustomers() : this.editServiceRequest();
    //this.getAllCustomers();
    this.getAllAirline();
    this.getAllAirPort();
    this.getVehicleType();
  }

  ngOnChanges() {
    this.service = this._serviceRequestfromother;
    this.birthdate = this.datepipe.transform(this.service.cust_birthday, 'dd/MM/yyyy');
    this.isdeparture = this._serviceRequestfromother.airline_code == null ? false : true;
    this.rep_date = this._serviceRequestfromother.airline_code == null ? null : this._sessionService.formatdate(this.service.reporting_date);
    this.isreturn = this._serviceRequestfromother.airline_code_return == null ? false : true;
    this.rep_date_ret = this._serviceRequestfromother.airline_code_return == null ? null : this._sessionService.formatdate(this.service.reporting_date_return);
    this.customValidation();
    this.text = this.textfromanother
    this.text ==='Add' ? this.getAllCustomers() : this.editServiceRequest();
    //this.getAllCustomers();
    this.getAllAirline();
    this.getAllAirPort();
    this.getVehicleType();
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
         customer_no: ['', []],
         customer_name: ['', []],
         casa_balance: ['', []],
         fd_balance: ['', []],
         total_balance: ['', []],
         cust_mobile: ['', []],
         cust_birthday: ['', []],
         request_date: ['', []],
         airline_code: ['', []],
         flight_no: ['', []],
         reporting_date: ['', []],
         airline_code_return: ['', []],
         flight_no_return: ['', []],
         reporting_date_return: ['', []],
         alternet_contact_name: ['', []],
         alternet_contact_mobile: ['', [ Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
         remarks: ['', []],
         pick_address: ['', []],
         drop_address: ['', []],
         return_airport: ['', []],
         drop_airport: ['', []],
         vehichle_type: ['', []],
         vehichle_type_return: ['', []],
         servicename: ['', []] ,
      // StartDate: ['', [Validators.required]],
      // EndDate: ['', [Validators.required]],
      // Status: ['', [Validators.required]],

    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  onSaveUser(){
    this.submitted = true;
    if(this.rep_date != null){
      this.masterForm.controls.reporting_date.setValidators(null);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
    }
    if(this.rep_date_ret != null){
      this.masterForm.controls.reporting_date_return.setValidators(null);
      this.masterForm.controls.reporting_date_return.updateValueAndValidity();
    }
    if (this.masterForm.invalid) {
      return;
    }
    if(this._serviceRequest.airline_code != null)
    this._airlines.forEach(x =>{
      if(x.airline_code == this._serviceRequest.airline_code){
        this._serviceRequest.airline_name = x.airline_name;
      }
    })
    if(this._serviceRequest.airline_code_return != null){
      this._airlines.forEach(x =>{
        if(x.airline_code == this._serviceRequest.airline_code_return){
          this._serviceRequest.airline_name_return = x.airline_name;
        }
      })
    }
    this._serviceRequest.reporting_date = this.rep_date != null ? this._sessionService.dateformat(this.rep_date) : "";
    this._serviceRequest.reporting_date_return = this.rep_date_ret != null ? this._sessionService.dateformat(this.rep_date_ret) : "";
    this._serviceRequest.priority_code = this._sessionService.getBranch();
    this._serviceRequest.userid = this._sessionService.getUser();
    this._serviceRequest.status_code = this.custstatus;

    this._CommonService.commonPost('ServiceRequest/saveServiceRequest' ,this._serviceRequest)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
           this.dismiss();
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

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
    this.setCustomerInfo($event);
  }

  setCustomerInfo($event){
    var custNo = $event.split("(")[0];
    var customerInfo = this._customers.forEach(x => {
      if(x.cust_no == custNo){
        //this.checkRecomendation(x.cust_no, x.segment_code, this._limitApplicable, this._serviceCode, x.casa_balance.toString(), x.fd_balance.toString(), x.total_balance.toString());
        this._serviceRequest.cust_no = x.cust_no;
        this._serviceRequest.casa_bal = x.casa_balance;
        this._serviceRequest.fd_bal = x.fd_balance;
        this._serviceRequest.tot_bal = x.total_balance;
        this._serviceRequest.cust_address = x.address;
        this._serviceRequest.cust_birthday = x.birth_date;
        this._serviceRequest.cust_mobile = x.mobile_number;
        this._serviceRequest.cust_email = x.e_mail;
        this._serviceRequest.cust_name = x.customer_name;
        this._serviceRequest.service_code = this._serviceCode;
        this.birthdate = this.datepipe.transform(this._serviceRequest.cust_birthday, 'dd/MM/yyyy');

      }
    });
  }

  getAllCustomers() {
    this._CommonService.commonGet('ServiceRequest/getAllCustomers')
      .subscribe(
        response => {
          this.options = [];
          this._customers = JSON.parse(JSON.stringify(response)).customerInformation;
          this._customers.forEach((data) => {
            this.options.push(data.cust_no + "(" + data.customer_name + ")");
           });
          this.filteredOptions$ = of(this.options);
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
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

  checkRecomendation(cust_no: string, segment_code: string, limit_applicable: string, service_code: string, casa_balance: string, fd_balance: string, total_balance: string){
    this._CommonService.commonGet('ServiceRequest/checkRecomendation?cust_no=' + cust_no + "&&segment_code=" + segment_code + "&&limit_applicable=" + limit_applicable + "&&service_code=" + service_code + "&&casa_balance=" + casa_balance + "&&fd_balance=" + fd_balance + "&&total_balance=" + total_balance)
    .subscribe(
      response => {
        this.limit_status = JSON.parse(JSON.stringify(response)).limit_status;
        this.casa_status = JSON.parse(JSON.stringify(response)).casa_status;
        this.fd_status = JSON.parse(JSON.stringify(response)).fd_status;
        this.total_status = JSON.parse(JSON.stringify(response)).total_status;
        if(this.limit_status == 'N' || this.casa_status == 'N' || this.fd_status == 'N' || this.total_status == 'N' ){
          this.need_recomendation = true;
          this.custstatus = 'R';
          this._serviceRequest.status_code = 'R';
        }
        else{
          this._serviceRequest.status_code = 'P';
        }
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  dismiss() {
    //this.ref.close(this._serviceRequest);
    this.rep_date = null;
    this.rep_date_ret = null;
    this.submitted = false;
    var passreq = this._serviceRequest;
    this._serviceRequest = new ServiceRequest();
    this.textfromanother = "block";
    this.birthdate = null;
    this.pickdrop.closePopupForEdit(passreq);
  }

  editServiceRequest(){
    this._serviceRequest = this.service;
  }
  getAllAirPort(){
    this._CommonService.commonGet('ServiceRequest/getAllAirport/'+this._sessionService.getUser())
    .subscribe(
      response => {
        this._airport = JSON.parse(JSON.stringify(response)).airPort;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }
  getVehicleType(){
    this._CommonService.commonGet('ServiceRequest/getVehicleType/'+this._sessionService.getUser())
    .subscribe(
      response => {
        this._vehichle_type = JSON.parse(JSON.stringify(response)).vehicle;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  private customValidation(){
    if(this.isdeparture){
      this.masterForm.controls.airline_code.setValidators(Validators.required);
      this.masterForm.controls.airline_code.updateValueAndValidity();
      this.masterForm.controls.flight_no.setValidators(Validators.required);
      this.masterForm.controls.flight_no.updateValueAndValidity();
      this.masterForm.controls.reporting_date.setValidators(Validators.required);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
      this.masterForm.controls.pick_address.setValidators(Validators.required);
      this.masterForm.controls.pick_address.updateValueAndValidity();
      this.masterForm.controls.drop_airport.setValidators(Validators.required);
      this.masterForm.controls.drop_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type.setValidators(Validators.required);
      this.masterForm.controls.vehichle_type.updateValueAndValidity();

      this.masterForm.controls.airline_code_return.setValidators(null);
      this.masterForm.controls.airline_code_return.updateValueAndValidity();
      this.masterForm.controls.flight_no_return.setValidators(null);
      this.masterForm.controls.flight_no_return.updateValueAndValidity();
      this.masterForm.controls.reporting_date_return.setValidators(null);
      this.masterForm.controls.reporting_date_return.updateValueAndValidity();
      this.masterForm.controls.return_airport.setValidators(null);
      this.masterForm.controls.return_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type_return.setValidators(null);
      this.masterForm.controls.vehichle_type_return.updateValueAndValidity();
      this.masterForm.controls.drop_address.setValidators(null);
      this.masterForm.controls.drop_address.updateValueAndValidity();
    }
    if(this.isreturn){
      this.masterForm.controls.airline_code.setValidators(null);
      this.masterForm.controls.airline_code.updateValueAndValidity();
      this.masterForm.controls.flight_no.setValidators(null);
      this.masterForm.controls.flight_no.updateValueAndValidity();
      this.masterForm.controls.reporting_date.setValidators(null);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
      this.masterForm.controls.pick_address.setValidators(null);
      this.masterForm.controls.pick_address.updateValueAndValidity();
      this.masterForm.controls.drop_airport.setValidators(null);
      this.masterForm.controls.drop_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type.setValidators(null);
      this.masterForm.controls.vehichle_type.updateValueAndValidity();

      this.masterForm.controls.airline_code_return.setValidators(Validators.required);
      this.masterForm.controls.airline_code_return.updateValueAndValidity();
      this.masterForm.controls.flight_no_return.setValidators(Validators.required);
      this.masterForm.controls.flight_no_return.updateValueAndValidity();
      this.masterForm.controls.reporting_date_return.setValidators(Validators.required);
      this.masterForm.controls.reporting_date_return.updateValueAndValidity();
      this.masterForm.controls.return_airport.setValidators(Validators.required);
      this.masterForm.controls.return_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type_return.setValidators(Validators.required);
      this.masterForm.controls.vehichle_type_return.updateValueAndValidity();
      this.masterForm.controls.drop_address.setValidators(Validators.required);
      this.masterForm.controls.drop_address.updateValueAndValidity();
    }

    if(this.isdeparture && this.isreturn){
      this.masterForm.controls.airline_code.setValidators(Validators.required);
      this.masterForm.controls.airline_code.updateValueAndValidity();
      this.masterForm.controls.flight_no.setValidators(Validators.required);
      this.masterForm.controls.flight_no.updateValueAndValidity();
      this.masterForm.controls.reporting_date.setValidators(Validators.required);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
      this.masterForm.controls.pick_address.setValidators(Validators.required);
      this.masterForm.controls.pick_address.updateValueAndValidity();
      this.masterForm.controls.drop_airport.setValidators(Validators.required);
      this.masterForm.controls.drop_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type.setValidators(Validators.required);
      this.masterForm.controls.vehichle_type.updateValueAndValidity();

      this.masterForm.controls.airline_code_return.setValidators(Validators.required);
      this.masterForm.controls.airline_code_return.updateValueAndValidity();
      this.masterForm.controls.flight_no_return.setValidators(Validators.required);
      this.masterForm.controls.flight_no_return.updateValueAndValidity();
      this.masterForm.controls.reporting_date_return.setValidators(Validators.required);
      this.masterForm.controls.reporting_date_return.updateValueAndValidity();
      this.masterForm.controls.return_airport.setValidators(Validators.required);
      this.masterForm.controls.return_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type_return.setValidators(Validators.required);
      this.masterForm.controls.vehichle_type_return.updateValueAndValidity();
      this.masterForm.controls.drop_address.setValidators(Validators.required);
      this.masterForm.controls.drop_address.updateValueAndValidity();
    }
  }
}
