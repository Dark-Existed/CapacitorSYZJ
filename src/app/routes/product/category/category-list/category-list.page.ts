import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {

  private categories: Category[];
  private activateCategory: Category;
  private activateCategoryId: number;
  private activateSubCategories: Category[];
  private activateSubCategory: Category;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private actionSheetController: ActionSheetController
  ) {
    this.activateCategoryId = 1;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/category/category-list') {
          this.updateData();
        }
      }
    });
  }

  updateData() {
    this.categoryService.getAll().then((data) => {
      this.categories = data.result;
      if (this.categories) {
        this.activateCategory = this.categories[this.activateCategoryId - 1];
        this.activateSubCategories = this.activateCategory.children;
      }
    });
  }

  ngOnInit() {
  }

  onSelectedCategory(category: Category) {
    this.activateCategory = category;
    this.activateCategoryId = this.activateCategory.id;
    this.activateSubCategories = this.activateCategory.children;
  }

  onSelectedSubCategory(category: Category) {

  }

  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            this.router.navigate(['/category/category-add'], {
              queryParams: {
                name: this.activateCategory.name,
                id: this.activateCategory.id
              }
            });
          }
        },
        {
          text: '编辑分类',
          handler: () => {
            this.router.navigate(['/category/category-edit'], {
              queryParams: {
                id: this.activateCategory.id,
              }
            });
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => { console.log('Cancel clicked'); }
        }
      ]
    });
    await actionSheet.present();
  }

  goToAddCategory() {

  }

  getItemColor(id: number): string {
    if (id === this.activateCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }
}
