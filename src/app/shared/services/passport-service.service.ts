import { Injectable } from '@angular/core';
import { SignupInfo } from 'src/app/routes/passport/signup/signupInfo';
import CryptoJS from 'crypto-js';
import { AjaxResult } from '../class/ajax-result';
import { CurrentUser } from '../class/login-account';
import { Shop } from '../class/shop';
import { User } from '../class/user';
import { LocalStorageService, SHOPS_KEY, USERS_KEY, CURRENT_USER_KEY } from './local-storage.service';

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
    user.wechatId = '';
    user.passwordToken = this.generatePasswordToken(signupInfo.password);
    user.email = signupInfo.email;
    user.createTime = new Date().toString();
    return user;
  }

  initShop(signupInfo: SignupInfo): Shop {
    const shop = new Shop();
    shop.shopName = signupInfo.shopName;
    shop.shortName = '';
    shop.shopType = '';
    shop.shopTel = signupInfo.phone;
    return shop;
  }

  initCurrentUser(user: User): CurrentUser {
    const currentUser = new CurrentUser();
    currentUser.id = user.id;
    return currentUser;
  }

  isRegistered(users: User[], signupInfo: SignupInfo): boolean {
    for (const user of users) {
      if (signupInfo.phone === user.phone || signupInfo.email === user.email) {
        return true;
      }
    }
    return false;
  }

  isPhoneOrEmailAvailable(phoneOrEmail: string) {
    const users: User[] = this.localStorageService.get(USERS_KEY, []);
    for (const user of users) {
      if (phoneOrEmail === user.phone || phoneOrEmail === user.email) {
        return false;
      }
    }
    return true;
  }

  confirmAccount(loginIdentifier: string, password: string): AjaxResult {
    const users: User[] = this.localStorageService.get(USERS_KEY, []);
    for (const user of users) {
      if ((user.phone === loginIdentifier || user.email === loginIdentifier) && this.validatePassword(password, user.passwordToken)) {
        if (loginIdentifier === user.phone) {
          return new AjaxResult(true, { userId: user.id, loginType: 0 });
        } else if (loginIdentifier === user.email) {
          return new AjaxResult(true, { userId: user.id, loginType: 1 });
        }
      }
    }
    return new AjaxResult(false, null);
  }

  async addUser(signupInfo: SignupInfo) {
    const users: User[] = this.localStorageService.get(USERS_KEY, []);
    const shops: Shop[] = this.localStorageService.get(SHOPS_KEY, []);

    if (this.isRegistered(users, signupInfo)) {
      return new AjaxResult(false, null, {
        message: '你的手机号码或邮箱已经被注册',
        details: null
      });
    } else {
      const user = this.initUser(signupInfo);
      const shop = this.initShop(signupInfo);
      user.id = users.length + 1;
      shop.id = shops.length + 1;
      user.shopId = shops.length + 1;
      users.push(user);
      shops.push(shop);
      this.localStorageService.set(USERS_KEY, users);
      this.localStorageService.set(SHOPS_KEY, shops);
      return new AjaxResult(true, null);
    }

  }

  login(userId: number, loginType: number) {
    const currentUser = new CurrentUser();
    currentUser.id = userId;
    currentUser.type = loginType;
    currentUser.loginTime = new Date().toString();
    this.localStorageService.set(CURRENT_USER_KEY, currentUser);
  }

  getCueerntUser(): CurrentUser {
    const currentUser: CurrentUser = this.localStorageService.get(CURRENT_USER_KEY, null);
    return currentUser;
  }

  removeCurrentUser() {
    this.localStorageService.remove(CURRENT_USER_KEY);
  }

  getUser(id: number): User {
    const users: User[] = this.localStorageService.get(USERS_KEY, []);
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

