import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationCodeService {

  private code: string;
  private deadline: number;

  constructor() {
    this.code = '';
  }

  createCode(count: number): string {
    this.code = '';
    // 10分钟内有效
    this.deadline = Date.now() + 60 * 10 * 1000;
    for (let i = 0; i < count; i++) {
      const c = (Math.random() * 9);
      this.code += Math.round(c) + '';
    }
    return this.code;
  }

  validate(value: string): boolean {
    const now = Date.now();
    return value === this.code && now < this.deadline;
  }


  getMessage() {
    // const host = 'http://cxkjsms.market.alicloudapi.com/chuangxinsms/dxjk';
    // const appcode = 'e8ff3ec5d6f64f75b369952734d73384';
    // const mobile = 'mobile=13110752326&';
    // const content1 = 'content=[生意专家]您的验证码是';

    // this.code = this.createCode(4);
    // // const apiUrl = host + '?' + mobile + content1 + this.code;
    // const apiUrl = host + '?' + 'content=%E3%80%90%E5%88%9B%E4%BF%A1%E3%80%91%E4%BD%A0%E7%9A%84%E9%AA%8C%E8%AF%81%E7%A0%81%E6%98%AF%EF%BC%9A5873%EF%BC%8C3%E5%88%86%E9%92%9F%E5%86%85%E6%9C%89%E6%95%88%EF%BC%81&mobile=13568813957';
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'APPCODE e8ff3ec5d6f64f75b369952734d73384',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'charset': 'UTF-8',
    //     'X-Ca-Timestamp': '1604195249775',
    //     'gateway_channel': 'http',
    //     'X-Ca-Key': '203872433',
    //     'x-ca-nonce': 'a6b00e2c-b925-4ab6-a4f6-834d2330177d',
    //     'X-Ca-Stage': 'RELEASE',
    //     'Host': 'cxkjsms.market.alicloudapi.com'
    //   })
    // };
    // const json = this.http.get(apiUrl, httpOptions);
    // console.log(json);
  }

}
