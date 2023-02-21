import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-cust-profile',
  templateUrl: './cust-profile.component.html',
  styleUrls: ['./cust-profile.component.scss']
})
export class CustProfileComponent implements OnInit {

  constructor(protected ref: NbDialogRef<CustProfileComponent>) { }

  ngOnInit(): void {
  }

}
