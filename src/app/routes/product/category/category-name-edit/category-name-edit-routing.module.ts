import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryNameEditPage } from './category-name-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryNameEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryNameEditPageRoutingModule {}
