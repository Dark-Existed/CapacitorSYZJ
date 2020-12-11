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
      category.id = this.getCategoryLength();
    } else {

    }
  }

  getCategoryLength(): number {
    const categotyList = this.localStorageService.get(CATEGORY_KEY, []);
    return categotyList.length;
  }


}
