import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private sales = [
    { title: '今日', content: '比昨天', previous: this.getRandomNum(), current: this.getRandomNum() },
    { title: '七天', content: '比同期', previous: this.getRandomNum(), current: this.getRandomNum() },
    { title: '本月', content: '比同期', previous: this.getRandomNum(), current: this.getRandomNum() },
  ];

  constructor() { }

  ngOnInit() {
  }

  getRandomNum(): number {
    return Math.random() * 10;
  }

  getArrowStatus(current: number, previous: number): number {
    const result = current - previous;
    if (result > 0) {
      return 1;
    } else if (result === 0) {
      return 0;
    } else {
      return -1;
    }
  }

}
