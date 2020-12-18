import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {

  constructor(
    private camera: Camera,
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

          }
        },
        {
          text: '摄像头拍照',
          handler: () => {

          }
        }
      ]
    });
    await actionSheet.present();
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
