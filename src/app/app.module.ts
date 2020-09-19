import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { TopNavComponent } from './components/layout/authorised/top-nav/top-nav.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './_services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor, AppErrorHandler } from './_helpers';
import { SafePipe } from './_helpers/safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgSelectModule } from '@ng-select/ng-select';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeComponent } from './components/layout/home/home.component';
import { AuthorisedSideNavTogglerComponent } from './components/layout/authorised/authorised-side-nav-toggler/authorised-side-nav-toggler.component';
import { AuthorisedSideNavComponent } from './components/layout/authorised/authorised-side-nav/authorised-side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopNavComponent,
    LoginComponent,
    SafePipe,
    HomeComponent,
    AuthorisedSideNavTogglerComponent,
    AuthorisedSideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    ShareButtonsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AppErrorHandler},
    CookieService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
