import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryAddPage } from './category-add.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryAddPageRoutingModule {}
