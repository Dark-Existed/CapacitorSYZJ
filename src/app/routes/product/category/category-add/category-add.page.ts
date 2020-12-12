import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet, ToastController } from '@ionic/angular';
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
  private id: number;
  private name: string;
  private category: Category;

  constructor(
    private activatedRouter: ActivatedRoute,
    private categoryService: CategoryService,
    private toastController: ToastController,
    private outlet: IonRouterOutlet,
  ) {
    this.activatedRouter.queryParams.subscribe(queryParms => {
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
    const childCategory = new Category();
    childCategory.id = this.category.children[this.category.children.length - 1].id + 1;
    childCategory.name = '';
    childCategory.children = [];
    this.category.children.push(childCategory);
  }

  async onSave() {
    const toast = await this.toastController.create({ duration: 2000 });
    if (this.id === 0) {
      this.categoryService.isUniqueName(this.category).then((res) => {
        if (res.success) {
          this.categoryService.insertCategory(this.category);
          toast.message = '新增分类成功';
          toast.present();
          this.outlet.pop(1);
        } else {
          toast.message = res.error.message;
          toast.present();
        }
      });
    } else {
      this.categoryService.isUniqueChildName(this.category).then((res) => {
        if (res.success) {
          this.categoryService.insertCategory(this.category);
          toast.message = '新增小分类成功';
          toast.present();
          this.outlet.pop(1);
        } else {
          toast.message = res.error.message;
          toast.present();
        }
      });
    }
  }

}
