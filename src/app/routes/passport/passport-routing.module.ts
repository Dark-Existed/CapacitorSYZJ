import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPage } from './signup/signup.page';

const routes: Routes = [
  {
    path: 'signup',
    // component: SignupPage
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
