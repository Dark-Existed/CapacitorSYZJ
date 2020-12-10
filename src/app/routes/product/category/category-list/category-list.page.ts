import { Component, OnInit } from '@angular/core';
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
    private activateSubCategories: Category[];
    private activateSubCategory: Category;

    constructor(
        private categoryService: CategoryService,
        private actionSheetController: ActionSheetController
    ) {
        categoryService.getAll().then((data) => {
            this.categories = data.result;
            if (this.categories) {
                this.activateCategory = this.categories[0];
                this.activateSubCategories = this.activateCategory.children;
                console.log(this.activateSubCategories.length);
            }
        });
    }

    ngOnInit() {
    }

    onSelectedCategory(category: Category) {
        this.activateCategory = category;
        this.activateSubCategories = this.activateCategory.children;
        // console.log(this.activateSubCategories.length);
    }

    onSelectedSubCategory(category: Category) {
        this.activateCategory = category;
    }

    async onPresentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: '选择您的操作',
            buttons: [
                {
                    text: '新增小分类',
                    role: 'destructive',
                    handler: () => {
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: '编辑分类',
                    handler: () => { console.log('Archive clicked'); }
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
