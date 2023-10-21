import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { SliderComponent } from './slider/slider.component';

const routes: Routes = [{
  path: '',
  component: CustomersComponent,
  children: [
    // {
    //   path: '',
    //   loadChildren: () => import('./setup/setup.module')
    //     .then(m => m.SetupModule),
    // },
    // {
    //   path: 'auth',
    //   loadChildren: () => import('./security/security.module')
    //     .then(m => m.SecurityModule),
    // },
    // {
    //   path: 'pbms',
    //   loadChildren: () => import('./pbms/pbms.module')
    //     .then(m => m.PbmsModule),
    // },
    { path: '', component: InitialPageComponent },
    { path: 'slider', component: SliderComponent },
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
export class CustomersRoutingModule {
}
