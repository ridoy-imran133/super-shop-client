import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table/lib/lib/data-source/local/local.data-source';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  source: LocalDataSource = new LocalDataSource(); 

  constructor() { }

  clearformdata(){
    this.source.load([]);
  }
  
}
