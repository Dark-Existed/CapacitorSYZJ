import { Injectable } from '@angular/core';
import { Supplier } from 'src/app/shared/class/supplier';
import { LocalStorageService, PRODUCT_KEY } from 'src/app/shared/services/local-storage.service';
import { CategoryService } from './category/category.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private localStorageService: LocalStorageService,
    private categoryService: CategoryService,
  ) { }

  getProducts(): Product[] {
    const products: Product[] = this.localStorageService.get(PRODUCT_KEY, []);
    return products;
  }

  insert(product: Product) {
    const products: Product[] = this.localStorageService.get(PRODUCT_KEY, []);
    products.push(product);
    this.localStorageService.set(PRODUCT_KEY, products);
  }

  autoIncrementId(array: Product[]): number {
    return array.length + 1;
  }

  setParentCategoryIdByName(product: Product, name = '默认类别'): void {
    const id = this.categoryService.getParentCategoryIdByName(name);
    if (id !== -1) {
      product.categoryName = name;
      product.categoryId = id;
    }
  }

  resetProdect(product: Product) {
    product.id = product.uuid();
    product.name = '';
    this.setParentCategoryIdByName(product);
    product.barcode = '';
    product.images = [];
    product.sellPrice = null;
    product.purchasePrice = null;
    product.stock = null;
    product.specification = '';
    product.supplier = {
      name: null,
      phone: null
    };
    product.remark = '';
  }

}
