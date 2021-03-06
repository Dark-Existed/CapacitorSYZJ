import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonRouterOutlet, IonSlides, ToastController } from '@ionic/angular';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';
import { AuthenticationCodeService } from '../shared/authentication-code.service';
import { SignupInfo } from './signupInfo';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements AfterViewInit {

  constructor(
    private authentication: AuthenticationCodeService,
    private router: Router,
    private passportService: PassportServiceService,
    private toastController: ToastController,
    private outlet: IonRouterOutlet,
  ) { }


  @ViewChild('signupSlides') signupSlides: IonSlides;

  submited = false;
  codeValid = false;

  slideIndex = 0;

  emailFlag = true;
  shopNameFlag = true;
  passwordFlag = true;
  confirmPasswordFlag = true;

  userId: number;
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

  async onSubmitPhone(form: NgForm) {
    // this.submited = true;
    if (form.valid) {
      if (this.passportService.isPhoneOrEmailAvailable(this.signup.phone)) {
        this.onNext();
      } else {
        const toast = await this.toastController.create({ duration: 3000 });
        toast.message = '手机号已被注册';
        toast.present();
      }
    }
  }

  // TODO 待完成
  async onSendSMS() {
    let countDown = 59;
    this.codemessage.flag = true;
    const timer = setInterval(() => {
      this.codemessage.content = countDown + 's';
      countDown -= 1;
      if (countDown < 0) {
        clearInterval(timer);
        this.codemessage.flag = false;
        this.codemessage.content = '获取验证码';
      }
    }, 1000);
    this.codemessage.count += 1;
    if (this.codemessage.count > this.codemessage.maxcount) {
      this.codemessage.content = '请稍后再试';
    } else {
      this.authentication.createCode();
      console.log(this.authentication.code);
      this.authentication.sendSMS(this.signup.phone);
    }
  }


  async onValidateCode(form: NgForm) {
    const debug = true;
    if (debug) {
      this.codeValid = true;
      this.onNext();
    } else {
      if (form.valid) {
        if (this.authentication.validate(this.signup.code)) {
          this.codeValid = true;
          this.onNext();
        } else {
          const toast = await this.toastController.create({ duration: 3000 });
          toast.message = '验证码有误';
          toast.present();
        }
      }
    }
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
    const registResult: AjaxResult = await this.passportService.addUser(this.signup);
    if (registResult.success) {
      const toast = await this.toastController.create({ duration: 3000 });
      this.userId = registResult.result.userId;
      toast.message = '账号注册成功';
      toast.present();
      this.onNext();
    } else {
      const toast = await this.toastController.create({ duration: 3000 });
      toast.message = '邮箱已被注册';
      toast.present();
    }
  }


  onLogin(event) {
    this.passportService.login(this.userId, 0);
    this.outlet.pop(1);
    this.router.navigateByUrl('/tabs');
  }

}
