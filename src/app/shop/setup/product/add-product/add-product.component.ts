import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileModel } from '../../../../shared/models/common/FileModel';
import { UploadFileModel } from '../../../../shared/models/common/UploadFileModel';
import { BrandModel } from '../../../../shared/models/shop/BrandModel';
import { CategoryModel } from '../../../../shared/models/shop/CategoryModel';
import { OutletModel } from '../../../../shared/models/shop/OutletModel';
import { ProductModel } from '../../../../shared/models/shop/ProductModel';
import { QtyTypeModel } from '../../../../shared/models/shop/QtyTypeModel';
import { SubCategoryModel } from '../../../../shared/models/shop/SubCategoryModel';
import { CommonApiConnectService } from '../../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { ProductComponent } from '../product.component';

@Component({
  selector: 'ngx-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input() _productFromOther: ProductModel;
  @Input() textfromother: string;
  @Input() textval: string;
  public masterForm: FormGroup;
  submitted= false;
  public product : ProductModel;
  status: boolean;

  public categories: CategoryModel[];
  public subcategories: SubCategoryModel[];
  public brands: BrandModel[];
  public outlets: OutletModel[];
  public qtytypes: QtyTypeModel[];

  
  public nidFrontSideURL: any[];
  public another: any;
  public files: FileModel[];
  public file: FileModel;
  _uploadFiles: UploadFileModel[];
  _uploadFile: UploadFileModel;

  constructor(private formBuilder: FormBuilder, private productcomponent: ProductComponent,
              private _CommonService: CommonApiConnectService, private _influxToastaService: InfluxToastaService) { 
    this.product = new ProductModel();
    this.nidFrontSideURL=[];
    this._uploadFiles=[];
    this.file = new FileModel();
    this.files = [];
  }

  ngOnInit(): void {
    this.fromCreate();
  }

  ngOnChanges() {
    if(this.textfromother == 'block'){
      this.getAllCategory();
      this.getAllSubCategory();
      this.getAllBrand();
      this.getAllOutlet();
      this.getAllQtyType();
      this.product = this._productFromOther;
      this.textfromother = 'none';
    }
  }
  
  fromCreate() {
    this.masterForm = this.formBuilder.group({
      product_code: ['', []],
      cat_code: ['', []],
      subcat_code: ['', []],
      qtytype_code: ['', []],
      outlet_code: ['', []],
      brand_code: ['', []],
      product_name: ['', [Validators.required]],
      status: ['', []],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  dismissfornone(){
    this.submitted = false;
    this.productcomponent.closePopupfornone();
  }

  dismiss(pProduct: ProductModel, addedit: string){
    this.submitted = false;
    this.product = new ProductModel();
    this.productcomponent.closePopup(pProduct, addedit);
  }

  onSaveProduct(){
    this.submitted = true;
    if (this.masterForm.invalid) {
    return;
    }
    const businessdata= {
        ProductInfo: this.product,
        UploadFile: this._uploadFiles      
    }
    this._CommonService.commonPost('Product/save', businessdata)
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

  getAllSubCategory() {
    this._CommonService.commonGet('SubCategory/GetAllSubCategory')
      .subscribe(
        response => {
          this.subcategories = JSON.parse(JSON.stringify(response)).subcategories;
        },
        error => {
        },
        () => {
        },
      );
  }

  getAllBrand() {
    this._CommonService.commonGet('Brand/getAllBrand')
      .subscribe(
        response => {
          this.brands = JSON.parse(JSON.stringify(response)).brands;
        },
        error => {
        },
        () => {
        },
      );
  }

  getAllOutlet() {
    this._CommonService.commonGet('Outlet/getAllOutlet')
      .subscribe(
        response => {
          this.outlets = JSON.parse(JSON.stringify(response)).outlets;
        },
        error => {
        },
        () => {
        },
      );
  }

  getAllQtyType() {
    this._CommonService.commonGet('QtyType/getAllQtyType')
      .subscribe(
        response => {
          this.qtytypes = JSON.parse(JSON.stringify(response)).qtytypes;
        },
        error => {
        },
        () => {
        },
      );
  }



  public onFileChange(event) {

    //this._uploadFiles = [];

    // Any file(s) selected from the input?
    if (event.target.files && event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        let file = event.target.files[index];

        // Don't allow file sizes over 1MB
        if (file.size < 20 * 1048576) {

          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => {
            //this.another = reader.result; 
            // file.filebyte = reader.result;
            // file.index = index;
            // this.files.push(file);
            // debugger
            // this.nidFrontSideURL.push(this.another);
            //this._selectedFileName = file.name;
            this._uploadFile = new UploadFileModel();
            this._uploadFile.FileName = file.name;
            this._uploadFile.FileType = file.type;
            this._uploadFile.FileSize = file.size;
            this._uploadFile.FileByte = (reader.result as string).split(",").pop();
            this._uploadFile.ShowFile = reader.result;
            this._uploadFiles.push(this._uploadFile);
          };

          reader.onerror = function (error) {
          };

        }
        else {
          this._influxToastaService.showToast('danger', 'Response', "File: " + file.name + " is too large to upload.");
        }
      }

    }
  }

  deletefile(item){
    // //delete this.files[item.index];
    // this._uploadFiles.splice(item, 1);
    // debugger;
    // //alert()

    this._uploadFiles.forEach((value,index)=>{
      debugger;
      if(value==item) this._uploadFiles.splice(index,1);
  });
  }

  // goBack() {
  //   this.location.back();
  // }

}
