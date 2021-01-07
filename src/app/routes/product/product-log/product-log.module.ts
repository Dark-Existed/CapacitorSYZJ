import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductLogPageRoutingModule } from './product-log-routing.module';

import { ProductLogPage } from './product-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductLogPageRoutingModule
  ],
  declarations: [ProductLogPage]
})
export class ProductLogPageModule {}
