import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { environment } from '../../../../environments/environment';
import { TestTable } from '../../models/TestTable';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-try-one',
  templateUrl: './try-one.component.html',
  styleUrls: ['./try-one.component.scss']
})
export class TryOneComponent implements OnInit {
  baseurl = environment.baseAPIURL;
  public _testTable: TestTable[];
  public _test: TestTable;
  source: LocalDataSource = new LocalDataSource();
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
      Value: {
        title: 'Value',
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
  constructor(private _UserService: UserService) {
    this._test = new TestTable();
   }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this._UserService.commonGet('Task/GetAllTestData')
      .subscribe(
        response => {
          this.source.load([]);
          this._testTable = JSON.parse(JSON.stringify(response));
          this.source.load(this._testTable);
          
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

  addUser() {
    // const dialogRef = this.dialogService.open(AddUserComponent, {
    //   context: {
    //     id: null
    //   },
    // });
    // dialogRef.onClose.subscribe(val => {
    //   if(val != null){
    //     this.source.append(val);
    //   }
    // });
  } 
  onCustom(event): void {
    if (event.action === 'status') {
      localStorage.setItem('userId', event.data.Id);
    }
    if (event.action === 'edit') {
      //this.router.navigate(['/easy/task/edit-user/' + event.data.Id]);
      // this.editUser(event.data, event.data.Id);
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

}
