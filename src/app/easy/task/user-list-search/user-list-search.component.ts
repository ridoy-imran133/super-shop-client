import { DatePipe } from '@angular/common';
import {ViewChild} from '@angular/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { environment } from '../../../../environments/environment';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { FilterModel } from '../../models/FilterModel';
import { UserModel } from '../../models/UserModel';
import { UserService } from '../../services/user.service';
import { AddOwnerComponent } from '../add-owner/add-owner.component';
import { DateUpdateComponent } from '../date-update/date-update.component';
import { EndDateComponent } from '../end-date/end-date.component';
import { ExportService } from '../export/export.service';
import { TestComponent } from '../test/test.component';
import { UserStatusComponent } from '../user-status/user-status.component';
import { EndDateSearchComponent } from './end-date-search.component';
import { StartDateSearchComponent } from './start-date-search.component';

@Component({
  selector: 'ngx-user-list-search',
  templateUrl: './user-list-search.component.html',
  styleUrls: ['./user-list-search.component.scss']
})

export class UserListSearchComponent implements OnInit {
  baseurl = environment.baseAPIURL;
  public masterForm: FormGroup;
  public _Users: UserModel[];
  public _User: UserModel;
  public _user: UserModel;
  message:string;
  arrowButton:boolean = true;
  tablearrowButton:boolean = false;
  tablearrowheaderButton:boolean = false;
  public _FilterModel: FilterModel;

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
          title: '<span class= "edit">edit</span>',
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
        renderComponent: StartDateSearchComponent
      },
      EndDate: {
        title: 'EndDate',
        type: 'custom',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: EndDateSearchComponent
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
    private formBuilder: FormBuilder,
    private exportService:ExportService) {
    this._User = new UserModel();
    this._FilterModel = new FilterModel();
    this._user = new UserModel();
  }

  ngOnInit(): void {
    this.fromCreate();
    //this.getAllUsers();
  }
  onCustom(event): void {
    if (event.action === 'status') {
      localStorage.setItem('userId', event.data.Id);
      this.open(event.data);
    }
    if (event.action === 'edit') {
      this.router.navigate(['/easy/task/edit-user/' + event.data.Id]);
    }
    if (event.action === 'inlineedit') {
      this.onUserRowSelect(event);
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
    this.router.navigate(['/easy/task/add-user']);
  }  

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

  onUserRowSelect(event): void {
    this.table.grid.getSelectedRows().forEach((row) => {
      this.table.grid.edit(row);
      console.log(event);
    });
}

arrowButtonFunction(){
  this.arrowButton = !this.arrowButton;
}
tableArrowButtonFunction(){
  this.tablearrowButton = !this.tablearrowButton;
}

searchUserList(){
  const busData = {
    BusinessData: this._FilterModel
  }


  this._UserService.commonPost('Task/GetSearchUsers' ,busData)
    .subscribe(
      response => {
        this.source.load([]);
        this._Users = JSON.parse(JSON.stringify(response));
        this.source.load(this._Users);
        this._influxToastaService.showToast('success', 'Response', 'User Fetch Successfully');
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );

  this.arrowButton = !this.arrowButton;
  this.tablearrowButton = true;
  this.tablearrowheaderButton = true;
}

fromCreate() {
  this.masterForm = this.formBuilder.group({
    StartDate: ['', [Validators.required]],
    EndDate: ['', [Validators.required]]
  });
}

// get fval() {
//   return this.masterForm.controls;
// }


// onSaveUser() {

//   if (this.masterForm.invalid) {
//     return;
//   }

//   const busData = {
//     BusinessData: this._user
//   }


//   this._UserService.commonPost('Task/SaveUser' ,busData)
//     .subscribe(
//       response => {
        
//         this._influxToastaService.showToast('success', 'Response', response.toString());
//         this.router.navigate(['/easy/task/user-demo']);                
//       },
//       error => {

//       },
//       () => {
//         // No errors, route to new page
//       }
//     );
// }

}
