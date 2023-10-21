import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from '../../../shared/models/RegistrationModel';
import { LocalDataSource } from 'ng2-smart-table';
import { CommonApiConnectService } from '../../../shared/_services/common-api-connect.service';
import { PermitedMenuService } from '../../../shared/_services/permited-menu.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { Employee } from '../../../shared/models/shop/security/Employee';

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[];
  source: LocalDataSource = new LocalDataSource();
  private customArray: any =[];
  public employee : Employee;

  public addedit: string = "Add";
  constructor(public _commonService: CommonApiConnectService, private _permitedMenuService: PermitedMenuService,
    private _influxToastaService: InfluxToastaService) {
   this.employee = new Employee();
 }

  ngOnInit(): void {
    this.getAllEmployees();
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
      FullName: {
        title: 'Full Name',
        type: 'string',
      },
      UserName: {
        title: 'User Name',
        type: 'string',
      }, 
      PhoneNumber: {
        title: 'Phone Number',
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

  getAllEmployees() {
    this._commonService.commonGet('Employee/GetAll/'+ sessionStorage.getItem("a_token"))
      .subscribe(
        response => {
          this.source.load([]);
          this.employees = JSON.parse(JSON.stringify(response)).employees;
          this.source.load(this.employees);
        },
        error => {
        },
        () => {
        },
      );
  }

  addEmployee(){
    this.employee = new Employee();
    this.addedit = "Add";
    this.openPopup();
  }
  onCustom(event): void {
    if (event.action === 'add') {
      //this.addGenerateRequest(event.data);
    }
    else if (event.action === 'Edit') {
      // this.outletpass = event.data;
      // this.addedit = "Edit";
      // this.openPopup();
    }  
    else if (event.action === 'history') {
      //this.customerHistory(event.data);
    }  
    else if (event.action === 'Cancel') {
      //this.deletedata(event.data.EmployeeCode);
    } 
  }

  deletedata(outletid: string){
    this._commonService.commonGet('Employee/delete?outletcode=' + outletid)
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
  closePopup(employee: Employee, addeditval: string) {
    addeditval == "Add" ? this.source.append(employee) : this.source.update(this.employee, employee);
    this.display = "none";
  }

  closePopupfornone() {
    this.display = "none";
  }

}
