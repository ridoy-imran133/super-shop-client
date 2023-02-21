import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { Area } from '../../models/Area';
import { Branch } from '../../models/Branch';
import { SearchModel } from '../../models/SearchModel';
import { ServiceRequest } from '../../models/ServiceRequest';
import { VasService } from '../../models/VasService';
import { CommonService } from '../../services/common.service';
import { PermitedMenuService } from '../../services/permited-menu.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'ngx-user-wise-service-request',
  templateUrl: './user-wise-service-request.component.html',
  styleUrls: ['./user-wise-service-request.component.scss']
})
export class UserWiseServiceRequestComponent implements OnInit {
  branchareavisible : boolean = true;
  custgridshow : boolean = false;
  isareacode = true;
  iscustlistshow: boolean = false;
  customerlistshow = false;
  searcharrow = true;
  source: LocalDataSource = new LocalDataSource(); 
  _servicerequest: ServiceRequest[];
  public masterForm: FormGroup;
  _searchModel: SearchModel;
  public _branch : Branch[];
  public _areas : Area[];
  public _vasServices: VasService[];
  public _showbranch: Array<Branch> = [];
  roleid: string = this._sessionService.getRole();
  branchcode: string = this._sessionService.getBranch();
  constructor(private _CommonService: CommonService, private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService,
    private _permitedMenuService: PermitedMenuService, private _sessionService: SessionService,) {
      this._searchModel = new SearchModel();
     }

  ngOnInit(): void {
    this.fromCreate();
    if(this.roleid == "R003" || this.roleid == "R002"){
      this.isareacode = false;
      this.branchareavisible = false;
    }
    this.getAllBranch();
    this.getAllAreas();
    this.getAllVasService();
    //this.getUserWiseService();
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      branch_code: ['', []],
      area_code: ['', []],
      service_code: ['', []],
      statuscode: ['', []],
    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  searchServices(){    
    this.iscustlistshow = !this.iscustlistshow;
    this.searcharrow = !this.searcharrow;
    this.searchcustlistfunc();
    this.getUserWiseService();
    this.custgridshow = true;
  }

  settings = {

    actions: {
      columnTitle: 'Service',
      add: false,
      edit: false,
      delete: false,
      custom: false,
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
      },
      cust_name: {
        title: 'Customer Name',
        type: 'string',
      },
      branch_name: {
        title: 'Branch',
        type: 'string',
      },
      service_name: {
        title: 'Service Name',
        type: 'string',
      },
      cust_birthday: {
        title: 'Birthday',
        valuePrepareFunction: (cust_birthday) => {
          return new DatePipe('en-EN').transform(new Date(cust_birthday), 'dd/MM/yyyy');
        }
      },
      status_code: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (status_code) => {
           var val = status_code.toLowerCase() === 'p' ? "Pending" : (status_code.toLowerCase() === 'a' ? "Approve" : (status_code.toLowerCase() === 'r' ? "Recommendation" : "Cancel"));
           return val; 
          },
      },
      gift_name: {
        title: 'Gift',
        type: 'string',
      },
      vendor_name: {
        title: 'Vendor',
        type: 'string',
      },
      cust_address: {
        title: 'Address',
        type: 'string',
      },
    },
    selectMode: "single",
   mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 5,
    },
  };

  public getUserWiseService(){
    if(this.roleid == "R002" || this.roleid == "R003"){
      this._searchModel.branch_code = this._sessionService.getBranch();
      this._searchModel.area_code = "";
    }
    this._CommonService.commonGet('ServiceRequest/getAllUserWiseServiceRequest?pbranchcode=' + this._searchModel.branch_code + "&&puserid=" + this._sessionService.getUser() + "&&pareacode=" + this._searchModel.area_code + "&&pservicecode=" + this._searchModel.service_code + "&&pstatuscode=" + this._searchModel.statuscode)
    .subscribe(
      response => {
        this.source.load([]);
        this._servicerequest = JSON.parse(JSON.stringify(response)).servicerequest;
        //this._serviceRequestPen == null ? this.tableDataPen = true : '';
        this.source.load(this._servicerequest);
        //this._pendingcount = this._servicerequest.length;
      },
      error => {
       this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
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

  getAllVasService(){
    this._CommonService.commonGet('ServiceRequest/getAllVasService/' + this._sessionService.getUser())
    .subscribe(
      response => {
        this._vasServices = JSON.parse(JSON.stringify(response)).vasService;
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
