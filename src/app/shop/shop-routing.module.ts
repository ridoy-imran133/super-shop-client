import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShopComponent } from './shop.component';

const routes: Routes = [{
  path: '',
  component: ShopComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./setup/setup.module')
        .then(m => m.SetupModule),
    },
    {
      path: 'sales',
      loadChildren: () => import('./sales/sales.module')
        .then(m => m.SalesModule),
    },
    {
      path: 'reports',
      loadChildren: () => import('./Reports/reports.module')
        .then(m => m.ReportsModule),
    },
    {
      path: 'auth',
      loadChildren: () => import('./security/security.module')
        .then(m => m.SecurityModule),
    },
    // {
    //   path: 'pbms',
    //   loadChildren: () => import('./pbms/pbms.module')
    //     .then(m => m.PbmsModule),
    // },
    {
      path: '',
      redirectTo: '',
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
export class ShopRoutingModule {
}
