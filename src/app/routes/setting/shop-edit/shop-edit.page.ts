import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/shared/class/current-user';
import { User } from 'src/app/shared/class/user';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
})
export class ShopEditPage implements OnInit {

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
