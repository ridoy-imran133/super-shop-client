import { NgModule } from '@angular/core';
import { NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbRouteTabsetModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTimepickerModule } from '@nebular/theme';
import { NbIconModule, NbPopoverModule, NbSearchModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

@NgModule({
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    ReportsRoutingModule,
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
    ReportsComponent,
    SalesReportComponent,
    // CustomerSalesComponent,
    // QuantityEditComponent
  ],
})
export class SalesModule { }
