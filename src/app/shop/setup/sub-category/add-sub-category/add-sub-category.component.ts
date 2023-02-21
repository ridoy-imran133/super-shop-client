import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from '../../../../shared/models/shop/CategoryModel';
import { SubCategoryModel } from '../../../../shared/models/shop/SubCategoryModel';
import { CommonApiConnectService } from '../../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { SubCategoryComponent } from '../sub-category.component';

@Component({
  selector: 'ngx-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit, OnChanges {
  @Input() _subcategoryFromOther: SubCategoryModel;
  @Input() textfromother: string;
  public masterForm: FormGroup;
  submitted= false;
  public subcategory : SubCategoryModel;
  public categories: CategoryModel[];
  status: boolean;
  constructor(private formBuilder: FormBuilder, private subcategorycomponent: SubCategoryComponent,
              private _CommonService: CommonApiConnectService, private _influxToastaService: InfluxToastaService) { 
    this.subcategory = new SubCategoryModel();
  }

  ngOnInit(): void {
    this.fromCreate();
  }

  ngOnChanges() {
    if(this.textfromother == 'block'){
      this.getAllCategory();
      this.subcategory = this._subcategoryFromOther;
      this.textfromother = 'none';
    }
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      sub_cat_code: ['', []],
      sub_cat_name: ['', [Validators.required]],
      cat_code: ['', [Validators.required]],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  dismissfornone(){
    this.submitted = false;
    this.subcategorycomponent.closePopupfornone();
  }

  dismiss(pSubCategory: SubCategoryModel){
    this.submitted = false;
    this.subcategory = new SubCategoryModel();
    this.subcategorycomponent.closePopup(pSubCategory);
  }

  onSaveCategory(){
    this.submitted = true;
    if (this.masterForm.invalid) {
    return;
    }
    this._CommonService.commonPost('SubCategory/save', this.subcategory)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response)).response;
        if(val.ResponseCode === '2000'){
          this.dismiss(val.ResponseData);
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

  getAllCategory() {
    this._CommonService.commonGet('Category/getAllCategory')
      .subscribe(
        response => {
          this.categories = JSON.parse(JSON.stringify(response)).categories;
        },
        error => {
        },
        () => {
        },
      );
  }

}
