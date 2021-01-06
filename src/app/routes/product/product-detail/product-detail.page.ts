import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, PopoverController, ToastController } from '@ionic/angular';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  private product: Product;
  private checkPrice = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.product = this.productService.getProductByBarcode(queryParams.barcode);
    });
  }

  ngOnInit() {
  }

  async onPresentPopover(event) {
    // const popover = await this.popoverController.create({
    //   component: PopoverPage,
    //   event: event,
    //   componentProps: { 'barcode': this.product.barcode },
    //   translucent: false,
    //   backdropDismiss: true
    // });
    // await popover.present();
  }

  async checkUser() {

  }

  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'ascCssShare',
      buttons: [{
        text: '好友',
        icon: 'logo-wechat',
        handler: () => {
          console.log('分享给微信好友');
        }
      }, {
        text: '朋友圈',
        icon: 'aperture-outline',
        handler: () => {
          console.log('分享到朋友圈');
        }
      }, {
        text: '短信',
        icon: 'mail',
        handler: () => {
          console.log('发送到短信');
        }
      }, {
        text: 'QQ',
        icon: 'logo-tux',
        handler: () => {
          console.log('分享到QQ');
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('cancel');
        }
      }]
    });
    await actionSheet.present();
  }


}
