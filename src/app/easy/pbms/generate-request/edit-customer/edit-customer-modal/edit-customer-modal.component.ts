import { Component, OnInit } from '@angular/core';
import { CustomerUBS } from '../../../../models/CustomerUBS';

@Component({
  selector: 'ngx-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.scss']
})
export class EditCustomerModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  receivecall(_custinfo: CustomerUBS){
    alert(_custinfo.cust_no)
  }

}
