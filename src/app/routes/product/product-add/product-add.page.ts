import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {

  constructor(
    private camera: Camera,
    private imagePicker: ImagePicker,
    private barcodeScanner: BarcodeScanner,
    private actionSheetController: ActionSheetController
  ) { }

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
        console.log('Image Data URI: ' + result);
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
      console.log(imageData);
    }, (err) => {
      console.log('Camera issue: ' + err);
    });
  }

  async onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  onSave(continues = false) {

  }

}
