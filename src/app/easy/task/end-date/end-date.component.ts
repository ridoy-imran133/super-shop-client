import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UserService } from '../../services/user.service';
import { DateUpdateComponent } from '../date-update/date-update.component';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'ngx-end-date',
  templateUrl: './end-date.component.html',
  styleUrls: ['./end-date.component.scss']
})
export class EndDateComponent implements OnInit {

  @Input() value;
  name;

  constructor(private dialogService: NbDialogService,
    private _UserService: UserService,
    private comp: UserListComponent) { }

  ngOnInit() {
   this.name = new DatePipe('en-US').transform(this.value.EndDate, 'dd/MM/yyyy')
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
      // this.source.update(ele, {startDate: new DatePipe('en-US').transform(val.startDate, 'MM/dd/yyyy') ,endDate: new DatePipe('en-US').transform(val.endDate, 'MM/dd/yyyy')} );
      // this.source.refresh();
    });
  }

  sendMessage(val: any) {
    this.comp.test(this.value, val);
  }
}
