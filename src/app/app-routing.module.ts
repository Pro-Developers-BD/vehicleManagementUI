import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login';
import {HomeComponent} from './components/layout/home/home.component';
import {ProfessionSaveComponent} from './components/client/profession/profession-save/profession-save.component';
import {ProfessionComponent} from './components/client/profession/profession.component';
import {EmailDomainSaveComponent} from './components/client/email-domain/email-domain-save/email-domain-save.component';
import {EmailDomainComponent} from './components/client/email-domain/email-domain.component';
import {ClientInfoComponent} from './components/client/client-info/client-info.component';
import {ClientInfoSaveComponent} from './components/client/client-info-save/client-info-save.component';
import {CarGradeComponent} from './components/vehicle/car-grade/car-grade.component';
import {CarGradeSaveComponent} from './components/vehicle/car-grade/car-grade-save/car-grade-save.component';
import {CarModelComponent} from './components/vehicle/car-model/car-model.component';
import {CarModelSaveComponent} from './components/vehicle/car-model/car-model-save/car-model-save.component';
import {CarCompanyComponent} from './components/vehicle/car-company/car-company.component';
import {CarCompanySaveComponent} from './components/vehicle/car-company/car-company-save/car-company-save.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profession/save', component: ProfessionSaveComponent},
  {path: 'profession/save/:id', component: ProfessionSaveComponent},
  {path: 'profession/list', component: ProfessionComponent},
  {path: 'emailDomain/save', component: EmailDomainSaveComponent},
  {path: 'emailDomain/save/:id', component: EmailDomainSaveComponent},
  {path: 'emailDomain/list', component: EmailDomainComponent},
  {path: 'client/list', component: ClientInfoComponent},
  {path: 'client/save', component: ClientInfoSaveComponent},
  {path: 'client/save/:id', component: ClientInfoSaveComponent},
  {path: 'carGrade/list', component: CarGradeComponent},
  {path: 'carGrade/save', component: CarGradeSaveComponent},
  {path: 'carGrade/save/:id', component: CarGradeSaveComponent},
  {path: 'carModel/list', component: CarModelComponent},
  {path: 'carModel/save', component: CarModelSaveComponent},
  {path: 'carModel/save/:id', component: CarModelSaveComponent},
  {path: 'carCompany/list', component: CarCompanyComponent},
  {path: 'carCompany/save', component: CarCompanySaveComponent},
  {path: 'carCompany/save/:id', component: CarCompanySaveComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
