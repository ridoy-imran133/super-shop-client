import { NgModule } from '@angular/core';
import { NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbRouteTabsetModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTimepickerModule } from '@nebular/theme';
import { NbIconModule, NbPopoverModule, NbSearchModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesComponent } from './sales.component';
import { SetupRoutingModule } from './sales-routing.module';
import { CustomerSalesComponent } from './customer-sales/customer-sales.component';
import { QuantityEditComponent } from './customer-sales/custom-box/quntity-edit.component';

@NgModule({
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    SetupRoutingModule,
    Ng2SmartTableModule,
    NbCalendarModule,
    NbInputModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NbAutocompleteModule,    
    NbTabsetModule,
    NbRouteTabsetModule,
    NbSpinnerModule,
    NbContextMenuModule
  ],
  declarations: [
    SalesComponent,
    CustomerSalesComponent,
    QuantityEditComponent
  ],
})
export class SalesModule { }
