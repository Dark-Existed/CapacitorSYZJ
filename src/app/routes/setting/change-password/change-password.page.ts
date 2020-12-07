import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonRouterOutlet, ToastController } from '@ionic/angular';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  passwordConfig = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private outlet: IonRouterOutlet,
    private toastController: ToastController,
    private passportService: PassportServiceService,
  ) { }

  ngOnInit() {
  }

  async onSubmitPassword(form: NgForm) {
    if (form.valid) {
      const toast = await this.toastController.create({ duration: 2000 });
      const currentUser = this.passportService.getCueerntUser();
      const user = this.passportService.getUser(currentUser.id);
      if (this.passportService.validatePassword(this.passwordConfig.oldPassword, user.passwordToken)) {
        this.passportService.updateUserPasswordToken(this.passwordConfig.newPassword, user.id);
        toast.message = '密码修改成功';
        toast.present();
        this.outlet.pop(1);
      } else {
        toast.message = '旧密码错误';
        toast.present();
      }
    }
  }

}
