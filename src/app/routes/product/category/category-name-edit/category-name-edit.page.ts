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

  constructor(
    private modalController: ModalController,
    private navParms: NavParams,
    private categoryService: CategoryService,
    private toastController: ToastController,
  ) {
    this.category = navParms.data.value;
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

  }

}
