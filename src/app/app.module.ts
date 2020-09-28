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
import { DataTablesModule } from 'angular-datatables';

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
import { ProfessionComponent } from './components/client/profession/profession.component';
import { ProfessionSaveComponent } from './components/client/profession/profession-save/profession-save.component';
import { EmailDomainComponent } from './components/client/email-domain/email-domain.component';
import { EmailDomainSaveComponent } from './components/client/email-domain/email-domain-save/email-domain-save.component';
import { ClientInfoSaveComponent } from './components/client/client-info-save/client-info-save.component';
import { ClientInfoComponent } from './components/client/client-info/client-info.component';
import { CarGradeComponent } from './components/vehicle/car-grade/car-grade.component';
import { CarGradeSaveComponent } from './components/vehicle/car-grade/car-grade-save/car-grade-save.component';
import { CarModelComponent } from './components/vehicle/car-model/car-model.component';
import { CarModelSaveComponent } from './components/vehicle/car-model/car-model-save/car-model-save.component';
import { CarCompanyComponent } from './components/vehicle/car-company/car-company.component';
import { CarCompanySaveComponent } from './components/vehicle/car-company/car-company-save/car-company-save.component';
import { CarStockDetailsComponent } from './components/vehicle/carStockDetails/car-stock-details.component';
import { CarStockDetailSaveComponent } from './components/vehicle/carStockDetails/car-stock-detail-save/car-stock-detail-save.component';
import { ColorComponent } from './components/vehicle/color/color.component';
import { ColorSaveComponent } from './components/vehicle/color/color-save/color-save.component';

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
    AuthorisedSideNavComponent,
    ProfessionComponent,
    ProfessionSaveComponent,
    EmailDomainComponent,
    EmailDomainSaveComponent,
    ClientInfoSaveComponent,
    ClientInfoComponent,
    CarGradeComponent,
    CarGradeSaveComponent,
    CarModelComponent,
    CarModelSaveComponent,
    CarCompanyComponent,
    CarCompanySaveComponent,
    CarStockDetailsComponent,
    CarStockDetailSaveComponent,
    ColorComponent,
    ColorSaveComponent
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
    DataTablesModule,
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
