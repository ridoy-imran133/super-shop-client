import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../authentication/auth.guard';
import { EasyComponent } from './easy.component';

const routes: Routes = [{
  path: '',
  component: EasyComponent,
  children: [
    {
      path: 'task',
      loadChildren: () => import('./task/task.module')
        .then(m => m.TaskModule),
    },
    {
      path: 'pbms',
      loadChildren: () => import('./pbms/pbms.module')
        .then(m => m.PbmsModule),
    },
    {
      path: '',
      redirectTo: 'task',
      pathMatch: 'full',
    },
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule],
})
export class EasyRoutingModule {
}
