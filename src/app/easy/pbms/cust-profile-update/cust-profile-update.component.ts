import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-cust-profile-update',
  templateUrl: './cust-profile-update.component.html',
  styleUrls: ['./cust-profile-update.component.scss']
})
export class CustProfileUpdateComponent implements OnInit {

  constructor(protected ref: NbDialogRef<CustProfileUpdateComponent>) { }

  ngOnInit(): void {
  }

  tabs: any[] = [
    {
      title: 'Personal Info',
      route: '/easy/pbms/profile-update/personal-info',
    },
    {
      title: 'Banking Info ',
      route: '/easy/pbms/profile-update/banking-info',
    },
    // {
    //   title: 'Success',
    //   route: '/easy/pbms/meet-greet/success',
    // },
  ];

  dismiss() {
    this.ref.close();
  }

}
