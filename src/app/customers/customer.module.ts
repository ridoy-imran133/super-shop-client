import { NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { InitialPageComponent } from './initial-page/initial-page.component';

@NgModule({
  imports: [
    CustomersRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSelectModule
  ],
  declarations: [
    CustomersComponent,
    InitialPageComponent
  ],
})
export class CustomerModule {
}
