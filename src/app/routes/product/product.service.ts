import { Injectable } from '@angular/core';
import { LocalStorageService, PRODUCT_KEY } from 'src/app/shared/services/local-storage.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  uuid(): string {
    const tempUrl = URL.createObjectURL(new Blob());
    const uuid = tempUrl.toString();
    URL.revokeObjectURL(tempUrl);
    return uuid.substr(uuid.lastIndexOf('/') + 1);
  }

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

}
