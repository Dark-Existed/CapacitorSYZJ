import { Injectable } from '@angular/core';
import { SignupInfo } from 'src/app/routes/passport/signup/signupInfo';
import CryptoJS from 'crypto-js';
import { AjaxResult } from '../class/ajax-result';
import { LoginAccount } from '../class/login-account';
import { Shop } from '../class/shop';
import { User } from '../class/user';
import { LocalStorageService, SHOPS_KEY, USERS_KEY } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  uuid(): string {
    const tempUrl = URL.createObjectURL(new Blob());
    const uuid = tempUrl.toString();
    URL.revokeObjectURL(tempUrl);
    return uuid.substr(uuid.lastIndexOf('/') + 1);
  }

  initUser(signupInfo: SignupInfo): User {
    const user = new User();
    user.userName = this.uuid();
    user.phone = signupInfo.phone;
    user.passwordToken = this.generatePasswordToken(signupInfo.password);
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
    shop.shopTel = signupInfo.phone;
    return shop;
  }

  confirmAccount(loginIdentifier: string, password: string): number {
    const users = this.localStorageService.get(USERS_KEY, []);
    for (const user of users) {
      if ((user.phone === loginIdentifier || user.email === loginIdentifier) && this.validatePassword(password, user.passwordToken)) {
        return user.id;
      }
    }
    return -1;
  }

  login(user: User, loginType: number) {
    const loginAccount = new LoginAccount();
    loginAccount.id = user.id;
    loginAccount.type = loginType;
    loginAccount.loginTime = new Date().toString();
    this.localStorageService.set('LoginAccount', loginAccount);
  }

  isRegistered(users, signupInfo: SignupInfo): boolean {
    for (const user of users) {
      if (signupInfo.phone === user.phone || signupInfo.email === user.email) {
        return true;
      }
    }
    return false;
  }

  isPhoneOrEmailAvailable(phoneOrEmail: string) {
    const users = this.localStorageService.get(USERS_KEY, []);
    for (const user of users) {
      if (phoneOrEmail === user.phone || phoneOrEmail === user.email) {
        return false;
      }
    }
    return true;
  }

  async addUser(signupInfo: SignupInfo) {
    const users = this.localStorageService.get(USERS_KEY, []);
    const user = this.initUser(signupInfo);

    const shops = this.localStorageService.get(SHOPS_KEY, []);
    const shop = this.initShop(signupInfo);

    if (users.length !== 0) {
      if (this.isRegistered(users, signupInfo)) {
        return new AjaxResult(false, null, {
          message: '你的手机号码或邮箱已经被注册',
          details: null
        });
      } else {
        user.id = users.length + 1;
        shop.id = shops.length + 1;
        user.shopId = shops.length + 1;
        users.push(user);
        shops.push(shop);
        this.localStorageService.set(USERS_KEY, users);
        this.localStorageService.set(SHOPS_KEY, shops);
        return new AjaxResult(true, null);
      }
    } else {
      user.id = 1;
      shop.id = shops.length + 1;
      user.shopId = shops.length + 1;
      users.push(user);
      shops.push(shop);
      this.localStorageService.set(USERS_KEY, users);
      this.localStorageService.set(SHOPS_KEY, shops);
      return new AjaxResult(true, null);
    }
  }

  getCurrentUser(id: number): User {
    const users = this.localStorageService.get(USERS_KEY, []);
    for (const user of users) {
      if (user.id === id) {
        return user;
      }
    }
    return null;
  }

  generatePasswordToken(key: string, iter = 10000): string {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key256Bits = CryptoJS.PBKDF2(key, salt, {
      keySize: 256 / 32,
      hasher: CryptoJS.algo.SHA256,
      iterations: iter,
    });
    const saltBase64 = CryptoJS.enc.Base64.stringify(salt);
    const key256BitsBase64 = CryptoJS.enc.Base64.stringify(key256Bits);
    return 'pbkdf2_sha256$' + iter.toString() + '$' + saltBase64 + '$' + key256BitsBase64;
  }

  validatePassword(key: string, hashKey: string): boolean {
    const part = hashKey.split('$');
    const iter = Number(part[1]);
    const salt = CryptoJS.enc.Base64.parse(part[2]);
    const key256Bits = CryptoJS.PBKDF2(key, salt, {
      keySize: 256 / 32,
      hasher: CryptoJS.algo.SHA256,
      iterations: iter,
    });
    const hash = CryptoJS.enc.Base64.stringify(key256Bits);
    return hash === part[3];
  }

}

