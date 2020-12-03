import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { SMSConfig } from '../../../shared/config/sms-config';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationCodeService {

  public code: string;
  private deadline: number;

  constructor(private httpClient: HttpClient) {
    this.code = '';
  }

  /*
   * 生成验证码
   * @param {number} [count=4] 验证码长度
   * @return {*}  {string} 生成的验证码
   * @memberof AuthenticationCodeService
   */
  createCode(count: number = 4): string {
    this.code = '';
    for (let i = 0; i < count; i++) {
      const c = (Math.random() * 9);
      this.code += Math.round(c).toString();
    }
    return this.code;
  }

  /*
   * 验证验证码在有效期是否正确
   * @param {string} value 验证码
   * @return {boolean} 验证结果
   * @memberof AuthenticationCodeService
   */
  validate(value: string): boolean {
    const now = Math.floor(Date.now() / 1000);
    return (value === this.code) && (now < this.deadline);
  }

  /*
   * 发送验证码短息
   * @param {string} phone 手机号码
   * @param {number} [timeMinute=10] 有效期时长
   * @memberof AuthenticationCodeService
   */
  sendSMS(phone: string, timeMinute: number = 10): void {
    const rand = Math.floor(Math.random() * 10000000000);
    const now = Math.floor(Date.now() / 1000);
    this.deadline = now + 60 * timeMinute * 1000;

    const smsConfig = new SMSConfig();
    const strSig = 'appkey=' + smsConfig.appKey + '&random=' + rand + '&time=' + now + '&mobile=' + phone;
    const url = 'https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=' + smsConfig.sdkAppId + '&random=' + rand;
    const sig = CryptoJS.SHA256(strSig).toString();

    this.httpClient.post(url, {
      ext: '',
      extend: '',
      sdkappid: smsConfig.sdkAppId,
      params: [
        this.code,
      ],
      sig,
      sign: smsConfig.sign,
      tel: {
        mobile: phone,
        nationcode: '86'
      },
      time: now,
      tpl_id: smsConfig.tplId
    }).toPromise();
  }

}
