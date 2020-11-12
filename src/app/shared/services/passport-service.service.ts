import { Injectable } from '@angular/core';
import { SignupInfo } from 'src/app/passport/signup/signupInfo';
import { AjaxResult } from '../class/ajax-result';
import { LoginAccount } from '../class/login-account';
import { User } from '../class/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  initUser(signup: SignupInfo): User {
    const user = new User();
    user.email = signup.email;
    user.phone = signup.phone;
    // user.shopName = signup.shopName;
    user.createTime = new Date().toDateString();
    return user;
  }

  // initLoginAccount(sign: Signup): LoginAccount {
  //   const loginAccount = new LoginAccount();
  //   // loginAccount.identifier = sign.iden
  //   loginAccount.passwordtoken = sign.password;
  //   return loginAccount;
  // }


  confirmAccount(phoneOrEmail: string, password: string): boolean {
    const loginAccount = this.localStorageService.get('LoginAccount', null);
    if (loginAccount &&
      (loginAccount.phone === phoneOrEmail || loginAccount.email === phoneOrEmail) &&
      loginAccount.password === password) {
      return true;
    }
    return false;
  }

  isRegistered(localUsers, signup: SignupInfo): boolean {
    for (const user of localUsers) {
      if (signup.phone === user.phone || signup.email === user.email) {
        return true;
      }
    }
    return false;
  }

  addUser(signup: SignupInfo) {
    const localUsers = this.localStorageService.get('Users', []);
    const user = this.initUser(signup);
    if (localUsers.length !== 0) {
      if (this.isRegistered(localUsers, signup)) {
        return new AjaxResult(false, null, {
          message: '你的手机号码或邮箱已经被注册',
          details: ''
        });
      }
    } else {
      this.localStorageService.set('Users', user);
      // this.localStorageService.set('LoginAccount', loginAccount);
    }
  }

}
