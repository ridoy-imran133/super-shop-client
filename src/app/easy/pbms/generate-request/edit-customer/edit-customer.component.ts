import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NbContextMenuDirective, NbDialogService } from '@nebular/theme';
import { UserListSearchComponent } from '../../../task/user-list-search/user-list-search.component';
import { GenerateRequestComponent } from '../generate-request.component';
import { EditCustomerDetailsComponent } from './edit-customer-details/edit-customer-details.component';

@Component({
  selector: 'ngx-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  @Input() value;
  displayStyle = "none";
  // @ViewChild(NbContextMenuDirective) contextMenu: NbContextMenuDirective;
  constructor(private generaterequest: GenerateRequestComponent ) { }

  ngOnInit(): void {
  }

  items = [
    { title: 'Airport Meet and Greet' },
    { title: 'Airport Pick Up and Drop' },
    { title: 'Birthday Gift' },
    { title: 'Sky Lounge' },
  ];

  open() {
    // this.contextMenu.hide();
    // this.contextMenu.show();
    return false;
  }

  //@HostListener('document:click')
  close() {
    //this.contextMenu.hide();
  }

  // editCustomer(){
  //   alert(this.value.customer_name);
  // }

  editCustomer() {
    this.generaterequest.customerprofilepopup(this.value);
    // const dialogRef = this.dialogService.open(EditCustomerDetailsComponent, {
    //   context: {
    //     _customerInfo: this.value
    //   },
    // });
    // dialogRef.onClose.subscribe(val => {
    //   if(val != null){
    //   }
    // });
  }

}
