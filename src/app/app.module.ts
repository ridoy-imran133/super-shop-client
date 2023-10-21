/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbTimepickerModule,
  NbDialogModule,
  NbLayoutModule,
  NbMenuModule,
  NbPopoverModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbCardModule,
  NbCheckboxModule,
  NbButtonModule,
  NbIconModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BossInterceptor } from './authentication/interceptor';
import { BnNgIdleService } from 'bn-ng-idle';
import { MenuTokenComponent } from './authentication/menu-token.component';
import { LogInComponent } from './user-auth/log-in/log-in.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { InitialPageComponent } from './customers/initial-page/initial-page.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FirstDesignComponent } from './practice/first-design/first-design.component';
import { EmployeeLoginComponent } from './user-auth/employee-login/employee-login.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuTokenComponent,
    LogInComponent,
    RegisterComponent,
    FirstDesignComponent,
    EmployeeLoginComponent,
    // InitialPageComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NbEvaIconsModule,
    NbIconModule,
    NbLayoutModule,
    NbCardModule,
    NbPopoverModule,
    NbCheckboxModule,
    NbButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbTimepickerModule .forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: BossInterceptor, 
      multi: true }, BnNgIdleService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
