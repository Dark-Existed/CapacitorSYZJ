import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationCodeService {

  public code: string;
  private deadline: number;

  constructor(private httpClient: HttpClient) {
    this.code = '';
  }

  createCode(count: number = 4): string {
    this.code = '';
    // 10分钟内有效
    // this.deadline = Date.now() + 60 * 10 * 1000;
    for (let i = 0; i < count; i++) {
      const c = (Math.random() * 9);
      this.code += Math.round(c).toString();
    }
    return this.code;
  }

  validate(value: string): boolean {
    const now = Date.now();
    return (value === this.code) && (now < this.deadline);
  }


  sendSMS(phone: string): void {
    const rand = Math.floor(Math.random() * 10000000000);
    const now = Math.floor(Date.now());
    this.deadline = now + 60 * 10 * 1000;


  }

}
