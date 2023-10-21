import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path: 'sale',
      component: SalesReportComponent
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
export class ReportsRoutingModule { }
