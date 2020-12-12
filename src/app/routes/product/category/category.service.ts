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
    const categoryList = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    return categoryList.length;
  }

  getSubCategoryLength(id: number): number {
    const categoryList: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    return categoryList[id - 1].children.length;
  }

  updateCategories(caterories: Category[]) {
    this.localStorageService.set(CATEGORY_KEY, caterories);
  }

  getCategory(id: number) {
    const categotyList: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    for (const caterory of categotyList) {
      if (caterory.id === id) {
        return caterory;
      }
    }
    return null;
  }

  async isUniqueName(category: Category) {
    const categoryList: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    if (category.name.match(/^\s*$/)) {
      return new AjaxResult(false, null, {
        message: '大类名不能为空',
        details: null
      });
    }
    for (const c of categoryList) {
      if (category.name === c.name) {
        return new AjaxResult(false, null, {
          message: '该大类名已存在',
          details: null
        });
      }
    }
    return new AjaxResult(true, null);
  }

  async isUniqueChildName(category: Category): Promise<AjaxResult> {
    const categoryLocal = this.getCategory(category.id);
    for (const c of category.children) {
      if (c.name.match(/^\s*$/)) {
        return new AjaxResult(false, null, {
          message: '存在空白小类名，请重新输入',
          details: null,
        });
      }
    }
    for (const cl of categoryLocal.children) {
      for (const c of category.children) {
        if (c.name === cl.name) {
          return new AjaxResult(false, null, {
            message: '小类名存在重复',
            details: null
          });
        }
      }
    }
    return new AjaxResult(true, null);
  }

  async isUniqueSubName(category: Category, parentId: number): Promise<AjaxResult> {
    if (category.name.match(/^\s*$/)) {
      return new AjaxResult(false, null, {
        message: '小类名不能为空',
        details: null,
      });
    }
    const categories: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    const categoryLocal = categories[parentId - 1];
    for (const c of categoryLocal.children) {
      if (category.id !== c.id && category.name === c.name) {
        return new AjaxResult(false, null, {
          message: '小类名存在重复',
          details: null
        });
      }
    }
    return new AjaxResult(true, null);
  }

  isIdExisted(category: Category) {
    const categories: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    for (const c of categories) {
      if (c.id === category.id) {
        return true;
      }
    }
    return false;
  }

  insertCategory(category: Category) {
    const categories: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    if (this.isIdExisted(category)) {
      console.log(category.id);
      console.log(categories[category.id - 1].id);
      categories[category.id - 1].children = categories[category.id - 1].children.concat(category.children);
    } else {
      categories.push(category);
    }
    this.localStorageService.set(CATEGORY_KEY, categories);
  }

  updateCategory(category: Category) {
    const categories: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    for (const c of categories) {
      if (c.id === category.id) {
        c.name = category.name;
        break;
      }
    }
    this.localStorageService.set(CATEGORY_KEY, categories);
  }

  updateSubCategory(category: Category, parentId: number) {
    const categories: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    for (const c of categories[parentId - 1].children) {
      if (c.id === category.id) {
        c.name = category.name;
        break;
      }
    }
    this.localStorageService.set(CATEGORY_KEY, categories);
  }

  deleteCategory(caterogy: Category) {
    let categories: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    categories = categories.filter((item) => item.id !== caterogy.id);
    for (let index = 0; index < categories.length; index++) {
      const c = categories[index];
      c.id = index + 1;
    }
    for (const c of categories) {
      for (let j = 0; j < c.children.length; j++) {
        const cSub = c.children[j];
        cSub.id = c.id * 10 + j + 1;
      }
    }
    this.localStorageService.set(CATEGORY_KEY, categories);
  }

  deleteSubCategory(caterogy: Category, parentCategory: Category) {
    const categories: Category[] = this.localStorageService.get(CATEGORY_KEY, CATEGORIES);
    parentCategory.children = parentCategory.children.filter(item => item.id !== caterogy.id);
    for (let index = 0; index < parentCategory.children.length; index++) {
      const c = parentCategory.children[index];
      c.id = parentCategory.id * 10 + index + 1;
    }
    categories[parentCategory.id - 1] = parentCategory;
    this.localStorageService.set(CATEGORY_KEY, categories);
  }

}
