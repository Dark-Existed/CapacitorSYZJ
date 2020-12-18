import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StartAppGuard } from './core/start-app.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guide',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'guide',
    loadChildren: () => import('./routes/guide/guide.module').then(m => m.GuidePageModule),
    canActivate: [StartAppGuard]
  },
  {
    path: 'passport',
    loadChildren: () => import('./routes/passport/passport.module').then(m => m.PassportModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('./routes/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./routes/product/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'product-add',
    loadChildren: () => import('./routes/product/product-add/product-add.module').then( m => m.ProductAddPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
