import { Injectable } from '@angular/core';
import { CurrentUser } from 'src/app/shared/class/current-user';
import { Shop } from 'src/app/shared/class/shop';
import { User } from 'src/app/shared/class/user';
import { LocalStorageService, SHOPS_KEY, USERS_KEY } from 'src/app/shared/services/local-storage.service';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public currentUser: CurrentUser;
  public user: User;
  public shop: Shop;

  constructor(
    private passportService: PassportServiceService,
    private localStorageService: LocalStorageService,
  ) {
    this.currentUser = passportService.getCueerntUser();
    this.user = passportService.getUser(this.currentUser.id);
    this.shop = passportService.getShop(this.user.shopId);
  }

  updateParams(value: string, property: string) {
    const [type, parmsName] = property.split('.');
    if (type === 'User') {
      this.updateUserParams(value, parmsName);
    } else if (type === 'Shop') {
      this.updateShopParams(value, parmsName);
    }
  }

  updateUserParams(value: string, parmsName: string) {
    const users: User[] = this.localStorageService.get(USERS_KEY, []);
    for (const u of users) {
      if (u.id === this.user.id) {
        u[parmsName] = value;
      }
    }
    this.localStorageService.set(USERS_KEY, users);
  }

  updateShopParams(value: string, parmsName: string) {
    const shops: Shop[] = this.localStorageService.get(SHOPS_KEY, []);
    for (const s of shops) {
      if (s.id === this.shop.id) {
        s[parmsName] = value;
      }
    }
    this.localStorageService.set(SHOPS_KEY, shops);
  }

}
