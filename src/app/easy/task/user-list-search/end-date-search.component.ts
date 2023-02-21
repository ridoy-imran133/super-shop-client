import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../services/user.service';
import { DateUpdateComponent } from '../date-update/date-update.component';
import { UserListSearchComponent } from './user-list-search.component';

@Component({
  selector: 'ngx-end-date-search',
  template: `<span (click)="open1($event)" style="color: blue; text-decoration: underline; cursor: pointer;"><i>{{name}}</i></span>`
})
export class EndDateSearchComponent implements OnInit, AfterViewInit{

  @Input() value;
  name;

  constructor(private dialogService: NbDialogService,
    private _UserService: UserService,
    private comp: UserListSearchComponent) { }

  ngOnInit() {
   this.name = new DatePipe('en-US').transform(this.value.EndDate, 'dd/MM/yyyy')
  } 

  open1(event) {
    localStorage.setItem("userId", this.value.id);
    const dialogRef = this.dialogService.open(DateUpdateComponent, {
      context: {
        title: 'Update Date',
      },
      closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(val => {
      this.sendMessage(val);
      // this.source.update(ele, {startDate: new DatePipe('en-US').transform(val.startDate, 'MM/dd/yyyy') ,endDate: new DatePipe('en-US').transform(val.endDate, 'MM/dd/yyyy')} );
      // this.source.refresh();
    });
  }

  sendMessage(val: any) {
    this.comp.test(this.value, val);
  }

  ngAfterViewInit(){

  }
}
