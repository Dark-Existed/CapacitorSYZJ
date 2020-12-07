import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { eventNames } from 'process';
import { CurrentUser } from 'src/app/shared/class/current-user';
import { Shop } from 'src/app/shared/class/shop';
import { User } from 'src/app/shared/class/user';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})

export class MePage implements OnInit {

  private appPages = [
    { title: '开店论坛', url: '/home', icon: 'chatbox-outline' },
    { title: '手机橱窗', url: '/home', icon: 'create-outline' },
    { title: '邀请有礼', url: '/home', icon: 'share-social-outline' },
    { title: '资金账户', url: '/home', icon: 'card-outline' },
    { title: '反馈建议', url: '/home', icon: 'information-circle-outline' },
    { title: '帮助中心', url: '/home', icon: 'help-circle-outline' },
  ];

  private currentUser: User;
  private shop: Shop;

  constructor(
    private passportService: PassportServiceService,
    private router: Router,
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/tabs/me') {
          this.updateDate();
        }
      }
    });
  }

  ngOnInit() {
    this.updateDate();
  }

  updateDate() {
    this.currentUser = this.passportService.getUser(this.passportService.getCueerntUser().id);
    this.shop = this.passportService.getShop(this.currentUser.id);
  }

}
