import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';

import { MENU_ITEMS } from './customers-menu';

@Component({
  selector: 'ngx-customers',
  styleUrls: ['customers.component.scss'],
  template: `
    <ngx-shop-column-layout>
      <nb-menu [items]="menu1" [autoCollapse]="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-shop-column-layout>
  `,
})
export class CustomersComponent {
  menu1 = MENU_ITEMS;
}
