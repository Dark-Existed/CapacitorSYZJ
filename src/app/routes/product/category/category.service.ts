import { compileInjector } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { CATEGORY_KEY, LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Category } from './category';
import { CATEGORIES } from './mock.categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  async getAll(): Promise<AjaxResult> {
    const categories: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    return new AjaxResult(true, categories);
  }

  initCategory(id: number, name: string) {
    const category = new Category();
    const childCategory = new Category();
    if (id === 0) {
      category.id = this.getCategoryLength() + 1;
      category.name = '';
      category.children = [];
      childCategory.id = category.id * 10 + 1;
      childCategory.name = '';
      childCategory.children = [];
      category.children.push(childCategory);
    } else {
      category.id = id;
      category.name = name;
      category.children = [];
      childCategory.id = category.id * 10 + this.getSubCategoryLength(id) + 1;
      childCategory.name = '';
      childCategory.children = [];
      category.children.push(childCategory);
    }
    return category;
  }

  getCategoryLength(): number {
    const categotyList = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    return categotyList.length;
  }

  getSubCategoryLength(id: number): number {
    const categotyList: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    return categotyList[id - 1].children.length;
  }

  updateCategories(caterories: Category[]) {
    this.localStorageService.set(CATEGORY_KEY, caterories);
  }

}
