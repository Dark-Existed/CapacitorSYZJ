import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuidePageRoutingModule } from './guide-routing.module';

import { GuidePage } from './guide.page';
import { Share } from '@capacitor/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    GuidePageRoutingModule
  ],
  declarations: [GuidePage]
})
export class GuidePageModule {
}
