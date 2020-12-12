import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  async presentModal(category: Category) {
    const modal = await this.modalController.create({
      component: CategoryNameEditPage,
      componentProps: { value: category }
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    const data = await this.presentModal(this.category);
    console.log(typeof data);
    console.log(data);
    if (data) {

    }
  }

  onParentCategoryDelete(item: IonItemSliding) {
    item.close();

  }

  async onEditSubCategoryName(item: IonItemSliding, category: Category) {
    console.log('2');
    item.close();
    const data = await this.presentModal(category);
    if (data) {

    }
  }

  onSubCategoryDelete(item: IonItemSliding, category: Category) {
    item.close();

  }

}
