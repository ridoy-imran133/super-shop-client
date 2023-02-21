import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../easy/services/common.service';
import { SessionService } from '../../easy/services/session.service';
import { RegistrationModel } from '../../shared/models/RegistrationModel';
import { InfluxToastaService } from '../../shared/_services/influx.toast.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registration: RegistrationModel;  
  submitted = false;
  public registrationForm: FormGroup;

  constructor(private _CommonService: CommonService, private formBuilder: FormBuilder, private router: Router,
    private _influxToastaService: InfluxToastaService, private _sessionService: SessionService) { 
    this.registration = new RegistrationModel();
  }

  ngOnInit(): void {
    this.fromCreate();
  }

  fromCreate() {
    this.registrationForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateofbirth: ['', [Validators.required]],
      address: ['', []],
    });
  }

  get fval() {
    return this.registrationForm.controls;
  }

  forgotpass(){
    alert();
  }
  onRegistration(){
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    this._CommonService.commonPost('Auth/Register' ,this.registration)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.response_code === '2000'){
          this.router.navigate(['/']);
          this._influxToastaService.showToast('success', 'Response', val.response_message);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', val.response_message);
        }
      },
      error => {
      },
      () => {
        // No errors, route to new page
      }
    );
  }
}