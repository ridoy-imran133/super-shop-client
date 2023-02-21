import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { UserDate } from '../../models/UserDate';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-date-update',
  templateUrl: './date-update.component.html',
  styleUrls: ['./date-update.component.scss']
})
export class DateUpdateComponent implements OnInit {
  @Input() title: string;
  public _user: UserDate;


  _userId: string;

  public FMDivisionForm: FormGroup;
  public validatorErrorMsg: any;

  public StartDate: Date;
  constructor(protected ref: NbDialogRef<DateUpdateComponent>,
    private formBuilder: FormBuilder,
    private _UserService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _influxToastaService: InfluxToastaService  ) {
    this._user = new UserDate();
  }

  fromCreate() {
    this.FMDivisionForm = this.formBuilder.group({
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    });
  }
  get fval() {
    return this.FMDivisionForm.controls;
  }

  dismiss() {
    //this.router.navigate(['/pages/task/add-owner']);
    this.ref.close(this._user);
  }

  ngOnInit(): void {
    this.fromCreate();
    // this._userId = this.route.snapshot.paramMap.get("date");
    // if(this._userId == null){
    //   this._userId = localStorage.getItem("userId");
    // }

    this._userId = localStorage.getItem("userId");
    if(this._userId != null){
      this.fetchUser();
    }
  }

  fetchUser() {
    this._UserService.getUser(this._userId)
      .subscribe(
        response => {
          this._user = JSON.parse(JSON.stringify(response));
          
          //this.startDate = this._user.StartDate;
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  onSaveDate() {
    this._user.Id = this._userId;
    const busData = {
      BusinessData: this._user,
    };

    this._UserService.saveUserDate(busData)
      .subscribe(
        response => {
          const value = JSON.parse(JSON.stringify(response));
          this._influxToastaService.showToast('success', 'Response', value);
           //this.getAllStatusByUser();
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

}