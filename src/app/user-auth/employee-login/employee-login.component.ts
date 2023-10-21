import { Component, OnInit } from '@angular/core';
import { RouterLink } from '../../shared/enum/routerlink';
import { ApiRouting } from '../../shared/enum/api_routing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../easy/services/session.service';
import { LoginModel } from '../../shared/models/LoginModel';
import { CommonService } from '../../easy/services/common.service';
import { Router } from '@angular/router';
import { InfluxToastaService } from '../../shared/_services/influx.toast.service';
import { LocalSessionService } from '../../shared/_services/local-session.service';

@Component({
  selector: 'ngx-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent implements OnInit {

  showPassword = false;
  login: LoginModel;
  submitted = false;
  public loginForm: FormGroup;
  registerurl = RouterLink.register;
  constructor(private _commonService: CommonService, private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService,
    private _LocalSessionService: LocalSessionService, private router: Router) { 
    this.login = new LoginModel();
  }

  ngOnInit(): void {
    this.fromCreate();
  }

  fromCreate() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get fval() {
    return this.loginForm.controls;
  }

  forgotpass(){
    alert();
  }
  onLogin(){
    this.submitted = true;
    this._LocalSessionService.sessionClear();
    this._LocalSessionService.localClear();
    if (this.loginForm.invalid) {
      return;
    }
    this._commonService.commonPost(ApiRouting.EmployeeLogin ,this.login)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.response_code === '2000'){
          var data = JSON.parse(JSON.stringify(val.response_data));
          sessionStorage.setItem("a_token", data.a_token);
          sessionStorage.setItem("s_token", data.s_token);
          sessionStorage.setItem("username", data.userName);
          sessionStorage.setItem("employee", "e");
          this.router.navigate([RouterLink.menu]);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', val.status_message);
        }
      },
      error => {
      },
      () => {
        // No errors, route to new page
      }
    );
  }


  //Password Show Hide
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


}
