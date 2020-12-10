import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPage } from './category.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPage
  },
  {
    path: 'category-list',
    loadChildren: () => import('./category-list/category-list.module').then( m => m.CategoryListPageModule)
  },
  {
    path: 'category-add',
    loadChildren: () => import('./category-add/category-add.module').then( m => m.CategoryAddPageModule)
  },
  {
    path: 'category-edit',
    loadChildren: () => import('./category-edit/category-edit.module').then( m => m.CategoryEditPageModule)
  },
  {
    path: 'category-name-edit',
    loadChildren: () => import('./category-name-edit/category-name-edit.module').then( m => m.CategoryNameEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
