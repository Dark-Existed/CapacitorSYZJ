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
    const alert = await this.alertController.create({
      header: '删除',
      message: '确定删除该商品信息？',
      cssClass: 'twoBtn',
      buttons: [{
        text: '确定',
        handler: async () => {
          const temp = this.productService.deleteProductByBarcode(this.barcode);
          if (temp === true) {
            const toast = await this.toastController.create({
              message: '删除成功',
              duration: 2000,
            });
            await toast.present();
            this.navController.navigateForward('/product-list');
          } else {
            const toast = await this.toastController.create({
              message: '删除失败',
              duration: 2000,
            });
            await toast.present();
          }
        }
      }, {
        text: '取消',
        handler: () => {
          console.log('cancel');
        }
      }]
    });
    await alert.present();
    this.popoverController.dismiss();
  }

  async editProduct() {
    this.popoverController.dismiss();
  }

}
