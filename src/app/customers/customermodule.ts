import { NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  imports: [
    ShopRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSelectModule
  ],
  declarations: [
    ShopComponent
  ],
})
export class ShopModule {
}
