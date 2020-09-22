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
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
