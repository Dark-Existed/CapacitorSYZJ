import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private sales = [
    { title: '今日', content: '比昨天', previous: this.getRandomNum(), current: this.getRandomNum() },
    { title: '七天', content: '比同期', previous: this.getRandomNum(100), current: this.getRandomNum(100) },
    { title: '本月', content: '比同期', previous: this.getRandomNum(1000), current: this.getRandomNum(1000) },
  ];

  private buttons = [
    { name: '新增商品', iconSrc: 'assets/img/add_sales.png' },
    { name: '新增会员', iconSrc: 'assets/img/add_user.png' },
    { name: '收银记账', iconSrc: 'assets/img/sales_account.png' },
    { name: '支出管理', iconSrc: 'assets/img/a_note.png' },
    { name: '商品管理', iconSrc: 'assets/img/sales_management.png' },
    { name: '会员管理', iconSrc: 'assets/img/user_management.png' },
    { name: '查询销售', iconSrc: 'assets/img/shop_management.png' },
    { name: '智能分析', iconSrc: 'assets/img/analysis.png' },
    { name: '供应商管理', iconSrc: 'assets/img/supply_chain.png' },
    { name: '挂单', iconSrc: 'assets/img/commission.png' },
    { name: '高级功能', iconSrc: 'assets/img/advanced_feature.png' },
  ];

  constructor() { }

  ngOnInit() {
  }

  getRandomNum(ratio = 10): number {
    return Math.random() * ratio;
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
