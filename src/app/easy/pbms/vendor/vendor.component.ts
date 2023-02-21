import { Router } from '@angular/router';
import { Vendor } from '../../models/Vendor';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, EventEmitter, OnChanges, OnInit, Output, ViewChildren } from '@angular/core';
import { UserService } from '../../services/user.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { CommonService } from '../../services/common.service';
import { SessionService } from '../../services/session.service';
import { VasService } from '../../models/VasService';

@Component({
  selector: 'ngx-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit, OnChanges {
  public vendorpass: Vendor;
  public _Vendors: Vendor[];
  public _Vendor: Vendor;
  public _vendor: Vendor;
  public vendor_code;
  vendorfromvendetails: Vendor;
  source: LocalDataSource = new LocalDataSource();  
  public _vasServices: VasService[];

  settings = {
    
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<span class= "retry"><i class="nb-edit"> Edit</i></span>',
        },
        // {
        //   name: 'delete',
        //   title: '<span class= "delete"><i class="nb-trash"> Delete</i></span>',
        // },
      ],
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
      vendor_code: {
        title: 'Code',
        type: 'string',
      },
      vendor_name: {
        title: 'Name',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
      contact_person: {
        title: 'Contact Person',
        type: 'string',
      },
      contact_person_mobile: {
        title: 'Contact Person Mobile',
        type: 'string',
      },
      // email: {
      //   title: 'Email',
      //   type: 'string',
      //   width: '50px',
      // },
      loaction_code: {
        title: 'Location code',
        type: 'string',
      },
      own_vendor: {
        title: 'Own Vendor',
        type: 'string',
      },
      status: {
        title: 'Status',
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

  onSearch(query: string = '') {
    if (query.trim().length > 0){
      this.source.setFilter([
        {
          field: 'vendor_code',
          search: query
        },
        {
          field: 'vendor_name',
          search: query
        },
        {
          field: 'contact_person',
          search: query
        },
        {
          field: 'contact_person_mobile',
          search: query
        },
        {
          field: 'loaction_code',
          search: query
        }
      ], false); 
    }
  }
  constructor(private _UserService: UserService, private router: Router, private _sessionService: SessionService,
    private dialogService: NbDialogService, private _influxToastaService: InfluxToastaService, private _CommonService: CommonService) { 
      this._Vendor= new Vendor();
      this.vendorpass = new Vendor();
      
    }
  ngOnInit(): void {
    this.getAllItTeam();
    this.getAllVasService();
  }
  ngOnChanges(){
    console.log(this.vendorfromvendetails);
  }

  getAllItTeam() {
    this._CommonService.commonGet('ServiceRequest/getAllVendors?puserid =' + this._sessionService.getUser())
      .subscribe(
        response => {
          this.source.load([]);
          this._Vendors = JSON.parse(JSON.stringify(response)).vendor;
          this.source.load(this._Vendors);
        },
        error => {
        },
        () => {
        },
      );
  }

  onCustom(event): void {
  if(event.action === 'edit'){
    this.vendorpass = event.data;
      this.openPopup();
    }
  }
  addVendor(){
    this.vendorpass = new Vendor();
    this.openPopup();
  }

  display = "none";
  
  openPopup() {
    this.display = "block";
  }
  closePopup(vendor: Vendor) {
    this.source.update(this.vendorpass, vendor);
    this.display = "none";
  }

  closePopupfornone() {
    this.display = "none";
  }

  getAllVasService(){
    this._CommonService.commonGet('ServiceRequest/getAllVasService/'+ this._sessionService.getUser() )
    .subscribe(
      response => {
        this._vasServices = JSON.parse(JSON.stringify(response)).vasService;        
        //this.text === "Add" ? '' : this.editVendor();
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }
}
