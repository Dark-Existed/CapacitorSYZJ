import { Injectable } from '@angular/core';
import { CurrentUser } from 'src/app/shared/class/current-user';
import { Shop } from 'src/app/shared/class/shop';
import { User } from 'src/app/shared/class/user';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public currentUser: CurrentUser;
  public user: User;
  public shop: Shop;

  constructor(
    private passportService: PassportServiceService
  ) {
    this.currentUser = passportService.getCueerntUser();
    this.user = passportService.getUser(this.currentUser.id);
    this.shop = passportService.getShop(this.user.shopId);
  }

}
