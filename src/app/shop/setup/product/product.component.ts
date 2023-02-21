import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductModel } from '../../../shared/models/shop/ProductModel';
import { CommonApiConnectService } from '../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { PermitedMenuService } from '../../../shared/_services/permited-menu.service';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products: ProductModel[];
  source: LocalDataSource = new LocalDataSource();
  private customArray: any =[];
  public productpass : ProductModel;

  public addedit: string = "Add";
  constructor(public _commonService: CommonApiConnectService, private _permitedMenuService: PermitedMenuService,
     private _influxToastaService: InfluxToastaService) { 
    this.productpass = new ProductModel();
    
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.loadMenuPermission();
  }

  settings = {
    
    actions: {
      add: false,
      edit: false,
      delete: false,      
      custom: this.customArray,
      position: 'right',
    },

    columns: {
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.source.getPaging();
          const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

          return ret;
        },
      },
      CatCode: {
        title: 'Category',
        type: 'string',
      },
      SubCatCode: {
        title: 'Sub Category',
        type: 'string',
      },
      
      ProductCode: {
        title: 'Product Code',
        type: 'string',
      },  
      
      ProductName: {
        title: 'Product Name',
        type: 'string',
      },  
      
      BrandCode: {
        title: 'Brand',
        type: 'string',
      },  
      
      QtyTypeCode: {
        title: 'Quantity Type',
        type: 'string',
      },  
    },
    mode: 'external',
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
  };

  loadMenuPermission() {
    this.customArray = this._permitedMenuService.setCutomActionMenu();
    this.settings.actions.custom = this.customArray;
    this.settings = Object.assign({}, this.settings);
  }

  getAllProduct() {
    this._commonService.commonGet('Product/getAllProduct')
      .subscribe(
        response => {
          this.source.load([]);
          this.products = JSON.parse(JSON.stringify(response)).products;
          this.source.load(this.products);
        },
        error => {
        },
        () => {
        },
      );
  }

  addProduct(){
    this.productpass = new ProductModel();
    this.addedit = "Add";
    this.openPopup();
  }

  onCustom(event): void {
    if (event.action === 'add') {
      //this.addGenerateRequest(event.data);
    }
    else if (event.action === 'Edit') {
      this.productpass = event.data;
      this.addedit = "Edit";
      this.openPopup();
    }  
    else if (event.action === 'history') {
      //this.customerHistory(event.data);
    }  
    else if (event.action === 'Cancel') {
      this.deletedata(event.data.CatCode);
    } 
  }

deletedata(catid: string){
  this._commonService.commonGet('Product/delete?catcode=' + catid)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response)).response;
        if(val.ResponseCode === '2000'){        
          this.source.remove(val.ResponseData);
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

display = "none";

openPopup() {
  this.display = "block";
}
closePopup(product: ProductModel, addeditval: string) {
  addeditval == "Add" ? this.source.append(product) : this.source.update(this.productpass,product);
  this.display = "none";
}

closePopupfornone() {
  this.display = "none";
}
}
