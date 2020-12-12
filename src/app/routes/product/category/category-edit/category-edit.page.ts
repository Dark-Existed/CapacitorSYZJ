import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { Category } from '../category';
import { CategoryNameEditPage } from '../category-name-edit/category-name-edit.page';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {

  private category: Category;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private categoryService: CategoryService,
    private alertController: AlertController,
    private modalController: ModalController,
  ) {
    this.activatedRouter.queryParams.subscribe(queryParms => {
      this.category = this.categoryService.getCategory(Number(queryParms.id));
    });
  }

  ngOnInit() {
  }

  async presentModal(category: Category, parId: number | null = null) {
    const modal = await this.modalController.create({
      component: CategoryNameEditPage,
      componentProps: {
        data: category,
        parentId: parId,
      }
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    const res = await this.presentModal(this.category);
    if (res.data) {
      this.category = res.data;
    }
  }

  async onParentCategoryDelete(item: IonItemSliding) {
    item.close();
    const alert = await this.alertController.create({
      header: this.category.name,
      message: '确定要删除此大分类？',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: () => {
            this.categoryService.deleteCategory(this.category);
            // this.router.navigateByUrl('category/category-list');
          }
        }
      ]
    });
    await alert.present();
  }

  async onEditSubCategoryName(item: IonItemSliding, category: Category) {
    item.close();
    const res = await this.presentModal(category, this.category.id);
    if (res.data) {
      category = res.data;
    }
  }

  async onSubCategoryDelete(item: IonItemSliding, category: Category) {
    item.close();
    const alert = await this.alertController.create({
      header: category.name,
      message: '确定要删除此小分类？',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确定',
          handler: () => {
            this.categoryService.deleteSubCategory(category, this.category);
          }
        }
      ]
    });
    await alert.present();
  }

}
