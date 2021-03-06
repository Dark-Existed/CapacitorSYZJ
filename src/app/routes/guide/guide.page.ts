import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuidePage implements OnInit {

  showSkip = true;

  @ViewChild('slides', { static: false }) slides: IonSlides;
  constructor(private router: Router) { }

  ngOnInit() {
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
