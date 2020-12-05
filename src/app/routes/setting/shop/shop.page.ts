import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/shared/class/current-user';
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

  constructor(
    private passportService: PassportServiceService,
  ) {
    this.currentUser = passportService.getCueerntUser();
    this.user = passportService.getUser(this.currentUser.id);
  }

  ngOnInit() {
  }

}
