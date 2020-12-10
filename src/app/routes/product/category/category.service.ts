import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
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
    const categories: Category[] = this.localStorageService.get('Category', CATEGORIES);
    return new AjaxResult(true, categories);
  }


}
