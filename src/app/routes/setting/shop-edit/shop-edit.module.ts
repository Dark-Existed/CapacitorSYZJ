import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopEditPageRoutingModule } from './shop-edit-routing.module';

import { ShopEditPage } from './shop-edit.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ShopEditPageRoutingModule
  ],
  declarations: [ShopEditPage]
})
export class ShopEditPageModule {}
