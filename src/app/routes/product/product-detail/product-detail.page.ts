import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, PopoverController, ToastController } from '@ionic/angular';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { PopoverPage } from './popover/popover.page';

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
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private passportService: PassportServiceService,
  ) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.product = this.productService.getProductByBarcode(queryParams.barcode);
    });
  }

  ngOnInit() {
  }

  async onPresentPopover(presentEvent) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: presentEvent,
      componentProps: { barcode: this.product.barcode },
      translucent: false,
      backdropDismiss: true
    });
    await popover.present();
  }

  async checkUser() {
    const toast = await this.toastController.create({
      duration: 2000
    });
    const alert = await this.alertController.create({
      header: '请验证账号密码',
      cssClass: 'twoBtn',
      inputs: [{
        name: 'password',
        type: 'password',
        placeholder: '请输入密码'
      }],
      buttons: [{
        text: '确定',
        handler: (data) => {
          const currentUser = this.passportService.getCueerntUser();
          console.log(typeof data.password);
          const comfirmResult = this.passportService.confirmCurrentUser(currentUser.id, data.password);
          if (comfirmResult.success) {
            this.checkPrice = true;
          } else {
            toast.message = comfirmResult.result;
            toast.present();
          }
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('cancel');
        }
      }],
    });

    await alert.present();
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
