import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { ItTeamModel } from '../../models/ItTeamModel';
import { UserService } from '../../services/user.service';
import { DialogNamePromptComponent } from '../dialog-name-prompt/dialog-name-prompt.component';

@Component({
  selector: 'ngx-it-team-list',
  templateUrl: './it-team-list.component.html',
  styleUrls: ['./it-team-list.component.scss'],
})
export class ItTeamListComponent implements OnInit {
  public _ItTeam: ItTeamModel[];
  public _ITeam: ItTeamModel;
  names: string[] = [];

  settings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'delete',
          title: '<span class= "retry">Delete</span>',
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

      // ComplainDate: {
      //  title: 'Complain Date', type: 'date',
      //  valuePrepareFunction: (date) => {
      //    if (date) {
      //      return new DatePipe('en-US').transform(date, 'dd/MM/yyyy');
      //    }
      //    return null;
      //  },
      //  filterFunction(cell?: any, search?: string): boolean {
      //    let data = new DatePipe('en-US').transform(cell, 'dd/MM/yyyy');
      //    if (data.includes(search) || search === '') {
      //      return true;
      //    } else {
      //      return false;
      //    }
      //  }
      // },

      // ResolveDate: {
      //  title: 'Resolve Date', type: 'date',
      //  valuePrepareFunction: (date) => {
      //    if (date) {
      //      return new DatePipe('en-US').transform(date, 'dd/MM/yyyy');
      //    }
      //    return null;
      //  },
      //  filterFunction(cell?: any, search?: string): boolean {
      //    let data = new DatePipe('en-US').transform(cell, 'dd/MM/yyyy');
      //    if (data.includes(search) || search === '') {
      //      return true;
      //    } else {
      //      return false;
      //    }
      //  }
      // },
    },
    mode: 'external',
    // hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private _UserService: UserService, private router: Router,
    private dialogService: NbDialogService, private _influxToastaService: InfluxToastaService) {
    this._ITeam = new ItTeamModel();
  }

  ngOnInit(): void {
    this.getAllItTeam();
  }

  onCustom(event): void {
    if (event.action === 'delete') {

      if (window.confirm('Are you sure you want to delete?')) {
        this._UserService.DeleteItTeam(event.data.id)
      .subscribe(
        response => {
          this._influxToastaService.showToast('danger', 'Response', "Delete Successfully");
          this.getAllItTeam();
          //this.startDate = this._user.StartDate;
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
    }
    }
    // if (this._permissionModel.IsEdit && event.action === 'Assign') {
    //  if (event.data.Status == 'Pending' || event.data.Status == 'In Progress') {
    //    this.router.navigate([`/complain/complain/assign/${event.data.Id}`]);
    //  } else {
    //    this._influxToastaService.showToast('danger', 'Response', "you can not assign reource in this complain");
    //  }
    // }
    // else if (this._permissionModel.IsEdit && event.action === 'Resolve') {
    //  if (event.data.Status == 'In Progress') {
    //    this.router.navigate([`/complain/complain/resolve/${event.data.Id}`]);
    //  } else {
    //    this._influxToastaService.showToast('danger', 'Response', "this complain is not in pregress yet");
    //  }
    // }
    // else if (this._permissionModel.IsEdit && event.action === 'Cancel') {

    //  if (event.data.Status == 'Pending') {
    //    this.onCancelConfirm(event)
    //  } else {
    //    this._influxToastaService.showToast('danger', 'Response', "Only Pending complain can be Canceled");
    //  }
    // }
    // else if (this._permissionModel.IsView && event.action === 'Details') {
    //  this.router.navigate([`/complain/complain/view/${event.data.Id}`]);
    // }
  }


  getAllItTeam() {
    this._UserService.getAllItTeam()
      .subscribe(
        response => {
          this.source.load([]);
          this._ItTeam = JSON.parse(JSON.stringify(response));
          this.source.load(this._ItTeam);
          // if (this._data.ResponseCode == 200) {
          //  this._CustomerAccountInformationModelList = JSON.parse(this._data.ResponseBusinessData);
          //  this.smartTableDataSource.load(this._CustomerAccountInformationModelList);
          //  // this.smartTableDataSource.setPaging(3,5,true);
          // }
          // else {
          //  this._influxToastaService.showToast('danger', 'Response', this._data.ErrMsg);
          // }
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  open3() {
    this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(name => name && this.saveItItem(name));
  }

  saveItItem(name) {
    this._ITeam.Name = name;
    const busData = {
      BusinessData: this._ITeam,
    };

    this._UserService.saveItTeam(busData)
      .subscribe(
        response => {
          const value = JSON.parse(JSON.stringify(response));
          this._influxToastaService.showToast('success', 'Response', value);
          this.getAllItTeam();
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

}
