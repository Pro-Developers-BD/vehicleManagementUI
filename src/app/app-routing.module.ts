import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login';
import {HomeComponent} from './components/layout/home/home.component';
import {ProfessionSaveComponent} from './components/client/profession/profession-save/profession-save.component';
import {ProfessionComponent} from './components/client/profession/profession.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profession/save', component: ProfessionSaveComponent},
  {path: 'profession/save/:id', component: ProfessionSaveComponent},
  {path: 'profession/list', component: ProfessionComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
