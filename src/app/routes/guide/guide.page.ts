import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
export const APP_KEY = 'App';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuidePage implements OnInit {

  showSkip = true;

  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    const appConfig: any = this.localStorageService.get('App', {
      isLaunched: false,
      version: '1.3.4',
      phone: '13315168184'
    });

    if (appConfig.isLaunched === false) {
      appConfig.isLaunched = true;
      this.localStorageService.set('App', appConfig);
    } else {
      this.router.navigateByUrl('tabs');
    }

  }

  onSlideWillChange(event) {
    event.target.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }

  onSkip() {
    this.router.navigateByUrl('/passport/signup');
  }
  onLogin() {
    this.router.navigateByUrl('/passport/login');
  }

}
