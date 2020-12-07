import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocalStorageService } from './services/local-storage.service';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDirective } from './directives/confirm.directive';



@NgModule({
  declarations: [
    CopyrightComponent,
    ConfirmDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule
  ],
  providers: [
    LocalStorageService
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmDirective,
    CopyrightComponent
  ]
})
export class SharedModule { }
