import { Component, OnInit } from '@angular/core';
import { APP_KEY, LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  appConfig: any;

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.appConfig = this.localStorageService.get(APP_KEY, {
      isLaunched: false,
      version: '1.3.4',
      phone: '13315168184'
    });
  }

  ngOnInit() {
  }

}
