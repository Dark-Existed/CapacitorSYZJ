import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { LocalStorageService } from '../shared/services/local-storage.service';
export const APP_KEY = 'App';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomePage implements OnInit {

  showSkip = true;

  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    const appConfig: any = this.localStorageService.get('App', { isLaunched: false, version: '1.0.0' });
    if (appConfig.isLaunched === false) {
      appConfig.isLaunched = true;
      this.localStorageService.set('App', appConfig);
    } else {
      this.router.navigateByUrl('home');
    }
  }

  onSlideWillChange(event) {
    event.target.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }

}
