import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {

  private product: Product;
  private subscription: Subscription;
  constructor(
    private zone: NgZone,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
  ) {
    this.product = new Product();
    this.productService.setParentCategoryIdByName(this.product);
    this.subscription = this.categoryService.watchCategory().subscribe(
      (activateCategory) => {
        this.product.categoryId = activateCategory.id;
        this.product.categoryName = activateCategory.name;
      }, (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '从相册添加',
          handler: () => {
            this.getFromPhoto();
          }
        },
        {
          text: '摄像头拍照',
          handler: () => {
            this.takePicture();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async getFromPhoto() {
    const options: ImagePickerOptions = {
      allow_video: false,
      outputType: OutputType.DATA_URL,
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (const result of results) {
        this.product.images.push('data:image/jpeg;base64,' + result);
      }
    }, (err) => {
      console.log('ImagePicker issue: ' + err);
    });
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.product.images.push('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      console.log('Camera issue: ' + err);
    });
  }

  async onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.product.barcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: '新增供货商',
      cssClass: 'twoBtn',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '输入供货商名称'
        },
        {
          name: 'phone',
          type: 'number',
          placeholder: '输入供货商电话',
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: '保存',
          handler: (data) => {
            this.zone.run(() => {
              this.product.supplier.name = data.name;
              this.product.supplier.phone = data.phone;
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async onSave(continues = false) {
    this.productService.insert(this.product);
    const toast = await this.toastController.create({
      duration: 2000
    });
    toast.message = '添加成功';
    toast.present();
    if (continues) {
      this.productService.resetProdect(this.product);
    } else {
      this.router.navigateByUrl('');
    }

  }

}
