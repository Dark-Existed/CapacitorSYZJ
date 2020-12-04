import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopEditPageRoutingModule } from './shop-edit-routing.module';

import { ShopEditPage } from './shop-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopEditPageRoutingModule
  ],
  declarations: [ShopEditPage]
})
export class ShopEditPageModule {}
