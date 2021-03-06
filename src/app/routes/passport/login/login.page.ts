import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, IonRouterOutlet, ToastController } from '@ionic/angular';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  username: string;
  password: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private passportService: PassportServiceService,
    private outlet: IonRouterOutlet,
  ) { }

  @ViewChild('accountInput') accountInput: IonInput;


  ngAfterViewInit() {
    this.fillHistoryUser();
  }

  fillHistoryUser() {
    const historyUser: string = this.passportService.getHistoryUser();
    this.username = historyUser;
  }

  async onLogin(form: NgForm) {
    const toast = await this.toastController.create({ duration: 2000 });
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
      const loginResult = this.passportService.confirmAccount(this.username, this.password);
      if (loginResult.success) {
        this.passportService.login(loginResult.result.userId, loginResult.result.loginType);
        toast.message = '登录成功';
        toast.present();
        this.outlet.pop(1);
        this.router.navigateByUrl('tabs');
      } else {
        toast.message = '账号或密码有误';
        toast.present();
      }
    }
  }

  onForgotPassword() {
    this.router.navigateByUrl('/passport/forget-password');
  }

}
