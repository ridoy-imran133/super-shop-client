import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../../../shared/_services/influx.toast.service';
import { BankingInfo } from '../../../../../models/BankingInfo';
import { CustomerUBS } from '../../../../../models/CustomerUBS';
import { ServiceRequest } from '../../../../../models/ServiceRequest';
import { CommonService } from '../../../../../services/common.service';
import { SessionService } from '../../../../../services/session.service';

@Component({
  selector: 'ngx-banking-info',
  templateUrl: './banking-info.component.html',
  styleUrls: ['./banking-info.component.scss']
})
export class BankingInfoComponent implements OnInit {
  
  @Input() _customerInfo: CustomerUBS;
  public bankingInfo: BankingInfo;
  public bankinginfoForm: FormGroup;
  submitted: boolean=false;
  public _serviceRequest: ServiceRequest;
  bstatus: boolean = false;
  bdps_with_ebl : boolean = false;
  bdebit_card_ebl: boolean = false;
  bcredit_card_ebl: boolean = false;
  blifestyle_card_ebl: boolean = false;
  bsecured_loan_ebl : boolean = false;
  bpersonal_loan_ebl : boolean = false;
  bauto_loan_ebl: boolean = false;
  bhome_loan_ebl : boolean = false;
  bwheeler_loan_ebl : boolean = false;
  dps_with_ebl_text: string = "Yes";

  constructor(
    private formBuilder: FormBuilder,
    private _CommonService: CommonService,
    private _sessionService: SessionService,
    private _influxToastaService: InfluxToastaService,
    protected ref: NbDialogRef<BankingInfoComponent>
  ) { }

  ngOnInit(): void {
    this.prepareFrom(null);
    this.bankingInfo = new BankingInfo();
    this.getBankinfoDetails();
  }


  get fval() {
    return this.bankinginfoForm.controls;
  }


prepareFrom (formData : BankingInfo){
  formData = formData ? formData : new BankingInfo();
  this.bankinginfoForm = this.formBuilder.group({
  cust_no           : [formData.cust_no ? formData.cust_no: this._customerInfo.cust_no , [Validators.required]],
  dps_with_ebl      : [formData.dps_with_ebl == "Y" ? true : false, [Validators.required]],
  debit_card_ebl    : [formData.debit_card_ebl == "Y" ? true : false, [Validators.required]],
  credit_card_ebl   : [formData.credit_card_ebl == "Y" ? true : false, [Validators.required]],
  lifestyle_card_ebl : [formData.lifestyle_card_ebl == "Y" ? true : false, [Validators.required]],
  secured_loan_ebl  : [formData.secured_loan_ebl == "Y" ? true : false, [Validators.required]],
  personal_loan_ebl : [formData.personal_loan_ebl == "Y" ? true : false, [Validators.required]],
  auto_loan_ebl     : [formData.auto_loan_ebl == "Y" ? true : false, [Validators.required]],
  home_loan_ebl     : [formData.home_loan_ebl == "Y" ? true : false, [Validators.required]],
  wheeler_loan_ebl  : [formData.wheeler_loan_ebl == "Y" ? true : false, [Validators.required]],
  banking_status    : [formData.banking_status == "Y" ? true : false, [Validators.required]],
  family_cif        : [formData.family_cif ?  formData.family_cif : "" , [Validators.required]]
});

// this.bankinginfoForm.get('dps_with_ebl').valueChanges.subscribe(
//   value => {
//       if (value) {
//           this.dps_with_ebl_text = "Yes"; 
//       }
//       if (!value) {
//         this.dps_with_ebl_text = "No";
//       }
//   }
// );
}



onSaveBankingInfo(){
  this.submitted = true;
  this.bankingInfo.cust_no = this._customerInfo.cust_no;
  this.bankingInfo.dps_with_ebl = this.bankinginfoForm.controls.dps_with_ebl.value == true ? "Y": "N";
  this.bankingInfo.debit_card_ebl = this.bankinginfoForm.controls.debit_card_ebl.value == true ? "Y": "N";
  this.bankingInfo.credit_card_ebl = this.bankinginfoForm.controls.credit_card_ebl.value == true ? "Y": "N";
  this.bankingInfo.lifestyle_card_ebl = this.bankinginfoForm.controls.lifestyle_card_ebl.value == true ? "Y": "N";
  this.bankingInfo.secured_loan_ebl = this.bankinginfoForm.controls.secured_loan_ebl.value == true ? "Y": "N";
  this.bankingInfo.personal_loan_ebl = this.bankinginfoForm.controls.personal_loan_ebl.value == true ? "Y": "N";
  this.bankingInfo.auto_loan_ebl = this.bankinginfoForm.controls.auto_loan_ebl.value == true ? "Y": "N";
  this.bankingInfo.home_loan_ebl = this.bankinginfoForm.controls.home_loan_ebl.value == true ? "Y": "N";
  this.bankingInfo.wheeler_loan_ebl = this.bankinginfoForm.controls.wheeler_loan_ebl.value == true ? "Y": "N";
  this.bankingInfo.banking_status = this.bankinginfoForm.controls.banking_status.value == true ? "Y": "N";
  this.bankingInfo.family_cif = this.bankinginfoForm.controls.family_cif.value;

  // if (this.personalinfoForm.invalid) {
  //   return;
  //   }
    this._CommonService.commonPost('ServiceRequest/setCustBankingInfo/'+ this._sessionService.getUser() ,  this.bankingInfo)
    
  .subscribe(
    response => {
      var val = JSON.parse(JSON.stringify(response));
      if(val.status_code === '40999'){
        this._influxToastaService.showToast('success', 'Response', val.status_message);
        this.dismiss();
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


getBankinfoDetails(){

  this._CommonService.commonGet('ServiceRequest/GetUserBankingInfo/?cust_no='+ this._customerInfo.cust_no + "&&userid=" +this._sessionService.getUser())
    
  .subscribe(
    response => {
      var val = JSON.parse(JSON.stringify(response));
      //this.bankingInfo = JSON.parse(val);
      this.prepareFrom(val.bankingInfo[0]);
      // if(val.status_code === '40999'){
      //   this._influxToastaService.showToast('success', 'Response', val.status_message);
      //   this.dismiss();
      // }
      // else{
      //   this._influxToastaService.showToast('danger', 'Response', "Failed");
      // }
    },
    error => {
    },
    () => {
      // No errors, route to new page
    }
  );
}


dismiss() {
  this.ref.close();
}

}
