import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './authentication/login.component';
import { AuthGuard } from './authentication/auth.guard';
import { MenuTokenComponent } from './authentication/menu-token.component';
import { LogInComponent } from './user-auth/log-in/log-in.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { InitialPageComponent } from './customers/initial-page/initial-page.component';
import { FirstDesignComponent } from './practice/first-design/first-design.component';

export const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module')
      .then(m => m.ShopModule), canActivate: [AuthGuard]
  },
  {
    path: 'easy',
    loadChildren: () => import('./easy/easy.module')
      .then(m => m.EasyModule), canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customer.module')
      .then(m => m.CustomerModule)
  },
  {
    path: 'menu',
    component: MenuTokenComponent
  },  
  { path: 'first-design', component: FirstDesignComponent },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
