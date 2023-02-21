import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Area } from '../../models/Area';
import { Branch } from '../../models/Branch';
import { CustomerFilter } from '../../models/CustomerFilter';
import { CustomerUBS } from '../../models/CustomerUBS';
import { SearchModel } from '../../models/SearchModel';
import { CommonService } from '../../services/common.service';
import { PermitedMenuService } from '../../services/permited-menu.service';
import { SessionService } from '../../services/session.service';
import { CustProfileComponent } from '../cust-profile/cust-profile.component';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { CustHistoryComponent } from './cust-history/cust-history.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { UpdateRmComponent } from './update-rm/update-rm.component';
import { RequestButtonComponent } from './request-button/request-button.component';
import { Rm } from '../../models/Rm';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';

@Component({
  selector: 'ngx-generate-request',
  templateUrl: './generate-request.component.html',
  styleUrls: ['./generate-request.component.scss']
})
export class GenerateRequestComponent implements OnInit {  
  displayStyle = "none";
  isLo: boolean = false;
  selectedMode: boolean = true;
  isLoader: boolean = false;
  //selectedRows: any;
  isbirthday: boolean = false;
  isareacode: boolean = true;
  birthday: string;
  defaultRowPerPage = 10;
  smode: string = "single";
  loading = false;
  searcharrow = true;
  tablearrow = false;
  _searchModel: SearchModel;
  public _customers: CustomerUBS[];
  public _branchCustomers: CustomerUBS[];
  private customArray: any =[];
  public masterForm: FormGroup;
  public customerFilter: CustomerFilter;
  public selectedrows: Array<CustomerUBS> = [];
  source: LocalDataSource = new LocalDataSource();
  public _branch : Branch[];
  public _areas : Area[];
  public _showbranch: Array<Branch> = [];
  options: string[];
  filteredOptions$: Observable<string[]>;
  @ViewChild('autoInput') input;
  roleid: string = this._sessionService.getRole();
  branchcode: string = this._sessionService.getBranch();
  iscustomersshow: boolean = false;

  ismodalopen: boolean = false;

  //for bulk birthday
  public bulkbirthday: string = "none";

  public customerforaddrequest: CustomerUBS;
  public customerforhistory: CustomerUBS;
  public customerforupdaterm: CustomerUBS;
  public customerprofileupdatemodal: CustomerUBS;

  public customerforrm: CustomerUBS;


  branch_code: string;
  prio_code: string;
  constructor(private _CommonService: CommonService, private dialogService: NbDialogService, private formBuilder: FormBuilder,
    private renderer2: Renderer2, private e: ElementRef, private route:ActivatedRoute, private _sanitizer: DomSanitizer, 
    private _sessionService: SessionService, private _permitedMenuService: PermitedMenuService, private _influxToastaService: InfluxToastaService) { 
    this.customerFilter = new CustomerFilter();
    this._searchModel = new SearchModel();
    this._rmdetails = new Rm();
    this.customerforupdaterm = new CustomerUBS();
    this.customerforrm = new CustomerUBS();
  }

  ngOnInit(): void {
    this.fromCreate();
    if(this.roleid == "R003"){
      this.isareacode = false;
    }
    this.getAllBranch();
    this.getAllAreas();
    this.loadMenuPermission();
  }

  ngAfterViewInit() {
  }

  toggle() {
    this.isbirthday = !this.isbirthday;
    this._searchModel.area_code = null;
    this._searchModel.branch_code = null;
    this.iscustomersshow = false;
    this.source.load([]);
    if(this.isbirthday && this.roleid == "R002"){
      this.isareacode = false;
      this._showbranch = [];
      this._branch.forEach(x => {
        if(x.branch_code === this.branchcode){
          this._showbranch.push(x);
        }
      });
    }
    else if(this.isbirthday && this.branchcode != "999"){
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
  fromCreate() {
    this.masterForm = this.formBuilder.group({
      branch_code: ['', ],
      area_code: ['', ],
    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  settings = {

    actions: {
      columnTitle: 'Service',
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
      total_balance: {
        title: 'Total Balance',
        type: "html",
        valuePrepareFunction: (total_balance) => { return '<p class="cell_right">' + total_balance + '</p>'; },
      },
      Edit: {
        title: 'Update',
        type: 'custom',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: EditCustomerComponent
      },
    },
    selectMode: "single",
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 5,
    },
  };

  onCustom(event): void {
    if (event.action === 'add') {
      this.addGenerateRequest(event.data);
    }    
    else if (event.action === 'history') {
      this.customerHistory(event.data);
    }  
    else if (event.action === 'update') {
      this.updateRM(event.data);
    } 
  }
  loadMenuPermission() {
    this.customArray = this._permitedMenuService.setCutomActionItemsForGenerateRequest();
    this.settings.actions.custom = this.customArray;
    this.settings = Object.assign({}, this.settings);
  }

  getAllCustomers(userId: string, roleId: string, areacode: string = "", branchCode: string = "", custno: string = "", birthmonth: string = "", birthrecom: string = "") : any {
  var arcode = areacode == "null" || areacode == null ? "" : areacode;
  var brcode = branchCode == "null" || branchCode == null ? "" : branchCode;
  this._CommonService.commonGet('ServiceRequest/getAllCustomers?userId=' + userId + "&&roleId=" + roleId + "&&areacode=" + arcode + "&&branchCode=" + brcode+ "&&custno=" + custno+ "&&birthmonth=" + birthmonth+ "&&birthrecom=" + birthrecom+ "&&isbirth=" + this.isbirthday)
    .subscribe(
      response => {
        this.source.load([]);
        this._customers = JSON.parse(JSON.stringify(response)).customerInformation;
        this.loading = true;
        this.source.load(this._customers);
        this.iscustomersshow = true;
        this.isLoader = false;
        return this._customers;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  addGenerateRequest(pCustomer : CustomerUBS) {
     this.customerforaddrequest = pCustomer;
     this.openPopupforAddRequest();
  }

  customerHistory(pCustomer : CustomerUBS) {
    this.customerforhistory = pCustomer;
    this.openPopupforCustHistory();
  }

  searchCustomer(){
    this.source.load([]);
    this.searcharrow = !this.searcharrow;
    this.isLoader = true;
    this.iscustomersshow = false;
    this.loading = false;
    this.getAllCustomers(this._sessionService.getUser(), this._sessionService.getRole(),this._searchModel.area_code, this._searchModel.branch_code, this._searchModel.cust_no, "", "");
  }

  userRow(pC : CustomerUBS){
    this.selectedrows.push(pC);
    alert();
  }

  selectedValueSave(type: string){
    this._CommonService.commonPost('ServiceRequest/saveMultiServiceRequest/' + type ,this.selectedrows)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
        }
      },
      error => {
      },
      () => {
      }
    );
  }

  setPager() {
    this.source.setPaging(1, this.defaultRowPerPage, true);
    this.settings = Object.assign({}, this.settings);
  }

  onClick() {
      delete this.settings.columns.cust_no;
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

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  addBirthdayRequest() {
    this.openPopup();
    // const dialogRef = this.dialogService.open(AddBirthdayComponent, {
    //   context: {},
    // });
    // dialogRef.onClose.subscribe(val => {
    //   if(val != null){
    //     this.selectedValueSave(val);
    //   }
    // });
  }

  editCustomerInfo(pCustomer: CustomerUBS) {
    const dialogRef = this.dialogService.open(CustProfileComponent, {
      context: {},
      //closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(val => {
      if(val != null){
        //this.selectedValueSave(val);
      }
      //this.selectedRow(val.Name);
    });
  }

  updateRM(pCustomer: CustomerUBS) {
    this.customerforrm = pCustomer;
    this.openPopupforUpdateRm(pCustomer);
  }

  branchselect(){
    // this.source.load([]);
    this.isLo = true;
    //this.iscustomersshow = false;
  }

  searcharrowfunc(){
    this.searcharrow = !this.searcharrow;
  }

  tablerowfunc(){
    this.tablearrow = !this.tablearrow;
  }


  onSearch(query: string = '') {
    if (query.trim().length > 0){
      this.source.setFilter([
        {
          field: 'cust_no',
          search: query
        },
        {
          field: 'cust_name',
          search: query
        }
      ], false); 
    }
  }

  display = "none";
  
  openPopup() {
    this.bulkbirthday = "block";
  }
  closePopup() {
    this.bulkbirthday = "none";
  }

  addrequest = "none";
  openPopupforAddRequest() {
    this.addrequest = "block";
  }
  closePopupforAddRequest() {
    this.addrequest = "none";
  }

  custhistory = "none";
  openPopupforCustHistory() {
    this.custhistory = "block";
  }
  closePopupforCustHistory() {
    this.custhistory = "none";
  }

  updatermformodal = "none";
  openPopupforUpdateRm(customer: CustomerUBS) {
    this.ismodalopen = true;
    this.branch_code = null;
    this.prio_code = null;
    this.getBranchWiseRM(customer);
  }
  closePopupforUpdateRm() {
    this.ismodalopen = false;
    this.updatermformodal = "none";
  }
  _rm: Rm[];
  _rmdetails: Rm;
  getBranchWiseRM(_customer: CustomerUBS) {
    this.customerforupdaterm = _customer;
    this._CommonService.commonGet('ServiceRequest/getAllRM?branchcode=' + this.branchcode + "&&userid=" + this._sessionService.getUser())
      .subscribe(
        response => {
          this._rm = JSON.parse(JSON.stringify(response)).rm;
          this._rm.forEach(x => {
            if(x.priority_code === _customer.priority_code){
              this._rmdetails = x;
              this.updatermformodal = "block";
            }
          })
        },
        error => {
        },
        () => {
        },
      );
  }

  savepriority(){
    this.customerforupdaterm.priority_code = this.prio_code;
    this._CommonService.commonPost('ServiceRequest/updateCustomer/'+ this._sessionService.getUser() ,this.customerforupdaterm)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          //this.dismiss();
          this.closePopupforUpdateRm();
          this.customerforupdaterm = new CustomerUBS();
          this._influxToastaService.showToast('success', 'Response', val.status_message);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', "Failed");
        }
      },
      error => {
      },
      () => {
        // No errors, route to new page
      }
    );
  }

  customerprofilepopup(pcustomer: CustomerUBS){
    this.customerprofileupdatemodal = pcustomer;
    this.openPopupforCustUpdate();
  }

  custprofileupdate = "none";
  openPopupforCustUpdate() {
    this.custprofileupdate = "block";
  }
  closePopupforCustUpdate() {
    this.custprofileupdate = "none";
  }

  branchselectforRM(){
    this.branchcode = this.branch_code;
    this.prio_code = null;
    this.getBranchWiseRM(this.customerforupdaterm);
  }
}
