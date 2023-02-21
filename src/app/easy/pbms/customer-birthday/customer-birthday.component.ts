import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { Area } from '../../models/Area';
import { Branch } from '../../models/Branch';
import { CustomerUBS } from '../../models/CustomerUBS';
import { Gift } from '../../models/Gift';
import { GiftVendor } from '../../models/GiftVendor';
import { SearchModel } from '../../models/SearchModel';
import { Vendor } from '../../models/Vendor';
import { CommonService } from '../../services/common.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'ngx-customer-birthday',
  templateUrl: './customer-birthday.component.html',
  styleUrls: ['./customer-birthday.component.scss']
})
export class CustomerBirthdayComponent implements OnInit {
  isshowareabranch: boolean = false;
  isareacode = true;
  submitted = true;
  searcharrow = true;
  customerlistshow = false;
  public masterForm: FormGroup;
  public birthdaygiftvendorform: FormGroup;
  _searchModel: SearchModel;
  
  public _branch : Branch[];
  public _areas : Area[];
  public _showbranch: Array<Branch> = [];
  roleid: string = this._sessionService.getRole();
  branchcode: string = this._sessionService.getBranch();

  public _customerecommendation: CustomerUBS[];
  sourcecustomerecommendation: LocalDataSource = new LocalDataSource();
  _recomcount: number = 0;

  public _customenorecommendation: CustomerUBS[];
  sourcecustomenorecommendation: LocalDataSource = new LocalDataSource();
  _norecomcount: number = 0;

  iscustlistshow: boolean = false;

  _vendors: Vendor[];
  _gifts: Gift[];
  _giftvendors: GiftVendor[];
  public _showVendor: Array<Vendor> = [];
  vendor : string;
  gift_type : string;

  isLoader: boolean = true;

  nodata: boolean = false;

  public selectedrows: Array<CustomerUBS> = [];
  public customerforaddrequest: CustomerUBS;

  constructor(private _CommonService: CommonService, private formBuilder: FormBuilder, private _sessionService: SessionService,
    private _influxToastaService: InfluxToastaService) {
    this._searchModel = new SearchModel();
    }

  ngOnInit(): void {    
    this.fromCreate();
    this.fromCreateforvendorselect();
    if(this.roleid != "R001"){
      this.isareacode = false;
    }
    this.getAllBranch();
    this.getAllAreas();
  }

  searchCustomer(){
    this.submitted = false;
    this.iscustlistshow = true;
    this.getAllCustomersforRecom();
    this.getAllCustomersforNoRecom();
    this.getAllGiftVendor();
    this.getAllGifts();
    this.getAllVendors();
    this.searcharrowfunc();
    this.searchcustlistfunc();
  }

  settingscustomerecommendation = {

    actions: {
      columnTitle: 'Service',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'add',
          title: '<span class= "edit">Add Request</span>',
        },
        // {
        //   name: 'delete',
        //   title: '<span class= "delete"><i class="nb-trash"> Delete</i></span>',
        // },   {name: 'add',title: '<span class= "edit">Add Request</span>',}
      ],
      position: 'right',
    },

    columns: {
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.sourcecustomerecommendation.getPaging();
          const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

          return ret;
        },
      },
      cust_no: {
        title: 'Customer No',
        type: 'string',
        show: false
      },
      customer_name: {
        title: 'Customer Name',
        type: 'string',
        width: '250px'
      },
      branch_name: {
        title: 'Branch',
        type: 'string',
        valuePrepareFunction: (branch_name) => {
          var val = branch_name.split(" Branch");
          return val[0];
        }
      },
      mobile_number: {
        title: 'Mobile Number',
        type: 'string',
      },
      birth_date: {
        title: 'Birth Date',
        valuePrepareFunction: (date_of_birth) => {
          return new DatePipe('en-EN').transform(new Date(date_of_birth), 'dd/MM/yyyy');
        }
      },
      address: {
        title: 'Address',
        type: 'string',
      },
      total_balance: {
        title: 'Total Balance',
        type: "html",
        valuePrepareFunction: (total_balance) => { return '<p class="cell_right">' + total_balance + '</p>'; },
      },
    },
    selectMode: "single",
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 5,
    },
  };

  settingscustomenorecommendation = {

    actions: {
      columnTitle: 'Service',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },

    columns: {
      // index: {
      //   title: 'SL',
      //   type: 'text',
      //   valuePrepareFunction: (val, row, cell) => {
      //     const pager = this.sourcecustomenorecommendation.getPaging();
      //     const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

      //     return ret;
      //   },
      // },
      cust_no: {
        title: 'Customer No',
        type: 'string',
        show: false
      },
      customer_name: {
        title: 'Customer Name',
        type: 'string',
        width: '250px'
      },
      branch_name: {
        title: 'Branch',
        type: 'string',
        valuePrepareFunction: (branch_name) => {
          var val = branch_name.split(" Branch");
          return val[0];
        }
      },
      mobile_number: {
        title: 'Mobile Number',
        type: 'string',
      },
      birth_date: {
        title: 'Birth Date',
        valuePrepareFunction: (date_of_birth) => {
          return new DatePipe('en-EN').transform(new Date(date_of_birth), 'dd/MM/yyyy');
        }
      },
      address: {
        title: 'Address',
        type: 'string',
      },
      total_balance: {
        title: 'Total Balance',
        type: "html",
        valuePrepareFunction: (total_balance) => { return '<p class="cell_right">' + total_balance + '</p>'; },
      },
    },
    selectMode: "multi",
    hideSubHeader: true,
    pager: {
      display: false,
      perPage: 1000,
    },
  };

  getAllAreas(){
    this._CommonService.commonGet('ServiceRequest/getAllArea?userid='+ this._sessionService.getUser())
    .subscribe(
      response => {
        this._areas = JSON.parse(JSON.stringify(response)).area;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }
  getAllBranch(){
    this._CommonService.commonGet('ServiceRequest/getAllBranch?userid='+this._sessionService.getUser())
    .subscribe(
      response => {
        this._branch = JSON.parse(JSON.stringify(response)).branches;
        if(this.roleid === this._sessionService.getRM()){
          this._branch.forEach(x => {
            if(x.branch_code === this.branchcode){
              this._showbranch.push(x);
            }
          });
        }
        else{
        }
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  areawisebranch(areacode: string){    
    //this.source.load([]);
    //this.iscustomersshow = false;
    if(areacode == "" || areacode == null){
      this._searchModel.branch_code = null;
      this._showbranch = this._branch;
    }
    else{
      this._searchModel.branch_code = null;
      this._showbranch = [];
      this._branch.forEach(x => {
        if(x.area_code === areacode){
          this._showbranch.push(x);
        }
      });
    }
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      branch_code: ['', []],
      area_code: ['', []],
      month: ['', []],
      year: ['', []],
    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  fromCreateforvendorselect() {
    this.birthdaygiftvendorform = this.formBuilder.group({
      gift_type: ['', [Validators.required]],
      vendor: ['', [Validators.required]],
    });
  }

  get fvalforbirthday() {
    return this.birthdaygiftvendorform.controls;
  }

  toggle() {
    this._searchModel.area_code = null;
    this._searchModel.branch_code = null;
    //this.source.load([]);
    if(this.roleid == "R002"){
      this.isareacode = false;
      this._showbranch = [];
      this._branch.forEach(x => {
        if(x.branch_code === this.branchcode){
          this._showbranch.push(x);
        }
      });
    }
    else if(this.branchcode != "999"){
      this.isareacode = false;
      this._showbranch = [];
      this._branch.forEach(x => {
        if(x.branch_code === this.branchcode){
          this._showbranch.push(x);
        }
      });
    }
    else{
      this.isareacode = true;
      this._showbranch = [];
    }
  }

  getAllCustomersforRecom(){
    this._searchModel.area_code = this._searchModel.area_code === undefined ? "" : this._searchModel.area_code;
    this._searchModel.branch_code = this._searchModel.branch_code === undefined ? "" : this._searchModel.branch_code;
    this._searchModel.month = this._searchModel.month === undefined ? "" : this._searchModel.month;
    this._searchModel.year = this._searchModel.year === undefined ? "" : this._searchModel.year;
    if(this._sessionService.getRole() != 'R001'){
      this._searchModel.branch_code = this._sessionService.getBranch();
    }
    this._CommonService.commonGet('ServiceRequest/getAllCustomers?userId=' + sessionStorage.getItem("userId") + "&&roleId=" + sessionStorage.getItem("RoleId") + "&&areacode=" + this._searchModel.area_code + "&&branchCode=" + this._searchModel.branch_code+ "&&custno=" + "&&birthmonth=" + this._searchModel.month+ "&&birthrecom=" + "Y"+ "&&isbirth=" + true)
      .subscribe(
        response => {
          this.sourcecustomerecommendation.load([]);
          this._customerecommendation = JSON.parse(JSON.stringify(response)).customerInformation;
          this.sourcecustomerecommendation.load(this._customerecommendation);
          this._recomcount = this._customerecommendation.length;
          this.isLoader = false;
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  getAllCustomersforNoRecom(){
    this._searchModel.area_code = this._searchModel.area_code === undefined ? "" : this._searchModel.area_code;
    this._searchModel.branch_code = this._searchModel.branch_code === undefined ? "" : this._searchModel.branch_code;
    this._searchModel.month = this._searchModel.month === undefined ? "" : this._searchModel.month;
    this._searchModel.year = this._searchModel.year === undefined ? "" : this._searchModel.year;
    if(this._sessionService.getRole() != 'R001'){
      this._searchModel.branch_code = this._sessionService.getBranch();
    }
    this._CommonService.commonGet('ServiceRequest/getAllCustomers?userId=' + sessionStorage.getItem("userId") + "&&roleId=" + sessionStorage.getItem("RoleId") + "&&areacode=" + this._searchModel.area_code + "&&branchCode=" + this._searchModel.branch_code+ "&&custno=" + ""+ "&&birthmonth=" + this._searchModel.month+ "&&birthrecom=" + "N"+ "&&isbirth=" + true)
      .subscribe(
        response => {
          this.sourcecustomenorecommendation.load([]);
          this._customenorecommendation = JSON.parse(JSON.stringify(response)).customerInformation;
          this.sourcecustomenorecommendation.load(this._customenorecommendation);
          this._norecomcount = this._customenorecommendation.length;
          this.nodata = true;
          this.isLoader = false;
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  getAllGifts(){
    this._CommonService.commonGet('ServiceRequest/getAllGifts?userid=' + this._sessionService.getUser())
    .subscribe(
      response => {
        this._gifts = JSON.parse(JSON.stringify(response)).gifts;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }
  
  getAllGiftVendor(){
    this._CommonService.commonGet('ServiceRequest/getAllGiftVendor?userid=' + this._sessionService.getUser())
    .subscribe(
      response => {
        this._giftvendors = JSON.parse(JSON.stringify(response)).giftvendors;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }
  
  changeVendor(gift: string){
    this._showVendor=[]
    this.vendor = "";
    this._giftvendors.forEach(x =>{
      if(x.gift_code == gift){
        this._vendors.forEach(y => {
          if(y.vendor_code == x.vendor_code){
            this._showVendor.push(y);
          }
        })
      }
    })
  }

  getAllVendors(){
    this._CommonService.commonGet('ServiceRequest/getAllVendors?puserid=' + this._sessionService.getUser() + '&&vascode=' + this._sessionService.getBirthday())
    .subscribe(
      response => {
        this._vendors = JSON.parse(JSON.stringify(response)).vendor;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  onSaveBirthday(){
    this.submitted = true;
    if (this.birthdaygiftvendorform.invalid) {
      return;
    }
    if(this.selectedrows.length == 0){
      this._influxToastaService.showToast('danger', 'Response', "Select at least one customer");
      return;
    }
    this._CommonService.commonPost('ServiceRequest/saveMultiServiceRequest/'+ this.gift_type + '/' + this.vendor+ '/' +this._sessionService.getUser(), this.selectedrows)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.selectedrows.forEach(x =>{
            this.sourcecustomenorecommendation.remove(x);
            this._norecomcount = this._norecomcount -1;
            this.submitted = false;
            this.gift_type = null;
            this.vendor = null;
          })
          //this.dismiss(null);
          this._influxToastaService.showToast('success', 'Response', val.status_message);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', val.status_message);
        }
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }
  onCustom(event): void {
    if (event.action === 'add') {
      this.addGenerateRequest(event.data);
    }
  }

  onUserRowSelect(event){
    this.selectedrows = event.selected;
  }

  addrequest = "none";
  openPopupforAddRequest() {
    this.addrequest = "block";
  }
  closePopupforAddRequest(status_code: string) {
    if(status_code === '40999'){
      this.sourcecustomenorecommendation.remove(this.customerforaddrequest);
      this._recomcount = this._recomcount - 1;
    }
    this.addrequest = "none";
  }

  addGenerateRequest(pCustomer : CustomerUBS) {
    this.customerforaddrequest = pCustomer;
    this.openPopupforAddRequest();
 }

 searcharrowfunc(){
  this.searcharrow = !this.searcharrow;
}

searchcustlistfunc(){
  this.customerlistshow = !this.customerlistshow;
}
commonshowhide(){
  this.searcharrow = !this.searcharrow;
  this.customerlistshow = !this.customerlistshow;
}
}
