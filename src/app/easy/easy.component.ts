import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { environment } from '../../environments/environment';
import { LayoutService } from '../@core/utils';

import { MENU_ITEMS } from './easy-menu';
import { MenuFormatModel } from './models/MenuFormatModel';
import { MenuModel } from './models/MenuModel';
import { UserService } from './services/user.service';

@Component({
  selector: 'ngx-easy',
  styleUrls: ['easy.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu1" [autoCollapse]="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class EasyComponent {
  menu1 = MENU_ITEMS;
}
