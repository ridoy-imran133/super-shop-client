import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandModel } from '../../../../shared/models/shop/BrandModel';
import { CommonApiConnectService } from '../../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { BrandComponent } from '../brand.component';

@Component({
  selector: 'ngx-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit, OnChanges {
  @Input() _brandFromOther: BrandModel;
  @Input() textfromother: string;
  @Input() textval: string;
  public masterForm: FormGroup;
  submitted= false;
  public brand : BrandModel;
  status: boolean;
  constructor(private formBuilder: FormBuilder, private brandcomponent: BrandComponent,
              private _CommonService: CommonApiConnectService, private _influxToastaService: InfluxToastaService) { 
    this.brand = new BrandModel();
  }

  ngOnInit(): void {
    this.fromCreate();
  }

  ngOnChanges() {
    if(this.textfromother == 'block'){
      this.brand = this._brandFromOther;
      this.textfromother = 'none';
    }
    //this.category = this._categoryFromOther;
    // this.gift = this._giftFromOther;
    // this.submitted = false;
    // this.status = this.gift.status == 'Y' ? true : false;
    // this.getAllBirthdayVendor();
  }
  
  fromCreate() {
    this.masterForm = this.formBuilder.group({
      brand_code: ['', []],
      brand_name: ['', [Validators.required]],
      status: ['', []],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  dismissfornone(){
    this.submitted = false;
    this.brandcomponent.closePopupfornone();
  }

  dismiss(pBrand: BrandModel, addedit: string){
    this.submitted = false;
    this.brand = new BrandModel();
    this.brandcomponent.closePopup(pBrand, addedit);
  }

  onSaveBrand(){
    this.submitted = true;
    if (this.masterForm.invalid) {
    return;
    }
    this._CommonService.commonPost('Brand/save', this.brand)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response)).response;
        if(val.ResponseCode === '2000'){
          this.dismiss(val.ResponseData, this.textval);
          this._influxToastaService.showToast('success', 'Response', val.ResponseMessage);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', val.ResponseMessage);
        }
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );
  }
}
