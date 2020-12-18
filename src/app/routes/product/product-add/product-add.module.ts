import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductAddPageRoutingModule } from './product-add-routing.module';
import { ProductAddPage } from './product-add.page';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductAddPageRoutingModule
  ],
  providers: [
    Camera,
    ImagePicker,
  ],
  declarations: [ProductAddPage]
})
export class ProductAddPageModule { }
