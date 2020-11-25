import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, IonSlides, ToastController } from '@ionic/angular';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';
import { AuthenticationCodeService } from '../shared/authentication-code.service';
import { SignupInfo } from './signupInfo';
import { from } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements AfterViewInit {

  constructor(
    private authentication: AuthenticationCodeService,
    private alertController: AlertController,
    private router: Router,
    private passportService: PassportServiceService,
    private toastController: ToastController,
    private outlet: IonRouterOutlet,
  ) { }


  @ViewChild('signupSlides') signupSlides: IonSlides;

  submited = false;
  codeValid = false;
  code: string;

  slideIndex = 0;

  emailFlag = true;
  shopNameFlag = true;
  passwordFlag = true;
  confirmPasswordFlag = true;

  signup: SignupInfo = {
    phone: '',
    email: '',
    shopName: '',
    password: '',
    confirmPassword: '',
    code: ''
  };

  codemessage = {
    content: '获取验证码',
    count: 0,
    maxcount: 3,
    flag: false,
    code: '',
    time: 60
  };

  onSubmitPhone(form: NgForm) {
    this.submited = true;
    if (form.valid) {
      this.onNext();
    }
  }

  ngAfterViewInit() {
    this.signupSlides.lockSwipeToNext(true);
    this.signupSlides.lockSwipeToPrev(true);
  }

  onSlideDidChange() {
    this.signupSlides.getActiveIndex().then((n) => {
      this.slideIndex = n;
    });
  }

  onNext() {
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slideNext();
    this.signupSlides.lockSwipeToNext(true);
  }

  onPrevious() {
    this.signupSlides.lockSwipeToPrev(false);
    this.signupSlides.slidePrev();
    this.signupSlides.lockSwipeToPrev(true);
  }

  getMessage() {
    this.authentication.getMessage();
  }


  // TODO 待完成
  async onSendSMS() {
    this.codemessage.flag = true;
    this.codemessage.count += 1;
    if (this.codemessage.count > this.codemessage.maxcount) {
      this.codemessage.content = ' 请稍后再试 ';
    } else {
      this.code = this.authentication.createCode(4);
    }
  }

  // TODO 待完成
  async onValidateCode(form: NgForm) {
    this.codeValid = true;
    this.onNext();
    // if (form.valid) {
    //   if (this.authentication.validate(this.signup.code)) {
    //     console.log('true');
    //     this.codeValid = true;
    //     this.onNext();
    //   } else {
    //     const alert = await this.alertController.create({
    //       header: '提示',
    //       message: '验证码不正确！',
    //       buttons: ['确定']
    //     });
    //     alert.present();
    //   }
    // }
  }

  validEmail() {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (this.signup.email.length < 5 || this.signup.email.length > 30 || !reg.test(this.signup.email)) {
      this.emailFlag = false;
    } else {
      this.emailFlag = true;
    }
  }

  validShopname() {
    if (this.signup.shopName.length >= 0 && this.signup.shopName.length < 12) {
      this.shopNameFlag = true;
    } else {
      this.shopNameFlag = false;
    }
  }

  vaildPassport() {
    const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
    if (this.signup.password.length < 6 || this.signup.password.length > 16 || !reg.test(this.signup.password)) {
      this.passwordFlag = false;
    } else {
      this.passwordFlag = true;
    }
  }

  validConfirmPassword() {
    this.confirmPasswordFlag = (this.signup.confirmPassword === this.signup.password);
  }

  async onSubmitAccount(accountForm: NgForm) {
    this.onNext();
  }


  async onSignup(event) {
    const result: AjaxResult = await this.passportService.addUser(this.signup);
    if (result.success) {
      const toast = await this.toastController.create({ duration: 3000 });
      toast.message = '账号注册成功';
      toast.present();
    } else {
      const toast = await this.toastController.create({ duration: 3000 });
      toast.message = '账号已注册';
      toast.present();
    }
  }

  onLogin(event) {
    this.outlet.pop(1);
    this.router.navigateByUrl('/passport/login');
  }

}
