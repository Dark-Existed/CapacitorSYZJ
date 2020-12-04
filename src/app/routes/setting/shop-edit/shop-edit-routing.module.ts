import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopEditPage } from './shop-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ShopEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopEditPageRoutingModule {}
