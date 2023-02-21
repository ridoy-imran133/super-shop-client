import { DatePipe } from '@angular/common';
import {ViewChild} from '@angular/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { environment } from '../../../../environments/environment';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { APIResponseModel } from '../../models/APIResponseModel';
import { UserModel } from '../../models/UserModel';
import { UserService } from '../../services/user.service';
import { AddOwnerComponent } from '../add-owner/add-owner.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { DateUpdateComponent } from '../date-update/date-update.component';
import { EndDateComponent } from '../end-date/end-date.component';
import { ExportService } from '../export/export.service';
import { TestComponent } from '../test/test.component';
import { UserStatusComponent } from '../user-status/user-status.component';
import { PopOverComponent } from './pop-over/pop-over.component';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {  
  public _data : APIResponseModel;
  formComponent = PopOverComponent;
  baseurl = environment.baseAPIURL;
  public _Users: UserModel[];
  public _User: UserModel;
  message:string;
  uId:string;
  rows: any;

  settings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'status',
          title: '<span class= "retry">Status</span>',
        },
        {
          name: 'edit',
          title: '<span class= "retry">edit</span>',
        },
        // {
        //   name: 'inlineedit',
        //   title: '<span class= "retry">inlineedit</span>',
        // },
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
      ItTeamName: {
        title: 'It Team Name',
        type: 'string',
      },
      OwnerName: {
        title: 'Owner Name',
        type: 'string',
      },
      Description: {
        title: 'Description',
        type: 'string',
      },
      StartDate: {
        title: 'StartDate',
        type: 'custom',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: AddOwnerComponent
      },
      EndDate: {
        title: 'EndDate',
        type: 'custom',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: EndDateComponent
      },
      Status: {
        title: 'Status',
        type: 'string',
      },
    },
    mode: 'external',
   hideSubHeader: true,
    pager: {
      display: true,
      perPage: 6,
    },
  };
  @ViewChild('table') table: Ng2SmartTableComponent;
  source: LocalDataSource = new LocalDataSource();

  constructor(private _UserService: UserService, private router: Router,
    private dialogService: NbDialogService, private _influxToastaService: InfluxToastaService,
    private exportService:ExportService) {
    this._User = new UserModel();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.uId = localStorage.getItem('uId');
  }
  onCustom(event): void {
    if (event.action === 'status') {
      localStorage.setItem('userId', event.data.Id);
      this.open(event.data);
    }
    if (event.action === 'edit') {
      //this.router.navigate(['/easy/task/edit-user/' + event.data.Id]);
      this.editUser(event.data, event.data.Id);
    }
    if (event.action === 'inlineedit') {
      //this.onUserRowSelect(event);
    }

    if (event.action === 'delete') {
      if (window.confirm('Are you sure you want to delete?')) {
        alert(event.data.Id);
      }
    }
    
  }

  getAllUsers() {
    this._UserService.commonGet('Task/getUsers')
      .subscribe(
        response => {
          this.source.load([]);
          this._Users = JSON.parse(JSON.stringify(response));
          this.source.load(this._Users);

          //this.source.update(element, {FieldToUpdate: "NewValue"} );
          
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

public test(mainElement : any, updateElement: any){
  var startD = new DatePipe('en-US').transform(updateElement.StartDate, 'MM/dd/yyyy');
  var endD = new DatePipe('en-US').transform(updateElement.EndDate, 'MM/dd/yyyy');
  this.source.update(mainElement, {StartDate: startD} );
  this.source.update(mainElement, {EndDate: endD} );
  this.source.refresh();
}

  addUser() {
    const dialogRef = this.dialogService.open(AddUserComponent, {
      context: {
        id: null
      },
      //closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(val => {
      if(val != null){
        this.source.append(val);
      }
      //this.selectedRow(val.Name);
    });
  }  

  // selectedRow(name: string){
  //   alert(name);
  //   this.table.grid.getRows().forEach((row) => {
  //     if (row.getData().Name === name) {
  //       this.table.grid.selectRow(row);
  //     }
  //   });
  // }

  open(ele : any) {
    const dialogRef = this.dialogService.open(UserStatusComponent, {
      context: {
        title: 'User Status List',
      },
      closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(val => {
      if(val != ele.Status && val != null){
        this.source.update(ele, {Status: val} );
      }
    });
  }

  editUser(ele : any, id : string) {
 
    // this.table.grid.getRows().forEach((row) => {
    //   if (row.getData().Id === id) {
    //     this.table.grid.selectRow(row);
    //   }
    // });

    const dialogRef = this.dialogService.open(AddUserComponent, {
      context: {
        id: id
      },
      //closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(val => {
      if(val != ele){
        this.source.update(ele, {Name: val.Name} );
        this.source.update(ele, {ItTeamName: val.ItTeamName} );
        this.source.update(ele, {OwnerName: val.OwnerName} );
        this.source.update(ele, {Description: val.Description} );
        this.source.update(ele, {StartDate: new DatePipe('en-US').transform(val.StartDate, 'MM/dd/yyyy')} );
        this.source.update(ele, {EndDate: new DatePipe('en-US').transform(val.EndDate, 'MM/dd/yyyy')} );
        this.source.update(ele, {Status: val.Status} );
      }
    });
  }

  exportAsXLSX(){

    this._UserService.getAllUsers()
    .subscribe(
      response => {

        let list = JSON.parse(JSON.stringify(response));
        list = list == null ? []: list;
        this.exportService.exportAsExcelFile(list, 'Complain');
        
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'Name',
        search: query
      },
      {
        field: 'ItTeamName',
        search: query
      },
      {
        field: 'OwnerName',
        search: query
      },
      {
        field: 'Status',
        search: query
      }
    ], false); 
  }

  onUserRowSelect(): void {
    this.table.grid.getSelectedRows().forEach((row) => {
      this.table.grid.edit(row);
    });
}

showSoCodes(){

  this.table.grid.getRows().forEach((row) => {
    if (row.getData().Name === "Test Data") {
      //this.table.grid.edit(row);
    }
    // if (this._Users.find(elem => elem.Id === row.getData().id)) {
    //   this.table.grid.selectRow(row);
    // }
    //this.table.grid.edit(row);
  });

  // this.source.getAll().then(res =>{
  //   res.forEach(function (value){
  //     if(value.Name === "view name xyz"){
  //       this.table.grid.getRows().forEach((row) => {
  //         if (this._Users.find(elem => elem.Id === row.setItem(value))) {
  //           this.table.grid.selectRow(row);
  //         }
  //       });
  //     }
  //   });
  // });

//   this.table.grid.getRows().forEach((row) => {
//     this.table.grid.selectRow(row);
// });
}

exportAsPDF():void {

  let startDate = new DatePipe('en-US').transform(new Date(), 'dd/MM/yyyy');
  let endDate = new DatePipe('en-US').transform(new Date(), 'dd/MM/yyyy');

  let _header:any[]= [
    [
      {content: 'Start Date', styles: { fontStyle: 'bold' }}, {content: startDate},
      {content: 'End Date', styles: { fontStyle: 'bold' }}, {content: endDate},
    ]
  ];

  let _column:any[] =[
    {header: 'Name',dataKey: 'Name',},
    {header: 'It Team Name',dataKey: 'ItTeamName',},
    {header: 'Owner Name',dataKey: 'OwnerName',},
    {header: 'Description',dataKey: 'Description',},
    {header: 'Status',dataKey: 'Status',},
  ];
     
  const reportHeader: string = "Task Data";
  let _body = this._Users;
  _body = _body == null? [] : _body;

  this.exportService.exportAsPDF(reportHeader, _header, _column, _body, false);
}

}
