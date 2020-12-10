import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryAddPageRoutingModule } from './category-add-routing.module';

import { CategoryAddPage } from './category-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryAddPageRoutingModule
  ],
  declarations: [CategoryAddPage]
})
export class CategoryAddPageModule {}
