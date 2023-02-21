import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SubCategoryModel } from '../../../shared/models/shop/SubCategoryModel';
import { CommonApiConnectService } from '../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { PermitedMenuService } from '../../../shared/_services/permited-menu.service';

@Component({
  selector: 'ngx-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  public subcategories: SubCategoryModel[];
  source: LocalDataSource = new LocalDataSource();
  private customArray: any =[];
  public subcategorypass : SubCategoryModel;
  constructor(public _commonService: CommonApiConnectService, private _permitedMenuService: PermitedMenuService,
     private _influxToastaService: InfluxToastaService) { 
    this.subcategorypass = new SubCategoryModel();    
  }

  ngOnInit(): void {
    this.getAllSubCategory();
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
        title: 'Category Code',
        type: 'string',
      },
      SubCatCode: {
        title: 'Sub Category Code',
        type: 'string',
      },
      SubCategoryName: {
        title: 'Sub Category Name',
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

  getAllSubCategory() {
    this._commonService.commonGet('SubCategory/GetAllSubCategory')
      .subscribe(
        response => {
          this.source.load([]);
          this.subcategories = JSON.parse(JSON.stringify(response)).subcategories;
          this.source.load(this.subcategories);
        },
        error => {
        },
        () => {
        },
      );
  }

  addSubCategory(){
    this.subcategorypass = new SubCategoryModel();
    this.openPopup();
  }

  onCustom(event): void {
    if (event.action === 'add') {
      //this.addGenerateRequest(event.data);
    }
    else if (event.action === 'Edit') {
      this.subcategorypass = event.data;
      this.openPopup();
    }  
    else if (event.action === 'history') {
      //this.customerHistory(event.data);
    }  
    else if (event.action === 'Cancel') {
      this.deletedata(event.data.CatCode);
    } 
  }

  deletedata(subcatcode: string){
    this._commonService.commonGet('SubCategory/delete?subcatcode=' + subcatcode)
      .subscribe(
        response => {
          var val = JSON.parse(JSON.stringify(response)).response;
          if(val.responseCode === '2000'){        
            this.source.remove(val.responseData);
            this._influxToastaService.showToast('success', 'Response', val.responseMessage);
          }
          else{
            this._influxToastaService.showToast('danger', 'Response', val.responseMessage);
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
  closePopup(subcategory: SubCategoryModel) {
    //this.source.update(this.giftpass, gift);
    this.source.append(subcategory);
    this.display = "none";
  }

  closePopupfornone() {
    this.display = "none";
  }

}
