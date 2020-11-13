import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassportRoutingModule } from './passport-routing.module';
import { SignupPage } from './signup/signup.page';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [SignupPage],
  imports: [
    SharedModule,
    PassportRoutingModule
  ]
})
export class PassportModule { }
