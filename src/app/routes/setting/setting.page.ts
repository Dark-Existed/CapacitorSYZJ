import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';
import { APP_KEY, LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  appConfig: any;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private passportService: PassportServiceService,
    private outlet: IonRouterOutlet,
  ) {
    this.appConfig = this.localStorageService.get(APP_KEY, {
      isLaunched: false,
      version: '1.3.4',
      phone: '13315168184'
    });
  }

  onBack() {
    // this.outlet.pop(2);
    this.router.navigateByUrl('tabs/me');
  }

  ngOnInit() {
  }

  logOut() {
    this.passportService.removeCurrentUser();
    this.router.navigateByUrl('');
  }

}
