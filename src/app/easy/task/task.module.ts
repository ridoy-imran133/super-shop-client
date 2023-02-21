import { NgModule } from '@angular/core';
import { NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbSelectModule, NbTimepickerModule } from '@nebular/theme';
import { NbIconModule, NbPopoverModule, NbSearchModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItTeamListComponent } from './it-team-list/it-team-list.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { DialogNamePromptComponent } from './dialog-name-prompt/dialog-name-prompt.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DateUpdateComponent } from './date-update/date-update.component';
import { TestComponent } from './test/test.component';
import { EndDateComponent } from './end-date/end-date.component';
import { TestTestComponent } from './test-test/test-test.component';
import { TaskLogintestComponent } from './task-logintest/task-logintest.component';
import { UserListSearchComponent } from './user-list-search/user-list-search.component';
import { StartDateSearchComponent } from './user-list-search/start-date-search.component';
import { PopOverComponent } from './user-list/pop-over/pop-over.component';
import { TestTetsteygeyrComponent } from './test-tetsteygeyr/test-tetsteygeyr.component';
import { TryOneComponent } from './try-one/try-one.component';
import { AddTryOneComponent } from './add-try-one/add-try-one.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

@NgModule({
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    TaskRoutingModule,
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
    NbAutocompleteModule
  ],
  declarations: [
    TaskComponent,
    ItTeamListComponent,
    AddOwnerComponent,
    OwnerListComponent,
    UserListComponent,
    UserStatusComponent,
    AddUserComponent,
    DateUpdateComponent,
    TestComponent,
    EndDateComponent,
    TestTestComponent,
    TaskLogintestComponent,
    DialogNamePromptComponent,
    UserListSearchComponent,
    StartDateSearchComponent,
    PopOverComponent,
    TestTetsteygeyrComponent,
    TryOneComponent,
    AddTryOneComponent,
    DashBoardComponent,
    AutoCompleteComponent
  ],
})
export class TaskModule { }
