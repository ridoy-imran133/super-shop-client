import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmTable } from '../../models/SmTable';

@Injectable({
  providedIn: 'root'
})

export class SmartTableService {
  abc: any;
  public _SmTable: SmTable;
  constructor() { 
    this._SmTable = new SmTable();
  }
  source: LocalDataSource = new LocalDataSource();
  public saveSmartTable(value: any): any{
    this.source.load(value);
    this.abc = value;
    var res = this.saveAsExcelFile();
    return res
    }
  
  // source: LocalDataSource = new LocalDataSource();
  public saveAsExcelFile(): any {
    var finalAns = [];
    var columnname = Object.keys(this.abc[1]);
    columnname.forEach(function(value){
      console.log(value);
      finalAns.push({
        [value]: {
          title: value
        },
      });
    });
    var res = this.save(finalAns);
    return res;
  }

  public save(_val: any): any {
    return this._SmTable.settings = {

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
      columns: _val,
      mode: 'external',
      // hideSubHeader: true,
      pager: {
        display: true,
        perPage: 10,
      },
    };
  }
}
