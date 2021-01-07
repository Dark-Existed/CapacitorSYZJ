import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductLogPage } from './product-log.page';

const routes: Routes = [
  {
    path: '',
    component: ProductLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductLogPageRoutingModule {}
