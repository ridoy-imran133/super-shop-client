import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../authentication/auth.guard';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { AddTryOneComponent } from './add-try-one/add-try-one.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { DateUpdateComponent } from './date-update/date-update.component';
import { ItTeamListComponent } from './it-team-list/it-team-list.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { TaskLogintestComponent } from './task-logintest/task-logintest.component';
import { TaskComponent } from './task.component';
import { TestTestComponent } from './test-test/test-test.component';
import { TestComponent } from './test/test.component';
import { TryOneComponent } from './try-one/try-one.component';
import { UserListSearchComponent } from './user-list-search/user-list-search.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [{
  path: '',
  component: TaskComponent,
  children: [
    {
      path: 'user-demo',
      component: UserListComponent
    },
    {
      path: 'dashboard',
      component: DashBoardComponent
    },
    {
      path: 'user-demo-search',
      component: UserListSearchComponent
    },
    {
      path: 'add-user',
      component: AddUserComponent
    },
    {
      path: 'edit-user/:auid',
      component: AddUserComponent
    },
    {
      path: 'it-team',
      component: ItTeamListComponent
    },
    {
      path: 'owner',
      component: OwnerListComponent
     },
     {
      path: 'add-owner',
      component: AddOwnerComponent
    },
    {
      path: 'date-update/:date',
      component: DateUpdateComponent
    },
    {
      path: 'test/:date',
      component: TestComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'add-try',
      component: AddTryOneComponent
    },
    {
      path: 'try-list',
      component: TryOneComponent
    },
    {
      path: 'auto',
      component: AutoCompleteComponent
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule { }
