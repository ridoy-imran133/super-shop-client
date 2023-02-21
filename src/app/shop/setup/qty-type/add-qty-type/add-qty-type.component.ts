import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QtyTypeModel } from '../../../../shared/models/shop/QtyTypeModel';
import { CommonApiConnectService } from '../../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { QtyTypeComponent } from '../qty-type.component';

@Component({
  selector: 'ngx-add-qty-type',
  templateUrl: './add-qty-type.component.html',
  styleUrls: ['./add-qty-type.component.scss']
})
export class AddQtyTypeComponent implements OnInit {
  @Input() _qtytypeFromOther: QtyTypeModel;
  @Input() textfromother: string;
  @Input() textval: string;
  public masterForm: FormGroup;
  submitted= false;
  public qtytype : QtyTypeModel;
  status: boolean;
  constructor(private formBuilder: FormBuilder, private qtytypecomponent: QtyTypeComponent,
              private _CommonService: CommonApiConnectService, private _influxToastaService: InfluxToastaService) { 
    this.qtytype = new QtyTypeModel();
  }

  ngOnInit(): void {
    this.fromCreate();
  }

  ngOnChanges() {
    if(this.textfromother == 'block'){
      this.qtytype = this._qtytypeFromOther;
      this.textfromother = 'none';
    }
    //this.qtytype = this._qtytypeFromOther;
    // this.gift = this._giftFromOther;
    // this.submitted = false;
    // this.status = this.gift.status == 'Y' ? true : false;
    // this.getAllBirthdayVendor();
  }
  
  fromCreate() {
    this.masterForm = this.formBuilder.group({
      qtytype_code: ['', []],
      qtytype_name: ['', [Validators.required]],
      status: ['', []],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  dismissfornone(){
    this.submitted = false;
    this.qtytypecomponent.closePopupfornone();
  }

  dismiss(pQtyType: QtyTypeModel, addedit: string){
    this.submitted = false;
    this.qtytype = new QtyTypeModel();
    this.qtytypecomponent.closePopup(pQtyType, addedit);
  }

  onSaveQtyType(){
    this.submitted = true;
    if (this.masterForm.invalid) {
    return;
    }
    this._CommonService.commonPost('QtyType/save', this.qtytype)
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
