import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { ItTeamModel } from '../../models/ItTeamModel';
import { OwnerModel } from '../../models/OwnerModel';
import { UserModel } from '../../models/UserModel';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input() id: string;
  public masterForm: FormGroup;
  public name: string;
  public masterFormSms: FormGroup;
  public _user: UserModel;
  public submitted = false;
  baseurl = environment.baseAPIURL;
  _acuid: string;
  _title: string = "Add";
  public _ItTeams: ItTeamModel[];
  public _Owners: OwnerModel[];
  
  constructor( protected ref: NbDialogRef<AddUserComponent>, private router: Router,    
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _influxToastaService: InfluxToastaService,
    private _UserService: UserService) { 
    this._user = new UserModel();
  }

  ngOnInit(): void {
    this.getAllItTeam();
    this.getAllOwners();
    this.fromCreate();
    if(this.id != null){
      this._title = "Edit";
      this.getUser(this.id);
    }
    // this.activatedRoute.paramMap.subscribe(params => {
    //   this._acuid = params.get('auid');
    //   if(this._acuid != null){
    //     this._title = "Edit";
    //     this.getUser();
    //   }
    // });    
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Owner: ['', Validators.required],
      ItTeam: ['', Validators.required],
      Description: ['', Validators.required],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      Status: ['', [Validators.required]],

    });
  }

  get fval() {
    return this.masterForm.controls;
  }


  onSaveUser() {

    if (this.masterForm.invalid) {
      return;
    }

    const busData = {
      BusinessData: this._user
    }


    this._UserService.commonPost('Task/SaveUser' ,busData)
      .subscribe(
        response => {
          this._influxToastaService.showToast('success', 'Response', response.toString());
          localStorage.setItem('uId', this._acuid);
          this.dismiss(this._user);
          //this.router.navigate(['/easy/task/user-demo']);
        },
        error => {

        },
        () => {
          // No errors, route to new page
        }
      );
  }

  getAllItTeam() {
    this._UserService.commonGet('Task/usersItTeam')
      .subscribe(
        response => {
          this._ItTeams = JSON.parse(JSON.stringify(response));
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  getAllOwners() {
    this._UserService.commonGet('Task/owners')
      .subscribe(
        response => {
          this._Owners = JSON.parse(JSON.stringify(response));
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  getUser(pId: string){
    this._UserService.commonGet('Task/GetUser?pId=' + pId)
    .subscribe(
      response => {
        this._user = JSON.parse(JSON.stringify(response));
        // this.getAllItTeam();
        // this.getAllOwners();
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  dismiss(_user: UserModel) {
    this.ref.close(this._user);
  }
}
