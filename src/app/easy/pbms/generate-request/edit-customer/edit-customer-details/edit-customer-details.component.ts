import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfluxToastaService } from '../../../../../shared/_services/influx.toast.service';
import { BankingInfo } from '../../../../models/BankingInfo';
import { CustomerUBS } from '../../../../models/CustomerUBS';
import { LifeStyleInfo } from '../../../../models/LifeStyleInfo';
import { ServiceRequest } from '../../../../models/ServiceRequest';
import { CommonService } from '../../../../services/common.service';
import { SessionService } from '../../../../services/session.service';
import { GenerateRequestComponent } from '../../generate-request.component';

@Component({
  selector: 'ngx-edit-customer-details',
  templateUrl: './edit-customer-details.component.html',
  styleUrls: ['./edit-customer-details.component.scss']
})
export class EditCustomerDetailsComponent implements OnInit, OnChanges {
  @Input() _customerfromgenerateRequest: CustomerUBS;
  _customerInfo: CustomerUBS;
  cust_no: string;
  cust_name: string;
  submitted: boolean = false;
  date: Date = new Date();
  bstatus: boolean = false;
  bdps_with_ebl: boolean = false;
  bdebit_card_ebl: boolean = false;
  bcredit_card_ebl: boolean = false;
  blifestyle_card_ebl: boolean = false;
  bsecured_loan_ebl: boolean = false;
  bpersonal_loan_ebl: boolean = false;
  bauto_loan_ebl: boolean = false;
  bhome_loan_ebl: boolean = false;
  bwheeler_loan_ebl: boolean = false;
  dps_with_ebl_text: string = "Yes";

  public bankingInfo: BankingInfo;
  public personalInfo: CustomerUBS;
  public PersonalInfoForm: FormGroup;
  public bankinginfoForm: FormGroup;
  public _serviceRequest: ServiceRequest;
  public lifestyleInfoForm: FormGroup;
  public lifeStyleInfo: LifeStyleInfo;

  constructor(
    private _CommonService: CommonService,
    private formBuilder: FormBuilder,
    private _sessionService: SessionService,
    private _influxToastaService: InfluxToastaService,
    private generaterequest: GenerateRequestComponent
  ) {
    this._customerInfo = new CustomerUBS();
    this.bankingInfo = new BankingInfo();
  }

  ngOnInit(): void {
    this.bankingInfo = new BankingInfo();
    this.lifeStyleInfo = new LifeStyleInfo();
  }

  ngOnChanges() {
    this._customerInfo = this._customerfromgenerateRequest ? this._customerfromgenerateRequest : new CustomerUBS();
    this.cust_no = this._customerInfo.cust_no ? this._customerInfo.cust_no : '';
    this.cust_name = this._customerInfo.customer_name ? this._customerInfo.customer_name : '';
    this.preparePersonalFrom(new CustomerUBS());
    this.prepareBankingFrom(new BankingInfo());
    this.fromLifeStyleForm(new LifeStyleInfo());
    this.bankingInfo = new BankingInfo();
    this.lifeStyleInfo = new LifeStyleInfo();
    this.getBankinfoDetails();
    this.getPersonalinfoDetails();
    this.getLifeStyleinfoDetails();

  }

  get fval() {
    return this.PersonalInfoForm.controls;
  }


  getPersonalinfoDetails() {
    this.date = new Date();
    this._CommonService.commonGet('ServiceRequest/GetAllCustomers/?custno=' + this._customerInfo.cust_no + "&&userId=" + this._sessionService.getUser())
      .subscribe(
        response => {
          this.personalInfo = new CustomerUBS();
          var val = JSON.parse(JSON.stringify(response));
          if (val.customerInformation.length > 0) {
            this.personalInfo = val.customerInformation[0];
            this.personalInfo.status = val.customerInformation[0].status == "Y" ? "Yes" : "No";
            this.personalInfo.picdrop_recom = val.customerInformation[0].picdrop_recom == "Y" ? "Yes" : "No";
            this.personalInfo.birthday_recom = val.customerInformation[0].birthday_recom == "Y" ? "Yes" : "No";
            if(this.personalInfo.segment_code != "1005"){       
              this.bankinginfoForm.controls['family_cif'].disable();
            }
          }
          this.cust_no = this._customerInfo.cust_no;
          this.cust_name = this._customerInfo.customer_name;
          this.preparePersonalFrom(this.personalInfo);
        },
        error => {
        },
        () => {

        }
      );
  }

  familyCif: boolean = true;

  getLifeStyleinfoDetails() {
    this._CommonService.commonGet('ServiceRequest/getCustomerPersonalInfo/?cust_no=' + this._customerInfo.cust_no + "&&userid=" + this._sessionService.getUser())
      .subscribe(
        response => {
          var val = JSON.parse(JSON.stringify(response));
          //this.bankingInfo = JSON.parse(val);
          this.fromLifeStyleForm(val.customerPersonalInfo[0]);
        },
        error => {
        },
        () => {
          // No errors, route to new page
        }
      );
  }

  getBankinfoDetails() {
    this._CommonService.commonGet('ServiceRequest/getUserBankingInfo/?cust_no=' + this._customerInfo.cust_no + "&&userid=" + this._sessionService.getUser())
      .subscribe(
        response => {
          var val = JSON.parse(JSON.stringify(response));
          this.bankingInfo = val.bankingInfo[0];
          this.prepareBankingFrom(this.bankingInfo);
        },
        error => {
        },
        () => {
          // No errors, route to new page
        }
      );
  }


  preparePersonalFrom(formData: CustomerUBS) {
    formData = formData ? formData : new CustomerUBS();
    this.PersonalInfoForm = this.formBuilder.group({
      branch_code: [formData.branch_code, ''],
      branch_name: [formData.branch_name, ''],
      business_date: [formData.business_date, ''],
      segment_name: [formData.segment_name, ''],
      cat_desc: [formData.cat_desc, ''],
      customer_desc: [formData.customer_desc, ''],
      birth_date: [formData.birth_date, ''],
      cif_creation_date: [formData.cif_creation_date, ''],
      family_cif: [formData.family_cif, ''],
      address: [formData.address, ''],
      priority_code: [formData.priority_code, ''],
      mobile_number: [formData.mobile_number, ''],
      birthday_recom: [formData.birthday_recom, ''],
      e_mail: [formData.e_mail, ''],
      picdrop_recom: [formData.picdrop_recom, ''],
      birthday_reason: [formData.birthday_reason, ''],
      casa_balance: [formData.casa_balance, ''],
      fd_balance: [formData.fd_balance, ''],
      total_balance: [formData.total_balance, ''],
      picdrop_reason: [formData.picdrop_reason, ''],
      status: [formData.status, ''],
    });
  }


  prepareBankingFrom(formData: BankingInfo) {
    formData = formData ? formData : new BankingInfo();
    this.bankinginfoForm = this.formBuilder.group({
      cust_no: [formData.cust_no ? formData.cust_no : this._customerInfo.cust_no, [Validators.required]],
      dps_with_ebl: [formData.dps_with_ebl == "Y" ? true : false, [Validators.required]],
      debit_card_ebl: [formData.debit_card_ebl == "Y" ? true : false, [Validators.required]],
      credit_card_ebl: [formData.credit_card_ebl == "Y" ? true : false, [Validators.required]],
      lifestyle_card_ebl: [formData.lifestyle_card_ebl == "Y" ? true : false, [Validators.required]],
      secured_loan_ebl: [formData.secured_loan_ebl == "Y" ? true : false, [Validators.required]],
      personal_loan_ebl: [formData.personal_loan_ebl == "Y" ? true : false, [Validators.required]],
      auto_loan_ebl: [formData.auto_loan_ebl == "Y" ? true : false, [Validators.required]],
      home_loan_ebl: [formData.home_loan_ebl == "Y" ? true : false, [Validators.required]],
      wheeler_loan_ebl: [formData.wheeler_loan_ebl == "Y" ? true : false, [Validators.required]],
      banking_status: [formData.banking_status == "Y" ? true : false, [Validators.required]],
      family_cif: [formData.family_cif ? formData.family_cif : "", [Validators.required]]
    });
  }


  fromLifeStyleForm(formData: LifeStyleInfo) {
    formData = formData ? formData : new LifeStyleInfo();
    this.lifestyleInfoForm = this.formBuilder.group({
      travel_mode_code: [formData.travel_mode_code, [Validators.required]],
      airline_name: [formData.airline_name, [Validators.required]],
      cust_no: [formData.cust_no ? formData.cust_no : this._customerInfo.cust_no, [Validators.required]],
      local_holiday_place: [formData.local_holiday_place, [Validators.required]],
      foreign_holiday_place: [formData.local_holiday_place, [Validators.required]],
      local_hotel: [formData.local_hotel, [Validators.required]],
      foreign_hotel: [formData.foreign_hotel, [Validators.required]],
      wishing_vacation_place: [formData.wishing_vacation_place, [Validators.required]],
      child_fav_place: [formData.child_fav_place, [Validators.required]],
      local_shopping_place: [formData.local_shopping_place, [Validators.required]],
      foreign_shopping_place: [formData.foreign_shopping_place, [Validators.required]],
      jewelry_shop: [formData.jewelry_shop, [Validators.required]],
      perfume: [formData.perfume, [Validators.required]],
      privilege_store_name: [formData.privilege_store_name, [Validators.required]],
      favorite_cosine: [formData.favorite_cosine, [Validators.required]],
      favorite_dessert: [formData.favorite_dessert, [Validators.required]],
      favorite_drink: [formData.favorite_drink, [Validators.required]],
      favorite_fruit: [formData.favorite_fruit, [Validators.required]],
      local_restaurant: [formData.local_restaurant, [Validators.required]],
      foreign_restaurant: [formData.foreign_restaurant, [Validators.required]],
      song_type_ben: [formData.song_type_ben, [Validators.required]],
      song_type_nonben: [formData.song_type_nonben, [Validators.required]],
      singer_ben: [formData.singer_ben, [Validators.required]],
      singer_nonben: [formData.singer_nonben, [Validators.required]],
      movie_genre_ben: [formData.movie_genre_ben, [Validators.required]],
      movie_genre_nonben: [formData.movie_genre_nonben, [Validators.required]],
      actor_ben: [formData.actor_ben, [Validators.required]],
      actor_nonben: [formData.actor_nonben, [Validators.required]],
      movie_ben: [formData.movie_ben, [Validators.required]],
      movie_eng: [formData.movie_eng, [Validators.required]],
      movie_others: [formData.movie_others, [Validators.required]],
      writer_ben: [formData.writer_ben, [Validators.required]],
      writer_nonben: [formData.writer_nonben, [Validators.required]],
      fav_radio_channel: [formData.fav_radio_channel, [Validators.required]],
      fav_tv_channel: [formData.fav_tv_channel, [Validators.required]],
      fav_painter: [formData.fav_painter, [Validators.required]],
      preferable_magazine: [formData.preferable_magazine, [Validators.required]],
      fav_mobile_brand: [formData.fav_mobile_brand, [Validators.required]],
      fav_accessories: [formData.fav_accessories, [Validators.required]],
      fav_purfume: [formData.fav_purfume, [Validators.required]],
      fav_car_brand: [formData.fav_car_brand, [Validators.required]],
      fav_grocery_storebd: [formData.fav_grocery_storebd, [Validators.required]],
      fav_toiletries_brand: [formData.fav_toiletries_brand, [Validators.required]],
      fav_spa: [formData.fav_spa, [Validators.required]],
      child_birthday_arng_type: [formData.child_birthday_arng_type, [Validators.required]],
      birthday_gift_code: [formData.birthday_gift_code, [Validators.required]],
      birthday_gift_details: [formData.birthday_gift_details, [Validators.required]],
      aniversary_gift_code: [formData.aniversary_gift_code, [Validators.required]],
      aniversary_gift_details: [formData.aniversary_gift_details, [Validators.required]],
      health_club_member: [formData.health_club_member, [Validators.required]],
      social_club_member: [formData.social_club_member, [Validators.required]],
      local_hospital: [formData.local_hospital, [Validators.required]],
      foreign_hospital: [formData.foreign_hospital, [Validators.required]],
      car_servicing_center: [formData.car_servicing_center, [Validators.required]],
      games_watching: [formData.games_watching, [Validators.required]],
      fav_football_team: [formData.fav_football_team, [Validators.required]],
      fav_cricket_team: [formData.fav_cricket_team, [Validators.required]],
      fav_others_team: [formData.fav_others_team, [Validators.required]],
      fav_sports_person: [formData.fav_sports_person, [Validators.required]],
      hobby: [formData.hobby, [Validators.required]],
      fav_color: [formData.fav_color, [Validators.required]],
      fav_dress: [formData.fav_dress, [Validators.required]],
      passionate_social_culture: [formData.passionate_social_culture, [Validators.required]],
      associate_charity_org: [formData.associate_charity_org, [Validators.required]],
      taken_other_bank_serv: [formData.taken_other_bank_serv, [Validators.required]],
      social_event_expect_ebl: [formData.social_event_expect_ebl, [Validators.required]],
      fav_others_bank: [formData.fav_others_bank, [Validators.required]],
      fav_ebl_service: [formData.fav_ebl_service, [Validators.required]],
      bank_serv_intro_ebl: [formData.bank_serv_intro_ebl, [Validators.required]],
      ebl_serv_improve_name: [formData.ebl_serv_improve_name, [Validators.required]],
      personal_status: [formData.personal_status == "Y" ? true : false, [Validators.required]],
    });
  }






  onSaveBankingInfo() {

    this.submitted = true;
    this.bankingInfo = new BankingInfo();
    this.bankingInfo.cust_no = this._customerInfo.cust_no;
    this.bankingInfo.dps_with_ebl = this.bankinginfoForm.controls.dps_with_ebl.value == true ? "Y" : "N";
    this.bankingInfo.debit_card_ebl = this.bankinginfoForm.controls.debit_card_ebl.value == true ? "Y" : "N";
    this.bankingInfo.credit_card_ebl = this.bankinginfoForm.controls.credit_card_ebl.value == true ? "Y" : "N";
    this.bankingInfo.lifestyle_card_ebl = this.bankinginfoForm.controls.lifestyle_card_ebl.value == true ? "Y" : "N";
    this.bankingInfo.secured_loan_ebl = this.bankinginfoForm.controls.secured_loan_ebl.value == true ? "Y" : "N";
    this.bankingInfo.personal_loan_ebl = this.bankinginfoForm.controls.personal_loan_ebl.value == true ? "Y" : "N";
    this.bankingInfo.auto_loan_ebl = this.bankinginfoForm.controls.auto_loan_ebl.value == true ? "Y" : "N";
    this.bankingInfo.home_loan_ebl = this.bankinginfoForm.controls.home_loan_ebl.value == true ? "Y" : "N";
    this.bankingInfo.wheeler_loan_ebl = this.bankinginfoForm.controls.wheeler_loan_ebl.value == true ? "Y" : "N";
    this.bankingInfo.banking_status = this.bankinginfoForm.controls.banking_status.value == true ? "Y" : "N";
    this.bankingInfo.family_cif = this.bankinginfoForm.controls.family_cif.value;

    this._CommonService.commonPost('ServiceRequest/setCustBankingInfo/' + this._sessionService.getUser(), this.bankingInfo)

      .subscribe(
        response => {
          var val = JSON.parse(JSON.stringify(response));
          if (val.status_code === '40999') {
            this._influxToastaService.showToast('success', 'Response', val.status_message);
            //this.dismiss();
          }
          else {
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

  onSaveLifeStyleInfo() {
    this.submitted = true;
    const lifeStyleInfo: LifeStyleInfo = this.lifestyleInfoForm.value;
    lifeStyleInfo.personal_status = this.lifestyleInfoForm.controls.personal_status.value == true ? "Y" : "N";
    // if (this.lifeStyleInfoForm.invalid) {
    //   return;
    //   }
    this._CommonService.commonPost('ServiceRequest/setCustPersonalInfo/' + this._sessionService.getUser(), lifeStyleInfo)

      .subscribe(
        response => {
          var val = JSON.parse(JSON.stringify(response));
          if (val.status_code === '40999') {
            this._influxToastaService.showToast('success', 'Response', val.status_message);
            //this.dismiss();
          }
          else {
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

  tabs: any[] = [
    {
      title: 'Personal Info',
      route: '/easy/pbms/profile/lifeStyle-info',
    },
    {
      title: 'Banking Info',
      route: '/easy/pbms/profile/banking-info',
    },
    {
      title: 'Personal Info',
      route: '/easy/pbms/profile/personal-info',
    }
  ];

  dismiss() {
    this.generaterequest.closePopupforCustUpdate();
    //this.ref.close();
  }

}
