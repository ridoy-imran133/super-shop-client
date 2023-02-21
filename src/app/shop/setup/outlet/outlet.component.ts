import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { OutletModel } from '../../../shared/models/shop/OutletModel';
import { CommonApiConnectService } from '../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { PermitedMenuService } from '../../../shared/_services/permited-menu.service';

@Component({
  selector: 'ngx-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit {
  public outlets: OutletModel[];
  source: LocalDataSource = new LocalDataSource();
  private customArray: any =[];
  public outletpass : OutletModel;

  public addedit: string = "Add";
  constructor(public _commonService: CommonApiConnectService, private _permitedMenuService: PermitedMenuService,
     private _influxToastaService: InfluxToastaService) { 
    this.outletpass = new OutletModel();
    
  }

  ngOnInit(): void {
    this.getAllOutlet();
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
      OutletName: {
        title: 'Outlet Name',
        type: 'string',
      },
      Mobile: {
        title: 'Mobile',
        type: 'string',
      }, 
      Address: {
        title: 'Address',
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

  getAllOutlet() {
    this._commonService.commonGet('Outlet/getAllOutlet')
      .subscribe(
        response => {
          this.source.load([]);
          this.outlets = JSON.parse(JSON.stringify(response)).outlets;
          this.source.load(this.outlets);
        },
        error => {
        },
        () => {
        },
      );
  }

  addOutlet(){
    this.outletpass = new OutletModel();
    this.addedit = "Add";
    this.openPopup();
  }

  onCustom(event): void {
    if (event.action === 'add') {
      //this.addGenerateRequest(event.data);
    }
    else if (event.action === 'Edit') {
      this.outletpass = event.data;
      this.addedit = "Edit";
      this.openPopup();
    }  
    else if (event.action === 'history') {
      //this.customerHistory(event.data);
    }  
    else if (event.action === 'Cancel') {
      this.deletedata(event.data.OutletCode);
    } 
  }

  deletedata(outletid: string){
    this._commonService.commonGet('Outlet/delete?outletcode=' + outletid)
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
  closePopup(outlet: OutletModel, addeditval: string) {
    addeditval == "Add" ? this.source.append(outlet) : this.source.update(this.outletpass, outlet);
    this.display = "none";
  }

  closePopupfornone() {
    this.display = "none";
  }
}
