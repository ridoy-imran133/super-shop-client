import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { OwnerModel } from '../../models/OwnerModel';
import { SmTable } from '../../models/SmTable';
import { UserService } from '../../services/user.service';
import { DialogNamePromptComponent } from '../dialog-name-prompt/dialog-name-prompt.component';
import { SmartTableService } from '../smart/smart-table.service';

@Component({
  selector: 'ngx-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss']
})
export class OwnerListComponent implements OnInit {
  public _Owners: OwnerModel[];
  public _Owner: OwnerModel;
  public _SmTable: SmTable;

  settings;

  mySettings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'delete',
          title: '<span class= "retry">Delete</span>',
        },
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
    },
    mode: 'external',
    // hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
  };

  //settings = Object.assign({}, this.newsettings );
  source: LocalDataSource = new LocalDataSource();

  constructor(private _UserService: UserService, private router: Router, private smartTableService: SmartTableService,
    private dialogService: NbDialogService, private _influxToastaService: InfluxToastaService) {
    this._Owner = new OwnerModel();
    this._SmTable = new SmTable();
  }

  ngOnInit(): void {
    this.getAllOwners();
  }

  onCustom(event): void {
    if (event.action === 'delete') {

      if (window.confirm('Are you sure you want to delete?')) {
        this._UserService.DeleteOwner(event.data.id)
      .subscribe(
        response => {
          this._influxToastaService.showToast('danger', 'Response', "Delete Successfully");
          this.getAllOwners();
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
    }
    }
  }

  getAllOwners() {
    this._UserService.getAllOwner()
      .subscribe(
        response => {
          this.source.load([]);
          this._Owners = JSON.parse(JSON.stringify(response));
          this.source.load(this._Owners);
          var val = this.smartTableService.saveSmartTable(this._Owners);
          //var newSet = this.smartTableService.saveSmartTable(this._Owners);
          //this.mySettings.columns = val;
          this.settings = Object.assign({}, this.mySettings);
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
      .onClose.subscribe(name => name && this.saveOwners(name));
  }

  saveOwners(name) {
    this._Owner.Name = name;
    const busData = {
      BusinessData: this._Owner,
    };

    this._UserService.saveOwner(busData)
      .subscribe(
        response => {
          const value = JSON.parse(JSON.stringify(response));
          this._influxToastaService.showToast('success', 'Response', value);
          this.getAllOwners();
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

}
