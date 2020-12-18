import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductAddPage } from './product-add.page';

const routes: Routes = [
  {
    path: '',
    component: ProductAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAddPageRoutingModule {}
