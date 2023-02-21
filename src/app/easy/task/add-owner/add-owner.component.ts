import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../services/user.service';
import { DateUpdateComponent } from '../date-update/date-update.component';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'ngx-add-owner',
  //template: `<a href="#" onclick="javascript:onCustom()"><i class="fa fa-search"></i>{{name}}</a>`
   templateUrl: './add-owner.component.html',
   styleUrls: ['./add-owner.component.scss']
})
export class AddOwnerComponent implements OnInit{

  @Input() value;
  name;

  constructor(private dialogService: NbDialogService,
    private _UserService: UserService,
    private comp: UserListComponent) { }

  ngOnInit() {
   this.name = new DatePipe('en-US').transform(this.value.StartDate, 'dd/MM/yyyy')
  } 

  open1(event) {
    localStorage.setItem("userId", this.value.Id);
    const dialogRef = this.dialogService.open(DateUpdateComponent, {
      context: {
        title: 'Update Date',
      },
      closeOnBackdropClick: false,
    });
    dialogRef.onClose.subscribe(val => {
      this.sendMessage(val);
    });
  }

  sendMessage(val: any) {
    this.comp.test(this.value, val);
  }
}
