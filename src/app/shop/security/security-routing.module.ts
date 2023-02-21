import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ModuleComponent } from './module/module.component';
import { ProjectComponent } from './project/project.component';
import { RoleComponent } from './role/role.component';
import { SecurityComponent } from './security.component';

const routes: Routes = [{
  path: '',
  component: SecurityComponent,
  children: [
    {
      path: 'menu',
      component: MenuComponent
    },
    {
      path: 'project',
      component: ProjectComponent
    },
    {
      path: 'module',
      component: ModuleComponent
    },
    {
      path: 'role',
      component: RoleComponent
    },

    {
      path: '',
      redirectTo: 'menu',
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
