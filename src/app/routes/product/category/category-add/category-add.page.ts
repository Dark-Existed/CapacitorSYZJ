import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {

  private headTitle: string;
  private categoryName: string;
  private id = 0;
  private name: string;
  private category: Category;

  constructor(
    private activatedRouter: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
    activatedRouter.queryParams.subscribe(queryParms => {
      this.categoryName = queryParms.name;
      this.id = Number(queryParms.id);
      this.category = categoryService.initCategory(this.id, this.categoryName);
      if (this.categoryName !== '大分类') {
        this.headTitle = '新增小分类';
      } else {
        this.headTitle = '新增分类';
      }
    });
  }

  ngOnInit() {
  }

  onAddSubCategory() {

  }

  onSave() { }

}
