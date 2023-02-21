import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BrandModel } from '../../../shared/models/shop/BrandModel';
import { CommonApiConnectService } from '../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { PermitedMenuService } from '../../../shared/_services/permited-menu.service';

@Component({
  selector: 'ngx-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  public brands: BrandModel[];
  source: LocalDataSource = new LocalDataSource();
  private customArray: any =[];
  public brandpass : BrandModel;

  public addedit: string = "Add";
  constructor(public _commonService: CommonApiConnectService, private _permitedMenuService: PermitedMenuService,
     private _influxToastaService: InfluxToastaService) { 
    this.brandpass = new BrandModel();    
  }

  ngOnInit(): void {
    this.getAllBrand();
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
      BrandCode: {
        title: 'Brand Code',
        type: 'string',
      },
      BrandName: {
        title: 'Brand Name',
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

  getAllBrand() {
    this._commonService.commonGet('Brand/getAllBrand')
      .subscribe(
        response => {
          this.source.load([]);
          this.brands = JSON.parse(JSON.stringify(response)).brands;
          this.source.load(this.brands);
        },
        error => {
        },
        () => {
        },
      );
  }

  addBrand(){
    this.brandpass = new BrandModel();
    this.addedit = "Add";
    this.openPopup();
  }

  onCustom(event): void {
    if (event.action === 'add') {
      //this.addGenerateRequest(event.data);
    }
    else if (event.action === 'Edit') {
      this.brandpass = event.data;
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

  deletedata(brandcode: string){
    this._commonService.commonGet('Brand/delete?brandcode=' + brandcode)
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
  closePopup(brand: BrandModel, addeditval: string) {
    addeditval == "Add" ? this.source.append(brand) : this.source.update(this.brandpass,brand);
    this.display = "none";
  }

  closePopupfornone() {
    this.display = "none";
  }

}
