import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductStockPageRoutingModule } from './product-stock-routing.module';

import { ProductStockPage } from './product-stock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductStockPageRoutingModule
  ],
  declarations: [ProductStockPage]
})
export class ProductStockPageModule {}
