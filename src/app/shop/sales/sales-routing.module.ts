import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales.component';
import { CustomerSalesComponent } from './customer-sales/customer-sales.component';

const routes: Routes = [{
  path: '',
  component: SalesComponent,
  children: [
    {
      path: '',
      component: CustomerSalesComponent
    }
    // {
    //   path: 'category',
    //   component: CategoryComponent
    // },
    // {
    //   path: 'sub-category',
    //   component: SubCategoryComponent
    // },
    // {
    //   path: 'product',
    //   component: ProductComponent
    // },
    // {
    //   path: 'outlet',
    //   component: OutletComponent
    // },
    // {
    //   path: 'qty-type',
    //   component: QtyTypeComponent
    // },
    // {
    //   path: 'brand',
    //   component: BrandComponent
    // },
    // {
    //   path: '',
    //   redirectTo: 'dashboard',
    //   pathMatch: 'full',
    // }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule { }
