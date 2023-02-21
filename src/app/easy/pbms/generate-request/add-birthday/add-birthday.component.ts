import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { CustomerUBS } from '../../../models/CustomerUBS';
import { Gift } from '../../../models/Gift';
import { GiftVendor } from '../../../models/GiftVendor';
import { Vendor } from '../../../models/Vendor';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { GenerateRequestComponent } from '../generate-request.component';

@Component({
  selector: 'ngx-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.scss']
})
export class AddBirthdayComponent implements OnInit, OnChanges {
  @Input() _bulkmsgOther: string;
  isLoader: boolean = true;
  message: string;
  _month : string = "0";
  _year : string = "0";
  vendor : string;
  gift_type : string;
  source: LocalDataSource = new LocalDataSource();
  public _customers: CustomerUBS[];
  public masterForm: FormGroup;
  isCustomerList: boolean = false;
  _vendors: Vendor[];
  _gifts: Gift[];
  _giftvendors: GiftVendor[];
  //_showVendor: Vendor[];
  //allvendorcode: string[];
  public _showVendor: Array<Vendor> = [];
  birthcustcount = 0;
  defaultRowPerPage = 0;

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      month: ['', ] ,
      year: ['', ] ,
      gift_type: ['', ] ,
      vendor: ['', ] ,

    });
  }

  get fval() {
    return this.masterForm.controls;
  }
  constructor(private _CommonService: CommonService, private generaterequest: GenerateRequestComponent,
              private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService, private _sessionService: SessionService) { }

  ngOnInit(): void {    
    this.fromCreate();
  }
  ngOnChanges() {
    this.message = this._bulkmsgOther;
  }

  settings = {

    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'delete',
          title: '<span class= "delete"><i class="nb-trash"></i></span>',
        }
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
      mobile_number: {
        title: 'Mobile Number',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
        width: '500px'
      },
      birth_date: {
        title: 'Birth Date',
        valuePrepareFunction: (date_of_birth) => {
          return new DatePipe('en-EN').transform(new Date(date_of_birth), 'dd/MM/yyyy');
        }
      },
      // birthday_reason: {
      //   title: 'Reason',
      //   type: 'string',
      // },
      // birthday_recom: {
      //   title: 'Recom',
      //   type: 'string',
      // },
    },
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 1000,
    },
  };

  monthwiseBirthday(){
    this.getAllCustomers(sessionStorage.getItem("userId"), sessionStorage.getItem("RoleId"), sessionStorage.getItem("BranchCode"), "", this._month, "N");    
    this.getAllGiftVendor();
    this.getAllGifts();
    this.getAllVendors();
    this.isCustomerList = true;
  }

  onSaveBirthday(){
    this._CommonService.commonPost('ServiceRequest/saveMultiServiceRequest/'+ this.gift_type + '/' + this.vendor+ '/' +this._sessionService.getUser(), this._customers)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.dismiss(null);
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
  // ngAfterViewInit(){
  //   this.setPager();
  // }

  dismiss(val: any) {
    //this.ref.close(val);
    this.isCustomerList = false;
    this.isLoader = true;
    this._month  = "0";
    this._year  = "0";
    this.generaterequest.closePopup();
  }

  getAllCustomers(userId: string, roleId: string, branchCode: string = "", custno: string = "", birthmonth: string = "", birthrecom: string = "") {
    this._CommonService.commonGet('ServiceRequest/getAllCustomers?userId=' + userId + "&&roleId=" + roleId + "&&branchCode=" + branchCode+ "&&custno=" + custno+ "&&birthmonth=" + birthmonth+ "&&birthrecom=" + birthrecom+ "&&isbirth=" + true)
      .subscribe(
        response => {
          this.source.load([]);
          this._customers = JSON.parse(JSON.stringify(response)).customerInformation;
          this.source.load(this._customers);
          this.isLoader = false;
          this.birthcustcount = this._customers.length;
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  onCustom(event): void {
    if (event.action === 'delete') {
      this.onDeleteConfirm(event);
    }
  }

  onDeleteConfirm(event) {
    let index = this._customers.indexOf(event.data);
    this._customers.splice(index, 1);
    this.source = new LocalDataSource(this._customers);
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

// dropdownvendor(){
//   this._vendors.forEach(x => {
//     if(this.allvendorcode.find(y => y == x.vendor_code)){
//       this._showVendor.push(x);
//     }
//   })
// }
private customValidation(){

}

setPager() {
  this.source.setPaging(1, this.defaultRowPerPage, true);
  this.settings = Object.assign({}, this.settings);
}

}
