import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
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

  getFromPhoto() {
    const options: ImagePickerOptions = {
      allow_video: false,
      outputType: 1,
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (const result of results) {
        console.log('Image Data URI: ' + result);
      }
    }, (err) => {
      console.log('ImagePicker issue: ' + err);
    });
  }

  takePicture() {
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

}
