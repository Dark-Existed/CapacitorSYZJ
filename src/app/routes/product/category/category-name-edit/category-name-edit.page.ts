import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-name-edit',
  templateUrl: './category-name-edit.page.html',
  styleUrls: ['./category-name-edit.page.scss'],
})
export class CategoryNameEditPage implements OnInit {

  category: Category;
  parentId: number;

  constructor(
    private modalController: ModalController,
    private navParms: NavParams,
    private categoryService: CategoryService,
    private toastController: ToastController,
  ) {
    this.category = JSON.parse(JSON.stringify(this.navParms.data.data));
    this.parentId = this.navParms.data.parentId;
  }

  ngOnInit() {
  }

  dismiss(category?: Category) {
    this.modalController.dismiss(category);
  }

  async onSave() {
    const toast = await this.toastController.create({
      duration: 2000,
    });
    if (this.parentId) {
      this.categoryService.isUniqueSubName(this.category, this.parentId).then((res) => {
        if (res.success) {
          this.categoryService.updateSubCategory(this.category, this.parentId);
          toast.message = '修改成功';
          toast.present();
          this.dismiss(this.category);
        } else {
          toast.message = res.error.message;
          toast.present();
        }
      });
    } else {
      this.categoryService.isUniqueName(this.category).then((res) => {
        if (res.success) {
          this.categoryService.updateCategory(this.category);
          toast.message = '修改成功';
          toast.present();
          this.dismiss(this.category);
        } else {
          toast.message = res.error.message;
          toast.present();
        }
      });
    }
  }


}
