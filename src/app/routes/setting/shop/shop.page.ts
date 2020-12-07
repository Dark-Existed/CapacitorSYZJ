import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CurrentUser } from 'src/app/shared/class/current-user';
import { Shop } from 'src/app/shared/class/shop';
import { User } from 'src/app/shared/class/user';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  currentUser: CurrentUser;
  user: User;
  shop: Shop;

  constructor(
    private passportService: PassportServiceService,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/setting/shop') {
          this.updateData();
        }
      }
    });
  }

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.currentUser = this.passportService.getCueerntUser();
    this.user = this.passportService.getUser(this.currentUser.id);
    this.shop = this.passportService.getShop(this.user.shopId);
  }

}
