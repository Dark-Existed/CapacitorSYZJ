import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonSlides, MenuController } from '@ionic/angular';
import { AuthenticationCodeService } from '../authentication-code.service';
import { Signup } from './signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements AfterViewInit {

  constructor(
    private authentication: AuthenticationCodeService,
    private alertController: AlertController,
    private menuController: MenuController,
  ) {}

  @ViewChild('signupSlides') signupSlides: IonSlides;

  submited = false;
  codeValid = false;
  code: string;
  slideIndex = 0;

  emailFlag = true;
  shopNameFlag = true;
  passwordFlag = true;
  confirmPasswordFlag = true;

  signup: Signup = {
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
  }

  onNext() {
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slideNext();
    this.signupSlides.lockSwipeToNext(true);
    this.signupSlides.getActiveIndex().then((n) => {
      this.slideIndex = n;
    });
  }

  onPrevious() {
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slidePrev();
    this.signupSlides.lockSwipeToNext(true);
    this.signupSlides.getActiveIndex().then((n) => {
      this.slideIndex = n;
    });
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
    if (this.signup.shopName.length <= 0 || this.signup.shopName.length > 12) {
      this.shopNameFlag = false;
    } else {
      this.shopNameFlag = true;
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
    if (this.signup.confirmPassword !== this.signup.password) {
      this.confirmPasswordFlag = false;
    } else {
      this.confirmPasswordFlag = true;
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }

}
