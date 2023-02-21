import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';

import { MENU_ITEMS } from './shop-menu';

@Component({
  selector: 'ngx-shop',
  styleUrls: ['shop.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu1" [autoCollapse]="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class ShopComponent {
  menu1 = MENU_ITEMS;
}
