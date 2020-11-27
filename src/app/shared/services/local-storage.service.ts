import { Injectable } from '@angular/core';

export const APP_KEY = 'App';
export const USERS_KEY = 'Users';
export const SHOPS_KEY = 'Shops';
export const CURRENT_USER_KEY = 'CurrentUser';
export const HISTORY_USER = 'HistoryUser';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage = window.localStorage;
  constructor() { }

  get(key: string, defaultValue: any): any {
    let value = this.storage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }
    if (value == null && defaultValue) {
      value = defaultValue;
    }
    return value;
  }

  set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

}

