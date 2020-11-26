import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(
    private toastController: ToastController,
    private passportService: PassportServiceService,
  ) { }

  ngOnInit() {

  }


  async onLogin(form: NgForm) {
    const toast = await this.toastController.create({ duration: 3000 });
    const phonePattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/;
    const emailPattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (this.username == null) {
      toast.message = '请输入手机号码或邮箱';
      toast.present();
    } else if (!phonePattern.test(this.username) && !emailPattern.test(this.username)) {
      toast.message = '输入账号有误';
      toast.present();
    } else if (this.password == null) {
      toast.message = '请输入密码';
      toast.present();
    } else {
      const userId = this.passportService.confirmAccount(this.username, this.password);
      if (userId !== -1) {
        // TODO 写入当前登录账号 跳转页面
        toast.message = '登录成功';
        toast.present();
      } else {
        toast.message = '账号或密码有误';
        toast.present();
      }
    }
    // console.log(this.username);
  }

}
