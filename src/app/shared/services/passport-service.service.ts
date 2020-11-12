import { Injectable } from '@angular/core';
import { SignupInfo } from 'src/app/passport/signup/signupInfo';
import { AjaxResult } from '../class/ajax-result';
import { LoginAccount } from '../class/login-account';
import { Shop } from '../class/shop';
import { User } from '../class/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  initUser(signupInfo: SignupInfo): User {
    const user = new User();
    user.phone = signupInfo.phone;
    user.passwordToken = signupInfo.password;
    user.email = signupInfo.email;
    user.createTime = new Date().toString();
    return user;
  }

  initLoginAccount(user: User): LoginAccount {
    const loginAccount = new LoginAccount();
    loginAccount.id = user.id;

    return loginAccount;
  }

  initShop(signupInfo: SignupInfo): Shop {
    const shop = new Shop();
    shop.shopName = signupInfo.shopName;
    return shop;
  }


  confirmAccount(phoneOrEmail: string, password: string): boolean {
    const loginAccount = this.localStorageService.get('LoginAccount', null);
    if (loginAccount &&
      (loginAccount.phone === phoneOrEmail || loginAccount.email === phoneOrEmail) &&
      loginAccount.password === password) {
      return true;
    }
    return false;
  }

  isRegistered(users, signupInfo: SignupInfo): boolean {
    for (const user of users) {
      if (signupInfo.phone === user.phone || signupInfo.email === user.email) {
        return true;
      }
    }
    return false;
  }

  addUser(signupInfo: SignupInfo) {
    const users = this.localStorageService.get('Users', []);
    const user = this.initUser(signupInfo);
    if (users.length !== 0) {
      if (this.isRegistered(users, signupInfo)) {
        return new AjaxResult(false, null, {
          message: '你的手机号码或邮箱已经被注册',
          details: null
        });
      } else {
        user.id = users.length + 1;
        users.add(user);
        this.localStorageService.set('Users', users);
        return new AjaxResult(true, null);
      }
    } else {
      user.id = 1;
      users.add(user);
      this.localStorageService.set('Users', users);
      return new AjaxResult(true, null);
    }
  }


  getCurrentUser(id: number): User {
    const users = this.localStorageService.get('Users', []);
    for (const user of users) {
      if (user.id === id) {
        return user;
      }
    }
    return null;
  }


}

