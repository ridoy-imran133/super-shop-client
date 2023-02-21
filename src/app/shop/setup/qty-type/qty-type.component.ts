import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { QtyTypeModel } from '../../../shared/models/shop/QtyTypeModel';
import { CommonApiConnectService } from '../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { PermitedMenuService } from '../../../shared/_services/permited-menu.service';

@Component({
  selector: 'ngx-qty-type',
  templateUrl: './qty-type.component.html',
  styleUrls: ['./qty-type.component.scss']
})
export class QtyTypeComponent implements OnInit {
  public qtytypes: QtyTypeModel[];
  source: LocalDataSource = new LocalDataSource();
  private customArray: any =[];
  public qtytypepass : QtyTypeModel;

  public addedit: string = "Add";
  constructor(public _commonService: CommonApiConnectService, private _permitedMenuService: PermitedMenuService,
     private _influxToastaService: InfluxToastaService) { 
    this.qtytypepass = new QtyTypeModel();
    
  }

  ngOnInit(): void {
    this.getAllQtyType();
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
      QtyTypeCode: {
        title: 'Qty Type Code',
        type: 'string',
      },
      QtyTypeName: {
        title: 'Qty Type Name',
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

  getAllQtyType() {
    this._commonService.commonGet('QtyType/getAllQtyType')
      .subscribe(
        response => {
          this.source.load([]);
          this.qtytypes = JSON.parse(JSON.stringify(response)).qtytypes;
          this.source.load(this.qtytypes);
        },
        error => {
        },
        () => {
        },
      );
  }

  addQtyType(){
    this.qtytypepass = new QtyTypeModel();
    this.addedit = "Add";
    this.openPopup();
  }

  onCustom(event): void {
    if (event.action === 'add') {
      //this.addGenerateRequest(event.data);
    }
    else if (event.action === 'Edit') {
      this.qtytypepass = event.data;
      this.addedit = "Edit";
      this.openPopup();
    }  
    else if (event.action === 'history') {
      //this.customerHistory(event.data);
    }  
    else if (event.action === 'Cancel') {
      this.deleteqtytype(event.data.QtyTypeCode);
    } 
  }

deleteqtytype(qtid: string){
  this._commonService.commonGet('QtyType/delete?qtytypecode=' + qtid)
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
closePopup(qtytype: QtyTypeModel, addeditval: string) {
  addeditval == "Add" ? this.source.append(qtytype) : this.source.update(this.qtytypepass,qtytype);
  this.display = "none";
}

closePopupfornone() {
  this.display = "none";
}
}
