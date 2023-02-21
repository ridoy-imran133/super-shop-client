import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from '../../../../shared/models/shop/CategoryModel';
import { CommonApiConnectService } from '../../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { CategoryComponent } from '../category.component';

@Component({
  selector: 'ngx-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnChanges {
  @Input() _categoryFromOther: CategoryModel;
  @Input() textfromgift: string;
  @Input() textval: string;
  public masterForm: FormGroup;
  submitted= false;
  public category : CategoryModel;
  status: boolean;
  constructor(private formBuilder: FormBuilder, private categorycomponent: CategoryComponent,
              private _CommonService: CommonApiConnectService, private _influxToastaService: InfluxToastaService) { 
    this.category = new CategoryModel();
  }

  ngOnInit(): void {
    this.fromCreate();
  }

  ngOnChanges() {
    if(this.textfromgift == 'block'){
      this.category = this._categoryFromOther;
      this.textfromgift = 'none';
    }
    //this.category = this._categoryFromOther;
    // this.gift = this._giftFromOther;
    // this.submitted = false;
    // this.status = this.gift.status == 'Y' ? true : false;
    // this.getAllBirthdayVendor();
  }
  
  fromCreate() {
    this.masterForm = this.formBuilder.group({
      cat_code: ['', []],
      cat_name: ['', [Validators.required]],
      status: ['', []],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  dismissfornone(){
    this.submitted = false;
    this.categorycomponent.closePopupfornone();
  }

  dismiss(pCategory: CategoryModel, addedit: string){
    this.submitted = false;
    this.category = new CategoryModel();
    this.categorycomponent.closePopup(pCategory, addedit);
  }

  onSaveCategory(){
    this.submitted = true;
    if (this.masterForm.invalid) {
    return;
    }
    this._CommonService.commonPost('Category/save', this.category)
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
