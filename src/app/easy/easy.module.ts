import { NgModule } from '@angular/core';
import { NbIconModule, NbMenuModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { EasyComponent } from './easy.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EasyRoutingModule } from './easy-routing.module';

@NgModule({
  imports: [
    EasyRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSelectModule
  ],
  declarations: [
    EasyComponent
  ],
})
export class EasyModule {
}
