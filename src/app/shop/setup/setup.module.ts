import { NgModule } from '@angular/core';
import { NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbRouteTabsetModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTimepickerModule } from '@nebular/theme';
import { NbIconModule, NbPopoverModule, NbSearchModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetupComponent } from './setup.component';
import { SetupRoutingModule } from './setup-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductComponent } from './product/product.component';
import { OutletComponent } from './outlet/outlet.component';
import { QtyTypeComponent } from './qty-type/qty-type.component';
import { BrandComponent } from './brand/brand.component';
import { AddSubCategoryComponent } from './sub-category/add-sub-category/add-sub-category.component';
import { AddOutletComponent } from './outlet/add-outlet/add-outlet.component';
import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { AddQtyTypeComponent } from './qty-type/add-qty-type/add-qty-type.component';
import { AddProductComponent } from './product/add-product/add-product.component';


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
    SetupComponent,
    DashboardComponent,
    CategoryComponent,
    AddCategoryComponent,
    SubCategoryComponent,
    ProductComponent,
    OutletComponent,
    QtyTypeComponent,
    BrandComponent,
    AddSubCategoryComponent,
    AddOutletComponent,
    AddBrandComponent,
    AddQtyTypeComponent,
    AddProductComponent
  ],
})
export class SetupModule { }
