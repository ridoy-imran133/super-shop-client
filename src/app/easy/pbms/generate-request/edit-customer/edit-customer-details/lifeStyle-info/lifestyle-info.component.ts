import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../../../shared/_services/influx.toast.service';
import { CustomerUBS } from '../../../../../models/CustomerUBS';
import { LifeStyleInfo } from '../../../../../models/LifeStyleInfo';
import { CommonService } from '../../../../../services/common.service';
import { SessionService } from '../../../../../services/session.service';

@Component({
  selector: 'ngx-lifestyle-info',
  templateUrl: './lifestyle-info.component.html',
  styleUrls: ['./lifestyle-info.component.scss']
})
export class LifeStyleInfoComponent implements OnInit {
  @Input() _customerInfo: CustomerUBS;
  public lifestyleInfoForm: FormGroup;
  public lifeStyleInfo: LifeStyleInfo;
  submitted: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private _CommonService: CommonService,
    private _sessionService: SessionService,
    private _influxToastaService: InfluxToastaService,
    protected ref: NbDialogRef<LifeStyleInfoComponent>
  ) { }

  ngOnInit(): void {
    // alert(this._customerInfo.customer_name);
    this.fromCreate(null);
    this.lifeStyleInfo = new LifeStyleInfo();
    this.getBankinfoDetails();
  }

  get fval() {
    return this.lifestyleInfoForm.controls;
  }

  fromCreate(formData : LifeStyleInfo) {
    formData = formData ? formData : new LifeStyleInfo();
    this.lifestyleInfoForm = this.formBuilder.group({
      travel_mode_code           : [formData.travel_mode_code, [Validators.required]],
      airline_name               : [formData.airline_name, [Validators.required]],
      cust_no                    : [formData.cust_no ? formData.cust_no : this._customerInfo.cust_no , [Validators.required]],
      local_holiday_place        : [formData.local_holiday_place, [Validators.required]],
      foreign_holiday_place      : [formData.local_holiday_place, [Validators.required]],
      local_hotel                : [formData.local_hotel, [Validators.required]],
      foreign_hotel              : [formData.foreign_hotel, [Validators.required]],
      wishing_vacation_place     : [formData.wishing_vacation_place, [Validators.required]],
      child_fav_place            : [formData.child_fav_place, [Validators.required]],
      local_shopping_place       : [formData.local_shopping_place, [Validators.required]],
      foreign_shopping_place     : [formData.foreign_shopping_place, [Validators.required]],
      jewelry_shop               : [formData.jewelry_shop, [Validators.required]],
      perfume                    : [formData.perfume, [Validators.required]],
      privilege_store_name       : [formData.privilege_store_name, [Validators.required]],
      favorite_cosine            : [formData.favorite_cosine, [Validators.required]],
      favorite_dessert           : [formData.favorite_dessert, [Validators.required]],
      favorite_drink             : [formData.favorite_drink, [Validators.required]],
      favorite_fruit             : [formData.favorite_fruit, [Validators.required]],
      local_restaurant           : [formData.local_restaurant, [Validators.required]],
      foreign_restaurant         : [formData.foreign_restaurant, [Validators.required]],
      song_type_ben              : [formData.song_type_ben, [Validators.required]],
      song_type_nonben           : [formData.song_type_nonben, [Validators.required]],
      singer_ben                 : [formData.singer_ben, [Validators.required]],
      singer_nonben              : [formData.singer_nonben, [Validators.required]],
      movie_genre_ben            : [formData.movie_genre_ben, [Validators.required]],
      movie_genre_nonben         : [formData.movie_genre_nonben, [Validators.required]],
      actor_ben                  : [formData.actor_ben, [Validators.required]],
      actor_nonben               : [formData.actor_nonben, [Validators.required]],
      movie_ben                  : [formData.movie_ben, [Validators.required]],
      movie_eng                  : [formData.movie_eng, [Validators.required]],
      movie_others               : [formData.movie_others, [Validators.required]],
      writer_ben                 : [formData.writer_ben, [Validators.required]],
      writer_nonben              : [formData.writer_nonben, [Validators.required]],
      fav_radio_channel          : [formData.fav_radio_channel, [Validators.required]],
      fav_tv_channel             : [formData.fav_tv_channel, [Validators.required]],
      fav_painter                : [formData.fav_painter, [Validators.required]],
      preferable_magazine        : [formData.preferable_magazine, [Validators.required]],
      fav_mobile_brand           : [formData.fav_mobile_brand, [Validators.required]],
      fav_accessories            : [formData.fav_accessories, [Validators.required]],
      fav_purfume                : [formData.fav_purfume, [Validators.required]],
      fav_car_brand              : [formData.fav_car_brand, [Validators.required]],
      fav_grocery_storebd        : [formData.fav_grocery_storebd, [Validators.required]],
      fav_toiletries_brand       : [formData.fav_toiletries_brand, [Validators.required]],
      fav_spa                    : [formData.fav_spa, [Validators.required]],
      child_birthday_arng_type   : [formData.child_birthday_arng_type, [Validators.required]],
      birthday_gift_code         : [formData.birthday_gift_code, [Validators.required]],
      birthday_gift_details      : [formData.birthday_gift_details, [Validators.required]],
      aniversary_gift_code       : [formData.aniversary_gift_code, [Validators.required]],
      aniversary_gift_details    : [formData.aniversary_gift_details, [Validators.required]],
      health_club_member         : [formData.health_club_member, [Validators.required]],
      social_club_member         : [formData.social_club_member, [Validators.required]],
      local_hospital             : [formData.local_hospital, [Validators.required]],
      foreign_hospital           : [formData.foreign_hospital, [Validators.required]],
      car_servicing_center       : [formData.car_servicing_center, [Validators.required]],
      games_watching             : [formData.games_watching, [Validators.required]],
      fav_football_team          : [formData.fav_football_team, [Validators.required]],
      fav_cricket_team           : [formData.fav_cricket_team, [Validators.required]],
      fav_others_team            : [formData.fav_others_team, [Validators.required]],
      fav_sports_person          : [formData.fav_sports_person, [Validators.required]],
      hobby                      : [formData.hobby, [Validators.required]],
      fav_color                  : [formData.fav_color, [Validators.required]],
      fav_dress                  : [formData.fav_dress, [Validators.required]],
      passionate_social_culture  : [formData.passionate_social_culture, [Validators.required]],
      associate_charity_org      : [formData.associate_charity_org, [Validators.required]],
      taken_other_bank_serv      : [formData.taken_other_bank_serv, [Validators.required]],
      social_event_expect_ebl    : [formData.social_event_expect_ebl, [Validators.required]],
      fav_others_bank            : [formData.fav_others_bank, [Validators.required]],
      fav_ebl_service            : [formData.fav_ebl_service, [Validators.required]],
      bank_serv_intro_ebl        : [formData.bank_serv_intro_ebl, [Validators.required]],
      ebl_serv_improve_name      : [formData.ebl_serv_improve_name, [Validators.required]],
      personal_status            : [formData.personal_status == "Y" ? true : false, [Validators.required]],
    });
  }


  onSaveLifeStyleInfo(){
    this.submitted = true;
    const lifeStyleInfo: LifeStyleInfo = this.lifestyleInfoForm.value;
    lifeStyleInfo.personal_status = this.lifestyleInfoForm.controls.personal_status.value == true ? "Y": "N";
    // if (this.lifeStyleInfoForm.invalid) {
    //   return;
    //   }
      this._CommonService.commonPost('ServiceRequest/setCustPersonalInfo/'+ this._sessionService.getUser() ,  lifeStyleInfo)
      
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
    this._CommonService.commonGet('ServiceRequest/getCustomerPersonalInfo/?cust_no='+ this._customerInfo.cust_no + "&&userid=" +this._sessionService.getUser())  
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        //this.bankingInfo = JSON.parse(val);
        this.fromCreate(val.customerPersonalInfo[0]);
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
