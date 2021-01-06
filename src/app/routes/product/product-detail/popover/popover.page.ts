import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
  template:
    '<div style="display: flex; flex-direction: column;">' +
    '<ion-item (click)="editProduct()" lines="full"> \n' + '修改商品\n' + '</ion-item> \n' +
    '<ion-item (click)="DeleteProduct()"> \n' + '删除商品\n' + '</ion-item>' + '</div>'
})
export class PopoverPage implements OnInit {

  private barcode: string;

  constructor(
    private popoverController: PopoverController,
    private alertController: AlertController,
    private productService: ProductService,
    private toastController: ToastController,
    private navParams: NavParams,
    private navController: NavController) {
    this.barcode = this.navParams.data.barcode;
  }

  ngOnInit() {
  }

  async DeleteProduct() {

  }

  async editProduct() {

  }

}
