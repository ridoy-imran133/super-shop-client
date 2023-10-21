import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonApiConnectService } from '../../../../../shared/_services/common-api-connect.service';
import { EmployeeComponent } from '../../employee.component';
import { InfluxToastaService } from '../../../../../shared/_services/influx.toast.service';
import { Employee } from '../../../../../shared/models/shop/security/Employee';
import { NbComponentSize } from '@nebular/theme';
import { Role } from '../../../../../shared/models/shop/security/Role';

@Component({
  selector: 'ngx-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  @Input() _employeeFromOther: Employee; //_employeeFromOther
  @Input() textfromother: string;
  @Input() textval: string;
  size: NbComponentSize= 'medium';
  public masterForm: FormGroup;
  submitted= false;
  public employee : Employee;
  status: boolean;
  isTest:boolean = false;
  public roles: Role[];
  constructor(private formBuilder: FormBuilder, private employeecomponent: EmployeeComponent,
              private _commonService: CommonApiConnectService, private _influxToastaService: InfluxToastaService) { 
    this.employee = new Employee();
  }

  ngOnInit(): void {
    this.fromCreate();
    this.getAllRoles();
  }

  ngOnChanges() {
    if(this.textfromother == 'block'){
      this.employee = this._employeeFromOther;
      this.textfromother = 'none';
    }
  }
  
  fromCreate() {
    this.masterForm = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      email: ['', [Validators.required]],
      ec_name: ['', [Validators.required]],
      ec_phone: ['', [Validators.required]],
      role_code: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  dismissfornone(){
    this.submitted = false;
    this.employeecomponent.closePopupfornone();
  }

  dismiss(pEmployee: Employee, addedit: string){
    this.submitted = false;
    this.employee = new Employee();
    this.employeecomponent.closePopup(pEmployee, addedit);
  }

  onSaveEmployee(){
    this.submitted = true;
    if(!this.employee.HasSystemAccess)
    {
      alert(this.employee.HasSystemAccess)
      return;
    }
    if (this.masterForm.invalid) {
    return;
    }
    
    this.employee.ProjectCode = "P005";
    this.employee.Token = sessionStorage.getItem("a_token");
    this._commonService.commonPost('Employee/Save', this.employee)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response)).response;
        if(val.ResponseCode === '2000'){
          this.dismiss(val.ResponseData, this.textval);
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

  getAllRoles() {
    this._commonService.commonGet('Employee/GetRoles/'+ sessionStorage.getItem("a_token"))
      .subscribe(
        response => {
          this.roles = JSON.parse(JSON.stringify(response)).roles;
        },
        error => {
        },
        () => {
        },
      );
  }

  toggle(checked: boolean) {
    this.employee.HasSystemAccess = checked;
  }
}
