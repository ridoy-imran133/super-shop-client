import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CategoryModel } from '../../../shared/models/shop/CategoryModel';
import { CommonApiConnectService } from '../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { PermitedMenuService } from '../../../shared/_services/permited-menu.service';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categories: CategoryModel[];
  source: LocalDataSource = new LocalDataSource();
  private customArray: any =[];
  public categorypass : CategoryModel;

  public addedit: string = "Add";
  constructor(public _commonService: CommonApiConnectService, private _permitedMenuService: PermitedMenuService,
     private _influxToastaService: InfluxToastaService) { 
    this.categorypass = new CategoryModel();
    
  }

  ngOnInit(): void {
    this.getAllCategory();
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
      CategoryName: {
        title: 'Category Name',
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

  getAllCategory() {
    this._commonService.commonGet('Category/getAllCategory')
      .subscribe(
        response => {
          this.source.load([]);
          this.categories = JSON.parse(JSON.stringify(response)).categories;
          this.source.load(this.categories);
        },
        error => {
        },
        () => {
        },
      );
  }

  addCategory(){
    this.categorypass = new CategoryModel();
    this.addedit = "Add";
    this.openPopup();
  }

  onCustom(event): void {
    if (event.action === 'add') {
      //this.addGenerateRequest(event.data);
    }
    else if (event.action === 'Edit') {
      this.categorypass = event.data;
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
  this._commonService.commonGet('Category/delete?catcode=' + catid)
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
closePopup(category: CategoryModel, addeditval: string) {
  addeditval == "Add" ? this.source.append(category) : this.source.update(this.categorypass,category);
  this.display = "none";
}

closePopupfornone() {
  this.display = "none";
}
}
