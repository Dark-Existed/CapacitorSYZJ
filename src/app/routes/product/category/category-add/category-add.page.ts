import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {

  private headTitle: string;
  private title: string;
  private id: number;
  private name: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
    activatedRouter.queryParams.subscribe(queryParms => {
      this.title = queryParms.title;
      this.id = Number(queryParms.id);
      if (this.title !== '大分类') {
        this.headTitle = '新增小分类';
      } else {
        this.headTitle = '新增商品分类';
      }
    });

  }

  ngOnInit() {
  }

}
