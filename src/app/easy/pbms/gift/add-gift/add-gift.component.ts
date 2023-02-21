import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { Gift } from '../../../models/Gift';
import { Vendor } from '../../../models/Vendor';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { GiftComponent } from '../gift.component';

@Component({
  selector: 'ngx-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.scss']
})
export class AddGiftComponent implements OnInit, OnChanges {
  @Input() _giftFromOther: Gift;
  @Input() textfromgift: string;
  public gift: Gift;
  public _vendors: Vendor[];
  public masterForm: FormGroup;
  submitted= false;
  status = false;
  constructor(private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService, private _CommonService: CommonService,
    private giftcomponent: GiftComponent, private _sessionService: SessionService) { }

  ngOnInit(): void {
    this.fromCreate();
    this.getAllBirthdayVendor();
  }

  ngOnChanges() {
    this.gift = this._giftFromOther;
    this.submitted = false;
    this.status = this.gift.status == 'Y' ? true : false;
    this.getAllBirthdayVendor();
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      gift_code: ['', [Validators.required, Validators.maxLength(3)]],
      gift_name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      vendor_code: ['', [Validators.required]],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  dismiss(){
    this.submitted = false;
    var passreq = this.gift;
    this.gift = new Gift();
    this.giftcomponent.closePopup(passreq);
  }

  dismissfornone(){
    this.submitted = false;
    this.gift = new Gift();
    this.giftcomponent.closePopupfornone();
  }

  onSaveGift(){
    this.submitted = true;
    if (this.masterForm.invalid) {
    return;
    }
    this.gift.status = this.status == true ? "Y" : "N"
    if(this.gift.vendor_code != null){
      this._vendors.forEach(x =>{
        if(x.vendor_code == this.gift.vendor_code){
          this.gift.vendor_name = x.vendor_name;
        }
      })
    }
    this._CommonService.commonPost('ServiceRequest/saveGift/' + this._sessionService.getUser(), this.gift)
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

  getAllBirthdayVendor() {
    this._CommonService.commonGet('ServiceRequest/getAllVendors?puserid=' + this._sessionService.getUser() + "&&vascode=" + this._sessionService.getBirthday())
      .subscribe(
        response => {
          this._vendors = JSON.parse(JSON.stringify(response)).vendor;
        },
        error => {
        },
        () => {
        },
      );
  }

}
