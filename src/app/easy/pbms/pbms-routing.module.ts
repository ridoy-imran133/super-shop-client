import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirLineComponent } from './air-line/air-line.component';
import { BirthdayCakeComponent } from './birthday-cake/birthday-cake.component';
import { CustomerBirthdayComponent } from './customer-birthday/customer-birthday.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BankingInfoComponent } from './generate-request/edit-customer/edit-customer-details/banking-info/banking-info.component';
import { EditCustomerDetailsComponent } from './generate-request/edit-customer/edit-customer-details/edit-customer-details.component';
import { GenerateRequestComponent } from './generate-request/generate-request.component';
import { GiftComponent } from './gift/gift.component';
import { LogInComponent } from './log-in/log-in.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { MeetGreetPendingComponent } from './meet-greet/meet-greet-pending/meet-greet-pending.component';
import { MeetGreetComponent } from './meet-greet/meet-greet.component';
import { MeetGteetSuccessComponent } from './meet-greet/meet-gteet-success/meet-gteet-success.component';
import { PbmsComponent } from './pbms.component';
import { PickDropComponent } from './pick-drop/pick-drop.component';
import { ReportComponent } from './report/report.component';
import { RmChangeComponent } from './rm-change/rm-change.component';
import { SkyLoungeComponent } from './sky-lounge/sky-lounge.component';
import { TestModalComponent } from './test-modal/test-modal.component';
import { UserWiseServiceRequestComponent } from './user-wise-service-request/user-wise-service-request.component';
import { VasServiceComponent } from './vas-service/vas-service.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [{
  path: '',
  component: PbmsComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'login',
      component: LogInComponent
    },
    {
      path: 'test-modal',
      component: TestModalComponent
    },
    {
      path: 'meet-greet',
      component: MeetGreetComponent,
      children: [
        {
          path: '',
          redirectTo: 'pending',
          pathMatch: 'full',
        },
        {
          path: 'pending',
          component: MeetGreetPendingComponent,
        },
        {
          path: 'success',
          component: MeetGteetSuccessComponent,
        },
      ],
    },
    {
      path: 'pick-drop',
      component: PickDropComponent
    },
    {
      path: 'birthday-cake',
      component: BirthdayCakeComponent
    },
    {
      path: 'sky-lounge',
      component: SkyLoungeComponent
    },
    {
      path: 'vas-service',
      component: VasServiceComponent
    },
    {
      path: 'master-data',
      component: MasterDataComponent
    },
    {
      path: 'generate-request',
      component: GenerateRequestComponent
    },
    {
      path: 'customer-birthday',
      component: CustomerBirthdayComponent
    },
    {
      path: 'generate-request/:birthday',
      component: GenerateRequestComponent
    },
    {
      path: 'vendor',
      component: VendorComponent
    },
    {
      path: 'gift',
      component: GiftComponent
    },
    {
      path: 'air-line',
      component: AirLineComponent
    },
    {
      path: 'all-service',
      component: UserWiseServiceRequestComponent
    },
    {
      path: 'rm-change',
      component: RmChangeComponent
    },
    {
      path: 'report',
      component: ReportComponent
    },
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
export class PbmsRoutingModule { }
