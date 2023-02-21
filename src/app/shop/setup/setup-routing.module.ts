import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OutletComponent } from './outlet/outlet.component';
import { ProductComponent } from './product/product.component';
import { QtyTypeComponent } from './qty-type/qty-type.component';
import { SetupComponent } from './setup.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [{
  path: '',
  component: SetupComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'category',
      component: CategoryComponent
    },
    {
      path: 'sub-category',
      component: SubCategoryComponent
    },
    {
      path: 'product',
      component: ProductComponent
    },
    {
      path: 'outlet',
      component: OutletComponent
    },
    {
      path: 'qty-type',
      component: QtyTypeComponent
    },
    {
      path: 'brand',
      component: BrandComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    // {
    //   path: 'meet-greet',
    //   component: MeetGreetComponent,
    //   children: [
    //     {
    //       path: '',
    //       redirectTo: 'pending',
    //       pathMatch: 'full',
    //     },
    //     {
    //       path: 'pending',
    //       component: MeetGreetPendingComponent,
    //     },
    //     {
    //       path: 'success',
    //       component: MeetGteetSuccessComponent,
    //     },
    //   ],
    // },
    // {
    //   path: 'pick-drop',
    //   component: PickDropComponent
    // },
    // {
    //   path: 'birthday-cake',
    //   component: BirthdayCakeComponent
    // },
    // {
    //   path: 'sky-lounge',
    //   component: SkyLoungeComponent
    // },
    // {
    //   path: 'vas-service',
    //   component: VasServiceComponent
    // },
    // {
    //   path: 'master-data',
    //   component: MasterDataComponent
    // },
    // {
    //   path: 'generate-request',
    //   component: GenerateRequestComponent
    // },
    // {
    //   path: 'customer-birthday',
    //   component: CustomerBirthdayComponent
    // },
    // {
    //   path: 'generate-request/:birthday',
    //   component: GenerateRequestComponent
    // },
    // {
    //   path: 'vendor',
    //   component: VendorComponent
    // },
    // {
    //   path: 'gift',
    //   component: GiftComponent
    // },
    // {
    //   path: 'air-line',
    //   component: AirLineComponent
    // },
    // {
    //   path: 'all-service',
    //   component: UserWiseServiceRequestComponent
    // },
    // {
    //   path: 'rm-change',
    //   component: RmChangeComponent
    // },
    // {
    //   path: 'report',
    //   component: ReportComponent
    // },
    // {
    //   path: 'profile',
    //   component: EditCustomerDetailsComponent,
    //   children: [
    //     {
    //       path: '',
    //       redirectTo: 'personal-info',
    //       pathMatch: 'full',
    //     },
    //     {
    //       path: 'banking-info',
    //       component: BankingInfoComponent,
    //     }
    //     ,
    //     {
    //       path: 'personal-info',
    //       component: BankingInfoComponent,
    //     }
    //   ],
    // },
    // {
    //   path: 'profile-update',
    //   component: CustProfileUpdateComponent,
    //   children: [
    //     {
    //       path: '',
    //       redirectTo: 'personal-info',
    //       pathMatch: 'full',
    //     },
    //     {
    //       path: 'banking-info',
    //       component: BankingInfoComponent,
    //     },
    //     {
    //       path: 'personal-info',
    //       component: PersonalInfoComponent,
    //     }
    //   ],
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule { }
