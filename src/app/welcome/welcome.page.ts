import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomePage implements OnInit {

  showSkip = true;

  @ViewChild('slides', {static: false}) slides: IonSlides;
  constructor() { }

  ngOnInit() {
  }

  onSlideWillChange(event) {
    event.target.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }

}
