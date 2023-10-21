import { NgModule } from '@angular/core';
import { NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbRouteTabsetModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTimepickerModule } from '@nebular/theme';
import { NbIconModule, NbPopoverModule, NbSearchModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityComponent } from './security.component';
import { SetupRoutingModule } from './security-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ProjectComponent } from './project/project.component';
import { ModuleComponent } from './module/module.component';
import { RoleComponent } from './role/role.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee/add-employee.component';


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
    SecurityComponent,
    MenuComponent,
    ProjectComponent,
    ModuleComponent,
    RoleComponent,
    EmployeeComponent,
    AddEmployeeComponent
  ],
})
export class SecurityModule { }
