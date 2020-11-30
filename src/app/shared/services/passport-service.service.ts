import { Injectable } from '@angular/core';
import { SignupInfo } from 'src/app/routes/passport/signup/signupInfo';
import CryptoJS from 'crypto-js';
import { AjaxResult } from '../class/ajax-result';
import { CurrentUser } from '../class/current-user';
import { Shop } from '../class/shop';
import { User } from '../class/user';
import { LocalStorageService, SHOPS_KEY, USERS_KEY, CURRENT_USER_KEY, HISTORY_USER } from './local-storage.service';

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

  /*
   * 是否已经注册过
   * @param {User[]} users 用户列表
   * @param {SignupInfo} signupInfo 注册信息
   * @return {*}  {boolean} 是否注册过
   * @memberof PassportServiceService
   */
  isRegistered(users: User[], signupInfo: SignupInfo): boolean {
    for (const user of users) {
      if (signupInfo.phone === user.phone || signupInfo.email === user.email) {
        return true;
      }
    }
    return false;
  }

  /*
   * 手机或者邮箱是否可用
   * @param {string} phoneOrEmail 手机或邮箱
   * @return {*} 是否可用于注册
   * @memberof PassportServiceService
   */
  isPhoneOrEmailAvailable(phoneOrEmail: string) {
    const users: User[] = this.localStorageService.get(USERS_KEY, []);
    for (const user of users) {
      if (phoneOrEmail === user.phone || phoneOrEmail === user.email) {
        return false;
      }
    }
    return true;
  }

  /*
   * 验证账号密码是否正确
   * @param {string} loginIdentifier 登录凭证
   * @param {string} password 密码
   * @return {AjaxResult} 登录结果
   * @memberof PassportServiceService
   */
  confirmAccount(loginIdentifier: string, password: string): AjaxResult {
    const users: User[] = this.localStorageService.get(USERS_KEY, []);
    for (const user of users) {
      if ((user.phone.toString() === loginIdentifier || user.email === loginIdentifier) &&
      this.validatePassword(password, user.passwordToken)) {
        if (loginIdentifier === user.phone.toString()) {
          return new AjaxResult(true, { userId: user.id, loginType: 0 });
        } else if (loginIdentifier === user.email) {
          return new AjaxResult(true, { userId: user.id, loginType: 1 });
        }
      }
    }
    return new AjaxResult(false, null);
  }

  /*
   * 添加用户
   * @param {SignupInfo} signupInfo
   * @return {*}
   * @memberof PassportServiceService
   */
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
      return new AjaxResult(true, { userId: user.id, loginType: 0 });
    }
  }

  /*
   * 获取用户
   * @param {number} id 用户id
   * @return {*}  {User} 找不到用户则返回null
   * @memberof PassportServiceService
   */
  getUser(id: number): User {
    const users: User[] = this.localStorageService.get(USERS_KEY, []);
    for (const user of users) {
      if (user.id === id) {
        return user;
      }
    }
    return null;
  }

  /*
   * 用户登录同时本地记录登录用户
   * @param {number} userId 用户id
   * @param {number} loginType 登录方式
   * @memberof PassportServiceService
   */
  login(userId: number, loginType: number) {
    const currentUser = new CurrentUser();
    currentUser.id = userId;
    currentUser.type = loginType;
    currentUser.loginTime = new Date().toString();
    this.localStorageService.set(CURRENT_USER_KEY, currentUser);
    const user = this.getUser(userId);
    if (loginType === 0) {
      this.localStorageService.set(HISTORY_USER, user.phone);
    } else if (loginType === 1) {
      this.localStorageService.set(HISTORY_USER, user.email);
    }
  }

  /*
   * 获取当前登录用户
   * @return {*}  {CurrentUser} 当前登录用户
   * @memberof PassportServiceService
   */
  getCueerntUser(): CurrentUser {
    const currentUser: CurrentUser = this.localStorageService.get(CURRENT_USER_KEY, null);
    return currentUser;
  }

  /*
   * 更新当前登录用户过期时间
   * @param {CurrentUser} currentUser
   * @memberof PassportServiceService
   */
  updateCurrentUser(currentUser: CurrentUser) {
    currentUser.loginTime = new Date().toString();
    this.localStorageService.set(CURRENT_USER_KEY, currentUser);
  }

  /*
   * 移除当前登录用户
   * @memberof PassportServiceService
   */
  removeCurrentUser() {
    this.localStorageService.remove(CURRENT_USER_KEY);
  }

  /*
   * 获取历史登录用户
   * @return {*}  {string}
   * @memberof PassportServiceService
   */
  getHistoryUser(): string {
    return this.localStorageService.get(HISTORY_USER, null);
  }

  /*
   * pbkdf2_sha156 Hash
   * @param {string} key 密码
   * @param {number} [iter=10000] 迭代轮数
   * @return {*}  {string} hash 后的返回值
   * @memberof PassportServiceService
   */
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

  /*
   * 验证密码是否正确
   * @param {string} key 密码
   * @param {string} hashKey hash过的密码
   * @return {*}  {boolean} 验证结果
   * @memberof PassportServiceService
   */
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

