import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { CustomerUBS } from '../../../models/CustomerUBS';
import { Gift } from '../../../models/Gift';
import { GiftVendor } from '../../../models/GiftVendor';
import { ServiceRequest } from '../../../models/ServiceRequest';
import { VehichleType } from '../../../models/VehichleType';
import { Vendor } from '../../../models/Vendor';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { CustomerBirthdayComponent } from '../customer-birthday.component';

@Component({
  selector: 'ngx-add-birthgift',
  templateUrl: './add-birthgift.component.html',
  styleUrls: ['./add-birthgift.component.scss']
})
export class AddBirthgiftComponent implements OnInit, OnChanges {
  @Input() _customerfromgenerateRequest: CustomerUBS;
  servicename: string = "Birthday Gift";
  @Input() textfromother: string;
  _customerInfo: CustomerUBS;  
  public _serviceRequest: ServiceRequest;
  public masterForm: FormGroup;
  public _gifts : Gift[];
  public _giftvendors : GiftVendor[];
  public _vendors : Vendor[];
  public _showVendor : Vendor[];
  submitted = false;
  constructor(private _CommonService: CommonService, private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService,
              private _sessionService: SessionService, private custbirthcomp: CustomerBirthdayComponent) {
                this._serviceRequest = new ServiceRequest();
                this._customerInfo = new CustomerUBS();
}

  ngOnInit(): void {
    this.fromCreate()
  }

  ngOnChanges() {
    this._customerInfo = new CustomerUBS();
    this.submitted = false;
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
    this._serviceRequest.recom_message = this._customerInfo.birthday_reason;
    //this.setData();

    this.getAllVendors();
    this.getAllGifts();
    this.getAllGiftVendor();
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
      gift_type: ['', [Validators.required]] ,
      vendor: ['', [Validators.required]] ,
      address: ['', []] ,
      recom_note: ['', []] ,
      servicename: ['', []] ,

    });
  }

  get fval() {
    return this.masterForm.controls;
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

  onSaveUser(){
    this.submitted = true;
    if (this.masterForm.invalid) {
      return;
    }

    this._serviceRequest.ins_by = this._sessionService.getUser();
    //this._serviceRequest.priority_code = sessionStorage.getItem("BranchCode");
    // this._serviceRequest.userid = this._sessionService.getUser();
    // this._serviceRequest.status_code = this.ischeckrecom == true ? this._sessionService.getRecommendation() : this._sessionService.getPending();
    // this._serviceRequest.recom_message = this.recommessage;
    // if(this.ischeckrecom && this._serviceRequest.service_code === this._sessionService.getBirthday()){
    //   this._serviceRequest.recom_by = this._sessionService.getUser();
    // }    
    //this._serviceRequest.status_code = this._serviceRequest.service_code === "S003" ? "P": this._serviceRequest.status_code;
    this._serviceRequest.service_code = this._sessionService.getBirthday();
    this._CommonService.commonPost('ServiceRequest/saveServiceRequest' ,this._serviceRequest)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.dismiss(val.status_code);
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

  dismiss(status_code: string){
    this._serviceRequest = new ServiceRequest();
    this.submitted = false;
    this.custbirthcomp.closePopupforAddRequest(status_code);
  }
}
