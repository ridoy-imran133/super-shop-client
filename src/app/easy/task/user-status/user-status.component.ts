import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { FileModel } from '../../models/FileModel';
import { UserStatusModel } from '../../models/UserStatusModel';
import { FileDownloadService } from '../../../shared/_services/file-download.service';
import { UserService } from '../../services/user.service';
import { FileSaveService } from '../../../shared/_services/file-save.service';

@Component({
  selector: 'ngx-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit {

  @Input() title: string;
  public _UserStatus: UserStatusModel;
  _selectedFileName: string;

  public _UserStatusList: UserStatusModel[];
  source: LocalDataSource = new LocalDataSource();


  _userId: string;

  public FMDivisionForm: FormGroup;
  public validatorErrorMsg: any;

  constructor(protected ref: NbDialogRef<UserStatusComponent>,
    private formBuilder: FormBuilder,
    private _UserService: UserService,
    private _fileDownloadService: FileDownloadService,
    private _fileSaveService: FileSaveService,
    private router: Router,
    private _influxToastaService: InfluxToastaService  ) {
    this._UserStatus = new UserStatusModel();
    this._UserStatus.FileModel = new FileModel();
  }

  fromCreate() {
    this.FMDivisionForm = this.formBuilder.group({
      Name: ['', Validators.required],
    });
  }
  get fval() {
    return this.FMDivisionForm.controls;
  }

  settings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'downlaod',
          title: '<span class= "retry">Download</span>',
        },
        // ,
        // {
        //   name: 'Retry',
        //   title: '<span class= "retry" title ="Retry for Acc. opening">Retry</span>'
        // }
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
      Name: {
        title: 'Name',
        type: 'string',
      },
      FileName: {
        title: 'File Name',
        type: 'string',
      },
      // fileLocation: {
      //   title: 'File Location',
      //   type: 'string',
      // },
      CreatedDate: {
        title: 'Update Date',
        type: 'string',
      },
    },
    mode: 'external',
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 2,
    },
  };

  onCustom(event): void {
    if (event.action === 'downlaod') {
      this._fileDownloadService.onDownload(event.data.FileLocation);
  }
    if (event.action === 'delete') {
        if (window.confirm('Are you sure you want to delete?')) {
      }
    }
  }
  dismiss() {
    //this.router.navigate(['/pages/task/add-owner']);
    this.ref.close(this._UserStatus.Name);
  }

  ngOnInit(): void {
    this.fromCreate();
    this._userId = localStorage.getItem("userId");
    this.getAllStatusByUser();
  }

  public onFileChange(event) {
    this._selectedFileName = event.target.files[0].name;
    var val = this._fileSaveService.onFileChange(event);
    this._UserStatus.FileModel = val;
  }

  onSaveStatus() {
    this._UserStatus.UserId = this._userId;
    const busData = {
      BusinessData: this._UserStatus,
    };

    this._UserService.saveUserStatus(busData)
      .subscribe(
        response => {
          const value = JSON.parse(JSON.stringify(response));
          this._influxToastaService.showToast('success', 'Response', value);
           this.getAllStatusByUser();
           this.dismiss();
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  getAllStatusByUser() {
    this._UserService.getAllStatusByUser(this._userId)
      .subscribe(
        response => {
          this.source.load([]);
          this._UserStatusList = JSON.parse(JSON.stringify(response));
          this.source.load(this._UserStatusList);
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

}
