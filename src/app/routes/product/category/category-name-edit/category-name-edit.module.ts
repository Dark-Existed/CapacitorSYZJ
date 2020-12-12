import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryNameEditPageRoutingModule } from './category-name-edit-routing.module';

import { CategoryNameEditPage } from './category-name-edit.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CategoryNameEditPageRoutingModule
  ],
  declarations: [CategoryNameEditPage]
})
export class CategoryNameEditPageModule {}
