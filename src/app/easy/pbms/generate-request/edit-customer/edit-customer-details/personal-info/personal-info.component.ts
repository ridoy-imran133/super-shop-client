import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../../../shared/_services/influx.toast.service';
import { CustomerUBS } from '../../../../../models/CustomerUBS';
import { ServiceRequest } from '../../../../../models/ServiceRequest';
import { CommonService } from '../../../../../services/common.service';
import { SessionService } from '../../../../../services/session.service';
import { DatePipe, formatDate } from '@angular/common'

@Component({
  selector: 'ngx-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  @Input() _customerInfo: CustomerUBS;
  public personalInfo: CustomerUBS;
  public PersonalInfoForm: FormGroup;
  submitted: boolean = false;
  date : Date =  new Date();
  public _serviceRequest: ServiceRequest;
  constructor(

    private formBuilder: FormBuilder,
    private _CommonService: CommonService,
    private _sessionService: SessionService,
    private _influxToastaService: InfluxToastaService,
    public datepipe: DatePipe,
    protected ref: NbDialogRef<PersonalInfoComponent>
  ) {
    this.personalInfo = new CustomerUBS();
   }

  ngOnInit(): void {
    this.getPersonalinfoDetails();
    this.preparePersonalFrom(null);
  }

  get fval() {
    return this.PersonalInfoForm.controls;
  }

  
  getPersonalinfoDetails() {
    this.date=new Date();
    this._CommonService.commonGet('ServiceRequest/GetAllCustomers/?custno=' + this._customerInfo.cust_no + "&&userId=" + this._sessionService.getUser())
      .subscribe(
        response => {
          var val = JSON.parse(JSON.stringify(response));
          this.personalInfo = val.customerInformation[0];
          this.personalInfo.status = val.customerInformation[0].status == "Y" ? "Yes" : "No";
          this.personalInfo.picdrop_recom = val.customerInformation[0].picdrop_recom == "Y" ? "Yes" : "No";
          this.personalInfo.birthday_recom = val.customerInformation[0].birthday_recom == "Y" ? "Yes" : "No";
          
        },
        error => {
        },
        () => {

        }
      );
  }

  preparePersonalFrom(formData : CustomerUBS) {
    formData = formData ? formData : new CustomerUBS();
    this.PersonalInfoForm = this.formBuilder.group({
      branch_code        : [formData.branch_code, ''],
      branch_name        : [formData.branch_name, ''],
      business_date      : [formData.business_date, ''],
      segment_name       : [formData.segment_name, ''],
      cat_desc           : [formData.cat_desc, ''],
      customer_desc      : [formData.customer_desc, ''],
      birth_date         : [formData.birth_date, ''],
      cif_creation_date  : [formData.cif_creation_date, ''],
      family_cif         : [formData.family_cif, ''],
      address            : [formData.address, ''],
      priority_code      : [formData.priority_code, ''],
      mobile_number      : [formData.mobile_number, ''],
      birthday_recom     : [formData.birthday_recom, ''],
      e_mail             : [formData.e_mail, ''],
      picdrop_recom      : [formData.picdrop_recom, ''],
      birthday_reason    : [formData.birthday_reason, ''],
      casa_balance       : [formData.casa_balance, ''],
      fd_balance         : [formData.fd_balance, ''],
      total_balance      : [formData.total_balance, ''],
      picdrop_reason     : [formData.picdrop_reason, ''],
      status             : [formData.status, ''], 
      cust_no            : [formData.cust_no, ''],
    });
  }
}
