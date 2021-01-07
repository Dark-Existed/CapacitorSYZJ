import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductStockPage } from './product-stock.page';

const routes: Routes = [
  {
    path: '',
    component: ProductStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductStockPageRoutingModule {}
