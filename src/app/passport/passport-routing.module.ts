import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPage } from './signup/signup.page';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
