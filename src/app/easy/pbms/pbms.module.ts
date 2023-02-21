import { NgModule } from '@angular/core';
import { NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbRouteTabsetModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbTimepickerModule } from '@nebular/theme';
import { NbIconModule, NbPopoverModule, NbSearchModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PbmsComponent } from './pbms.component';
import { PbmsRoutingModule } from './pbms-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeetGreetComponent } from './meet-greet/meet-greet.component';
import { PickDropComponent } from './pick-drop/pick-drop.component';
import { BirthdayCakeComponent } from './birthday-cake/birthday-cake.component';
import { SkyLoungeComponent } from './sky-lounge/sky-lounge.component';
import { MeetGreetPendingComponent } from './meet-greet/meet-greet-pending/meet-greet-pending.component';
import { MeetGteetSuccessComponent } from './meet-greet/meet-gteet-success/meet-gteet-success.component';
import { AddMeetGteetComponent } from './meet-greet/add-meet-gteet/add-meet-gteet.component';
import { VasServiceComponent } from './vas-service/vas-service.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { GenerateRequestComponent } from './generate-request/generate-request.component';
import { AddRequestComponent } from './generate-request/add-request/add-request.component';
import { AddMgApprovalComponent } from './meet-greet/meet-greet-pending/add-mg-approval/add-mg-approval.component';
import { CustHistoryComponent } from './generate-request/cust-history/cust-history.component';
import { RecomServiceApprovalComponent } from './pick-drop/recom-service-approval/recom-service-approval.component';
import { PendingServiceApprovalComponent } from './pick-drop/pending-service-approval/pending-service-approval.component';
import { AddPickDropComponent } from './pick-drop/add-pick-drop/add-pick-drop.component';
import { AddBirthdayComponent } from './generate-request/add-birthday/add-birthday.component';
import { VendorComponent } from './vendor/vendor.component';
import { AddVendorComponent } from './vendor/add-vendor/add-vendor.component';
import { CheckBoxComponent } from './generate-request/check-box/check-box.component';
import { AddSkyLoungeComponent } from './sky-lounge/add-sky-lounge/add-sky-lounge.component';
import { CustProfileComponent } from './cust-profile/cust-profile.component';
import { UserWiseServiceRequestComponent } from './user-wise-service-request/user-wise-service-request.component';
import { EditCustomerComponent } from './generate-request/edit-customer/edit-customer.component';
import { EditCustomerDetailsComponent } from './generate-request/edit-customer/edit-customer-details/edit-customer-details.component';
import { BankingInfoComponent } from './generate-request/edit-customer/edit-customer-details/banking-info/banking-info.component';
import { LifeStyleInfoComponent } from './generate-request/edit-customer/edit-customer-details/lifeStyle-info/lifestyle-info.component';
import { RmChangeComponent } from './rm-change/rm-change.component';
import { UpdateRmComponent } from './generate-request/update-rm/update-rm.component';
import { RmUpdateComponent } from './rm-change/rm-update/rm-update.component';
import { RequestButtonComponent } from './generate-request/request-button/request-button.component';
import { PersonalInfoComponent } from './generate-request/edit-customer/edit-customer-details/personal-info/personal-info.component';
import { ReportComponent } from './report/report.component';
import { TestModalComponent } from './test-modal/test-modal.component';
import { EditCustomerModalComponent } from './generate-request/edit-customer/edit-customer-modal/edit-customer-modal.component';
import { CustomDirectiveModule } from '../_directives/custom.directive.module';
import { CustomerBirthdayComponent } from './customer-birthday/customer-birthday.component';
import { AddBirthgiftComponent } from './customer-birthday/add-birthgift/add-birthgift.component';
import { GiftComponent } from './gift/gift.component';
import { AirLineComponent } from './air-line/air-line.component';
import { AddGiftComponent } from './gift/add-gift/add-gift.component';
import { DonutChartComponent } from './dashboard/donut-chart/donut-chart.component';
import { PieComponent } from './dashboard/pie/pie.component';
import { MeetGreetChartComponent } from './dashboard/meet-greet-chart/meet-greet-chart.component';
import { PickDropChartComponent } from './dashboard/pick-drop-chart/pick-drop-chart.component';
import { SkyLoungeChartComponent } from './dashboard/sky-lounge-chart/sky-lounge-chart.component';
import { BirthdayCakeChartComponent } from './dashboard/birthday-cake-chart/birthday-cake-chart.component';
import { LogInComponent } from './log-in/log-in.component';


@NgModule({
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    PbmsRoutingModule,
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
    NbContextMenuModule,
    CustomDirectiveModule
  ],
  declarations: [
    PbmsComponent,
    DashboardComponent,
    MeetGreetComponent,
    PickDropComponent,
    BirthdayCakeComponent,
    SkyLoungeComponent,
    MeetGreetPendingComponent,
    MeetGteetSuccessComponent,
    AddMeetGteetComponent,
    VasServiceComponent,
    MasterDataComponent,
    GenerateRequestComponent,
    AddRequestComponent,
    AddMgApprovalComponent,
    AddPickDropComponent,
    PendingServiceApprovalComponent,
    CustHistoryComponent,
    BankingInfoComponent,
    RecomServiceApprovalComponent,
    PendingServiceApprovalComponent,
    AddPickDropComponent,
    AddBirthdayComponent,
    VendorComponent,
    AddVendorComponent,
    CheckBoxComponent,
    AddSkyLoungeComponent,
    CustProfileComponent,
    UserWiseServiceRequestComponent,
    EditCustomerComponent,
    EditCustomerDetailsComponent,
    LifeStyleInfoComponent,
    RmChangeComponent,
    UpdateRmComponent,
    RmUpdateComponent,
    PersonalInfoComponent,
    RequestButtonComponent,
    ReportComponent,
    TestModalComponent,
    EditCustomerModalComponent,
    CustomerBirthdayComponent,
    AddBirthgiftComponent,
    GiftComponent,
    AirLineComponent,
    AddGiftComponent,
    DonutChartComponent,
    PieComponent,
    MeetGreetChartComponent,
    PickDropChartComponent,
    SkyLoungeChartComponent,
    BirthdayCakeChartComponent,
    LogInComponent

  ],
})
export class PbmsModule { }
