import { formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { AirLine } from '../../../models/AirLine';
import { AirPort } from '../../../models/AirPort';
import { CustomerUBS } from '../../../models/CustomerUBS';
import { Gift } from '../../../models/Gift';
import { GiftVendor } from '../../../models/GiftVendor';
import { ServiceRequest } from '../../../models/ServiceRequest';
import { VasService } from '../../../models/VasService';
import { VehichleType } from '../../../models/VehichleType';
import { Vendor } from '../../../models/Vendor';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { GenerateRequestComponent } from '../generate-request.component';

@Component({
  selector: 'ngx-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit, OnChanges {
  @Input() _customerfromgenerateRequest: CustomerUBS;
  _customerInfo: CustomerUBS;
  @Input() isbirth: boolean;
  @Input() textfromother: string;
  public _airlines : AirLine[];
  public _airport : AirPort[];
  public _vendors : Vendor[];
  public _showVendor : Vendor[];
  public _gifts : Gift[];
  public _giftvendors : GiftVendor[];
  public _vehichle_type : VehichleType[];
  public _serviceRequest: ServiceRequest;
  submitted = false;
  public _vasServices: VasService[];
  public customer_name: string;
  public masterForm: FormGroup;
  public limit_status: string;
  public casa_status: string;
  public fd_status: string;
  public total_status: string;
  need_recomendation: boolean = false;
  showHide: boolean = false;
  public custstatus: string = this._sessionService.getPending();
  isPickDrop = false;
  ismeetgreet = false;
  isbirthday = false;
  isskylounge = false;
  pickDrop = this._sessionService.getPickandDrop();
  meetgreet = this._sessionService.getMeetandGreet();
  birthday = this._sessionService.getBirthday();
  skylounge = this._sessionService.getSkyLounge();  
  ischeckrecom = false;
  isDeparture = false;
  isReturn = false;
  enable_checked = true;
  enable_ret = false;
  recommessage: string = "";
  datetest: Date = new Date();

  rep_date: Date;
  rep_date_ret: Date;
  constructor(private _CommonService: CommonService, private generaterequest: GenerateRequestComponent,
              private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService,
              private _sessionService: SessionService) { 
    this._serviceRequest = new ServiceRequest();
    this._customerInfo = new CustomerUBS();
  }

  ngOnInit(): void {
    this.fromCreate();
    this.setData();
    this.getAllAirline();
    this.getAllAirPort();
    this.getAllVasService();
    this.getAllVendors();
    this.getAllGifts();
    this.getAllGiftVendor();
    this.getVehicleType();
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      cust_no: ['', []],
      cust_name: ['', []],
      casa_bal: ['', []],
      fd_bal: ['', []],
      tot_bal: ['', []],
      cust_mobile: ['', []],
      cust_birthday: ['', []],
      request_date: ['', []],
      airline_code: ['', []],
      flight_no: ['', []],
      reporting_date: ['', []],
      airline_code_return: ['', []],
      flight_no_return: ['',],
      reporting_date_return: ['',],
      alternet_name: ['', []],
      alternet_mobile: ['', [ Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      remarks: ['', []],
      pick_address: ['', []],
      vehichle_type: ['', []],
      vehichle_type_return: ['', []],
      drop_airport: ['', []],
      return_airport: ['',],
      drop_address: ['', []],
      total_person: ['', []],
      total_person_return: ['', []],
      gift_type: ['', []] ,
      vendor: ['', []] ,
      address: ['', []] ,
      recom_note: ['', []] ,
      service_code: ['', [Validators.required]] ,
      // StartDate: ['', [Validators.required]],
      // EndDate: ['', [Validators.required]],
      // Status: ['', [Validators.required]],

    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  ngOnChanges() {
    this.enable_checked = true;
    this.enable_ret = false;    
    this.isReturn = false;
    this._customerInfo = new CustomerUBS();
    this._customerInfo = this._customerfromgenerateRequest;
    this._serviceRequest.cust_no = this._customerInfo.cust_no;
    this._serviceRequest.cust_name = this._customerInfo.customer_name;
    this._serviceRequest.casa_bal = this._customerInfo.casa_balance;
    this._serviceRequest.fd_bal = this._customerInfo.fd_balance;
    this._serviceRequest.tot_bal = this._customerInfo.total_balance;
    this._serviceRequest.cust_address = this._customerInfo.address;
    this._serviceRequest.cust_birthday = this._customerInfo.birth_date;
    this._serviceRequest.cust_mobile = this._customerInfo.mobile_number;
    this._serviceRequest.cust_email = this._customerInfo.e_mail;
    this._serviceRequest.priority_code = this._customerInfo.priority_code;
    this._serviceRequest.branch_code = this._customerInfo.branch_code;
    this._serviceRequest.segment_code = this._customerInfo.segment_code;
    //this.setData();
    this.getAllAirline();
    this.getAllAirPort();
    this.getAllVasService();
    this.getAllVendors();
    this.getAllGifts();
    this.getAllGiftVendor();
    this.getVehicleType();
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

  getAllVasService(){
    this._CommonService.commonGet('ServiceRequest/getAllVasService/' + this._sessionService.getUser())
    .subscribe(
      response => {
        this._vasServices = JSON.parse(JSON.stringify(response)).vasService;
        if(!this.isbirth){
          let index = this._vasServices.findIndex((element) => element.service_code == this.birthday);
          this._vasServices.splice(index, 1);
        }
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  setData(){
    this._serviceRequest.cust_no = this._customerInfo.cust_no;
    this._serviceRequest.cust_name = this._customerInfo.customer_name;
    this._serviceRequest.casa_bal = this._customerInfo.casa_balance;
    this._serviceRequest.fd_bal = this._customerInfo.fd_balance;
    this._serviceRequest.tot_bal = this._customerInfo.total_balance;
    this._serviceRequest.cust_address = this._customerInfo.address;
    this._serviceRequest.cust_birthday = this._customerInfo.birth_date;
    this._serviceRequest.cust_mobile = this._customerInfo.mobile_number;
    this._serviceRequest.cust_email = this._customerInfo.e_mail;
    this._serviceRequest.priority_code = this._customerInfo.priority_code;
    this._serviceRequest.branch_code = this._customerInfo.branch_code;
  }

  selectVasService(service_code){
    // this._serviceRequest = new ServiceRequest();
    // this.setData();
    this._serviceRequest.service_code = service_code;
    this.enable_checked = true;
    this.enable_ret = false;
    this.isReturn = false;
    this.submitted = false;
    this.allfieldreset();
    switch(service_code){
      case this.pickDrop:
        this.isPickDrop = true;
        this.ismeetgreet = false;
        this.isbirthday = false;
        this.isskylounge = false;
        this.isDeparture = true;
        if(this._customerInfo.picdrop_recom === "Y"){
          this.ischeckrecom = true;
          this.recommessage = this._customerInfo.picdrop_reason;
        }
        else{
          this.ischeckrecom = false;
        }
        this.customValidation();
        break;
      case this.meetgreet:
        this.isPickDrop = false;
        this.ismeetgreet = true;
        this.isbirthday = false;
        this.isskylounge = false;
        this.ischeckrecom = false;
        this.isDeparture = true;
        this.customValidation();

        break;
      case this.birthday:
        this.isPickDrop = false;
        this.ismeetgreet = false;
        this.isbirthday = true;
        this.isskylounge = false;
        if(this._customerInfo.birthday_recom === "Y"){
          this.ischeckrecom = true;
          this.recommessage = this._customerInfo.birthday_reason;
        }
        else{
          this.ischeckrecom = false;
        }  
        this.customValidation();
        break;
      case this.skylounge:
        this.isPickDrop = false;
        this.ismeetgreet = false;
        this.isbirthday = false;
        this.isskylounge = true;       
        this.ischeckrecom = false;
        this.customValidation();
        break;
    }
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
          this.custstatus = 'R'
        }
        else{
          this.ischeckrecom = false;
        }
        this.showHide = true;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  onSaveUser(){
    if(this._serviceRequest.service_code == null || this._serviceRequest.segment_code == ''){
      this._influxToastaService.showToast('danger', 'Response', "select service");
      return;
    }
    this.submitted = true;
    if(this.enable_checked && this.rep_date != null){
      this.masterForm.controls.reporting_date.setValidators(null);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
    }
    if(this.enable_ret && this.rep_date_ret != null){
      this.masterForm.controls.reporting_date_return.setValidators(null);
      this.masterForm.controls.reporting_date_return.updateValueAndValidity();
    }
    if(this._serviceRequest.service_code === this._sessionService.getBirthday() && this.rep_date != null){
      this.masterForm.controls.reporting_date.setValidators(null);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
    }
    if(this.isPickDrop){
      this.masterForm.controls.flight_no.setValidators(null);
      this.masterForm.controls.flight_no.updateValueAndValidity();

      this.masterForm.controls.flight_no_return.setValidators(null);
      this.masterForm.controls.flight_no_return.updateValueAndValidity();
    }
    if (this.masterForm.invalid) {
      return;
    }

    this._serviceRequest.reporting_date = this.rep_date != null ? this._sessionService.dateformat(this.rep_date) : "";
    this._serviceRequest.reporting_date_return = this.rep_date_ret != null ? this._sessionService.dateformat(this.rep_date_ret) : "";
    this._serviceRequest.userid = this._sessionService.getUser();
    this._serviceRequest.status_code = this.ischeckrecom == true ? this._sessionService.getRecommendation() : this._sessionService.getPending();
    this._serviceRequest.recom_message = this.recommessage;
    if(this.ischeckrecom && this._serviceRequest.service_code === this._sessionService.getBirthday()){
      this._serviceRequest.recom_by = this._sessionService.getUser();
      this._serviceRequest.total_person = this._serviceRequest.total_person.includes('e') ? this._serviceRequest.total_person.replace('e', '') : this._serviceRequest.total_person;
      this._serviceRequest.total_person_return = this._serviceRequest.total_person_return.includes('e') ? this._serviceRequest.total_person_return.replace('e', '') : this._serviceRequest.total_person_return;
    }    
    //this._serviceRequest.status_code = this._serviceRequest.service_code === "S003" ? "P": this._serviceRequest.status_code;

    this._CommonService.commonPost('ServiceRequest/saveServiceRequest' ,this._serviceRequest)
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
    //this.ref.close();
    this._serviceRequest = new ServiceRequest();
    this.isPickDrop = false;
    this.ismeetgreet = false;
    this.isbirthday = false;
    this.isskylounge = false;
    this.ischeckrecom = false;
    this.isDeparture = false;
    this.submitted = false;
    this.rep_date = null;
    this.rep_date_ret = null;
    this.generaterequest.closePopupforAddRequest();
  }

  private customValidation(){
    if(this.isPickDrop && this.isDeparture){
      this.masterForm.controls.airline_code.setValidators(Validators.required);
      this.masterForm.controls.airline_code.updateValueAndValidity();
      this.masterForm.controls.flight_no.setValidators(null);
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
      this.masterForm.controls.total_person.setValidators(null);
      this.masterForm.controls.total_person.updateValueAndValidity();
      this.masterForm.controls.total_person_return.setValidators(null);
      this.masterForm.controls.total_person_return.updateValueAndValidity();
      this.masterForm.controls.vendor.setValidators(null);
      this.masterForm.controls.vendor.updateValueAndValidity();
      this.masterForm.controls.gift_type.setValidators(null);
      this.masterForm.controls.gift_type.updateValueAndValidity();
    }
    if(this.isPickDrop && this.isReturn){
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
      this.masterForm.controls.total_person.setValidators(null);
      this.masterForm.controls.total_person.updateValueAndValidity();
      this.masterForm.controls.total_person_return.setValidators(null);
      this.masterForm.controls.total_person_return.updateValueAndValidity();
      this.masterForm.controls.vendor.setValidators(null);
      this.masterForm.controls.vendor.updateValueAndValidity();
      this.masterForm.controls.gift_type.setValidators(null);
      this.masterForm.controls.gift_type.updateValueAndValidity();

      this.masterForm.controls.airline_code_return.setValidators(Validators.required);
      this.masterForm.controls.airline_code_return.updateValueAndValidity();
      this.masterForm.controls.flight_no_return.setValidators(null);
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
    if(this.isPickDrop && this.isReturn && this.isDeparture){
      this.masterForm.controls.airline_code.setValidators(Validators.required);
      this.masterForm.controls.airline_code.updateValueAndValidity();
      this.masterForm.controls.flight_no.setValidators(null);
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
      this.masterForm.controls.flight_no_return.setValidators(null);
      this.masterForm.controls.flight_no_return.updateValueAndValidity();
      this.masterForm.controls.reporting_date_return.setValidators(Validators.required);
      this.masterForm.controls.reporting_date_return.updateValueAndValidity();
      this.masterForm.controls.return_airport.setValidators(Validators.required);
      this.masterForm.controls.return_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type_return.setValidators(Validators.required);
      this.masterForm.controls.vehichle_type_return.updateValueAndValidity();
      this.masterForm.controls.drop_address.setValidators(Validators.required);
      this.masterForm.controls.drop_address.updateValueAndValidity();

      this.masterForm.controls.total_person.setValidators(null);
      this.masterForm.controls.total_person.updateValueAndValidity();
      this.masterForm.controls.total_person_return.setValidators(null);
      this.masterForm.controls.total_person_return.updateValueAndValidity();
      this.masterForm.controls.vendor.setValidators(null);
      this.masterForm.controls.vendor.updateValueAndValidity();
      this.masterForm.controls.gift_type.setValidators(null);
      this.masterForm.controls.gift_type.updateValueAndValidity();
    }

    if(this.ismeetgreet && this.isDeparture){
      this.masterForm.controls.airline_code.setValidators(Validators.required);
      this.masterForm.controls.airline_code.updateValueAndValidity();
      this.masterForm.controls.flight_no.setValidators(Validators.required);
      this.masterForm.controls.flight_no.updateValueAndValidity();
      this.masterForm.controls.reporting_date.setValidators(Validators.required);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
      this.masterForm.controls.total_person.setValidators(Validators.required);
      this.masterForm.controls.total_person.updateValueAndValidity();

      this.masterForm.controls.pick_address.setValidators(null);
      this.masterForm.controls.pick_address.updateValueAndValidity();
      this.masterForm.controls.drop_airport.setValidators(null);
      this.masterForm.controls.drop_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type.setValidators(null);
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
      this.masterForm.controls.total_person_return.setValidators(null);
      this.masterForm.controls.total_person_return.updateValueAndValidity();
      this.masterForm.controls.vendor.setValidators(null);
      this.masterForm.controls.vendor.updateValueAndValidity();
      this.masterForm.controls.gift_type.setValidators(null);
      this.masterForm.controls.gift_type.updateValueAndValidity();
    }
    if(this.ismeetgreet && this.isReturn){
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
      this.masterForm.controls.total_person_return.setValidators(Validators.required);
      this.masterForm.controls.total_person_return.updateValueAndValidity();

      this.masterForm.controls.return_airport.setValidators(null);
      this.masterForm.controls.return_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type_return.setValidators(null);
      this.masterForm.controls.vehichle_type_return.updateValueAndValidity();
      this.masterForm.controls.drop_address.setValidators(null);
      this.masterForm.controls.drop_address.updateValueAndValidity();
      this.masterForm.controls.total_person.setValidators(null);
      this.masterForm.controls.total_person.updateValueAndValidity();
      this.masterForm.controls.vendor.setValidators(null);
      this.masterForm.controls.vendor.updateValueAndValidity();
      this.masterForm.controls.gift_type.setValidators(null);
      this.masterForm.controls.gift_type.updateValueAndValidity();
    }
    if(this.ismeetgreet && this.isReturn && this.isDeparture){
      this.masterForm.controls.airline_code.setValidators(Validators.required);
      this.masterForm.controls.airline_code.updateValueAndValidity();
      this.masterForm.controls.flight_no.setValidators(Validators.required);
      this.masterForm.controls.flight_no.updateValueAndValidity();
      this.masterForm.controls.reporting_date.setValidators(Validators.required);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
      this.masterForm.controls.total_person.setValidators(Validators.required);
      this.masterForm.controls.total_person.updateValueAndValidity();
      this.masterForm.controls.airline_code_return.setValidators(Validators.required);
      this.masterForm.controls.airline_code_return.updateValueAndValidity();
      this.masterForm.controls.flight_no_return.setValidators(Validators.required);
      this.masterForm.controls.flight_no_return.updateValueAndValidity();
      this.masterForm.controls.reporting_date_return.setValidators(Validators.required);
      this.masterForm.controls.reporting_date_return.updateValueAndValidity();
      this.masterForm.controls.total_person_return.setValidators(Validators.required);
      this.masterForm.controls.total_person_return.updateValueAndValidity();

      this.masterForm.controls.pick_address.setValidators(null);
      this.masterForm.controls.pick_address.updateValueAndValidity();
      this.masterForm.controls.drop_airport.setValidators(null);
      this.masterForm.controls.drop_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type.setValidators(null);
      this.masterForm.controls.vehichle_type.updateValueAndValidity();      
      this.masterForm.controls.return_airport.setValidators(null);
      this.masterForm.controls.return_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type_return.setValidators(null);
      this.masterForm.controls.vehichle_type_return.updateValueAndValidity();
      this.masterForm.controls.drop_address.setValidators(null);
      this.masterForm.controls.drop_address.updateValueAndValidity();
      this.masterForm.controls.vendor.setValidators(null);
      this.masterForm.controls.vendor.updateValueAndValidity();
      this.masterForm.controls.gift_type.setValidators(null);
      this.masterForm.controls.gift_type.updateValueAndValidity();
    }
    if(this.isskylounge){
      this.masterForm.controls.airline_code.setValidators(Validators.required);
      this.masterForm.controls.airline_code.updateValueAndValidity();
      this.masterForm.controls.flight_no.setValidators(Validators.required);
      this.masterForm.controls.flight_no.updateValueAndValidity();
      this.masterForm.controls.reporting_date.setValidators(Validators.required);
      this.masterForm.controls.reporting_date.updateValueAndValidity();
      this.masterForm.controls.total_person.setValidators(Validators.required);
      this.masterForm.controls.total_person.updateValueAndValidity();

      this.masterForm.controls.pick_address.setValidators(null);
      this.masterForm.controls.pick_address.updateValueAndValidity();
      this.masterForm.controls.drop_airport.setValidators(null);
      this.masterForm.controls.drop_airport.updateValueAndValidity();
      this.masterForm.controls.vehichle_type.setValidators(null);
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
      this.masterForm.controls.total_person_return.setValidators(null);
      this.masterForm.controls.total_person_return.updateValueAndValidity();
      this.masterForm.controls.vendor.setValidators(null);
      this.masterForm.controls.vendor.updateValueAndValidity();
      this.masterForm.controls.gift_type.setValidators(null);
      this.masterForm.controls.gift_type.updateValueAndValidity();
    }
    if(this.isbirthday){
      this.masterForm.controls.vendor.setValidators(Validators.required);
      this.masterForm.controls.vendor.updateValueAndValidity();
      this.masterForm.controls.gift_type.setValidators(Validators.required);
      this.masterForm.controls.gift_type.updateValueAndValidity();

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
      this.masterForm.controls.total_person.setValidators(null);
      this.masterForm.controls.total_person.updateValueAndValidity();
      this.masterForm.controls.total_person_return.setValidators(null);
      this.masterForm.controls.total_person_return.updateValueAndValidity();
    }
  }

  departureCheck(){
    this.isDeparture = !this.isDeparture;
    this.enable_checked = !this.enable_checked;
    this.masterForm.controls.airline_code.reset();
    this.masterForm.controls.flight_no.reset();
    this.masterForm.controls.reporting_date.reset();
    this.masterForm.controls.pick_address.reset();
    this.masterForm.controls.drop_airport.reset();
    this.masterForm.controls.vehichle_type.reset();
    this.masterForm.controls.total_person.reset();
    this.customValidation();
  }
  returnCheck(){
    this.isReturn = !this.isReturn;
    this.enable_ret = !this.enable_ret;
    this.masterForm.controls.airline_code_return.reset();
    this.masterForm.controls.flight_no_return.reset();
    this.masterForm.controls.reporting_date_return.reset();
    this.masterForm.controls.drop_address.reset();
    this.masterForm.controls.return_airport.reset();
    this.masterForm.controls.vehichle_type_return.reset();
    this.masterForm.controls.total_person_return.reset();
    this.customValidation();
  }

  allfieldreset(){
    this.masterForm.controls.airline_code.reset();
    this.masterForm.controls.flight_no.reset();
    this.masterForm.controls.reporting_date.reset();
    this.masterForm.controls.pick_address.reset();
    this.masterForm.controls.drop_airport.reset();
    this.masterForm.controls.vehichle_type.reset();
    this.masterForm.controls.total_person.reset();

    this.masterForm.controls.airline_code_return.reset();
    this.masterForm.controls.flight_no_return.reset();
    this.masterForm.controls.reporting_date_return.reset();
    this.masterForm.controls.drop_address.reset();
    this.masterForm.controls.return_airport.reset();
    this.masterForm.controls.vehichle_type_return.reset();
    this.masterForm.controls.total_person_return.reset();

    this.masterForm.controls.alternet_name.reset();
    this.masterForm.controls.alternet_mobile.reset();
    this.masterForm.controls.remarks.reset();
    this.masterForm.controls.total_person.reset();
  }

  getAllVendors(){
    this._CommonService.commonGet('ServiceRequest/getAllVendors?puserid =' + this._sessionService.getUser() + '&&vascode='  + this._sessionService.getBirthday())
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
  
  getAllGiftVendor(){
    this._CommonService.commonGet('ServiceRequest/getAllGiftVendor?userid=' + this._sessionService.getUser())
    .subscribe(
      response => {
        this._giftvendors = JSON.parse(JSON.stringify(response)).giftvendors;
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

  changeVendor(gift: string){
    this._showVendor=[];
    this.masterForm.controls.vendor.setValue(null);
    this._giftvendors.forEach(x =>{
      if(x.gift_code == gift){
        this._vendors.forEach(y => {
          if(y.vendor_code == x.vendor_code){
            this._showVendor.push(y);
          }
        })
      }
    })
  }
}
