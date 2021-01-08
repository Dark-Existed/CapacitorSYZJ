import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { StockLog } from 'src/app/shared/class/stock-log';
import { Supplier } from 'src/app/shared/class/supplier';
import { LocalStorageService, PRODUCT_KEY } from 'src/app/shared/services/local-storage.service';
import { CategoryService } from './category/category.service';
import { Product } from './product';
import { StockService } from './product-stock/stock.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private localStorageService: LocalStorageService,
    private categoryService: CategoryService,
    private stockService: StockService,
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

  async getList(products: Product[], index: number, size: number): Promise<AjaxResult> {
    if (index < 0) {
      return new AjaxResult(false, {});
    }
    if (size < 0) {
      return new AjaxResult(false, {});
    }
    if (products.length === 0) {
      return new AjaxResult(true, {
        total: 0,
        products
      });
    }
    const currentProductList = products.slice(index * size, (index + 1) * size);
    return new AjaxResult(true, {
      total: currentProductList.length,
      currentProductList
    });
  }

  getTotalStorageNum(products: Product[]): number {
    let totalStorageNum = 0;
    for (const product of products) {
      totalStorageNum += product.stock;
    }
    return totalStorageNum;
  }

  getTotalPrice(products: Product[]): number {
    let totalPrice = 0;
    for (const product of products) {
      totalPrice += product.purchasePrice;
    }
    return totalPrice;
  }

  async getListByCondition(searchProductInput: any): Promise<AjaxResult> {
    const productList: Product[] = this.localStorageService.get(PRODUCT_KEY, []);
    const result = [];
    for (const product of productList) {
      if (product.name.toString().indexOf(searchProductInput) !== -1 ||
        product.barcode.toString().indexOf(searchProductInput) !== -1) {
        result.push(product);
      }
    }
    return new AjaxResult(true, result);
  }

  async getListByCategoryId(categoryId: number): Promise<AjaxResult> {
    const productList: Product[] = this.localStorageService.get(PRODUCT_KEY, []);
    const result = [];
    for (const product of productList) {
      if (product.categoryId === categoryId) {
        result.push(product);
      }
    }
    return new AjaxResult(true, result);
  }

  getProductByBarcode(barcode: string): Product {
    const productList = this.localStorageService.get(PRODUCT_KEY, []);
    for (const product of productList) {
      if (product.barcode === barcode) {
        return product;
      }
    }
    return null;
  }

  deleteProductByBarcode(barcode: string): boolean {
    let products: Product[] = this.localStorageService.get(PRODUCT_KEY, []);
    if (products === null || products.length === 0) {
      return false;
    }
    products = products.filter((item) => item.barcode !== barcode);
    this.localStorageService.set(PRODUCT_KEY, products);
    return true;
  }

  updateProdect(product: Product) {
    const products: Product[] = this.localStorageService.get(PRODUCT_KEY, []);
    for (let p of products) {
      if (p.barcode === product.barcode) {
        p.stock = product.stock;
        break;
      }
    }
    this.localStorageService.set(PRODUCT_KEY, products);
  }

  async updateProductStock(productBarcode: string, change: number, remark: string): Promise<AjaxResult> {
    const product = this.getProductByBarcode(productBarcode);
    if (change < 0) {
      if (product.stock + change < 0) {
        return new AjaxResult(false, null, { message: '出库数量不能大于库存', details: '' });
      } else {
        product.stock += change;
        this.updateProdect(product);

        const stockLog = new StockLog();
        stockLog.productBarcode = product.barcode;
        stockLog.type = '出库';
        stockLog.change = change;
        stockLog.sum = product.stock;
        stockLog.time = new Date();
        stockLog.remark = remark;
        this.stockService.insertSrockLog(stockLog);

        return new AjaxResult(true, product);
      }
    } else {
      product.stock += change;
      this.updateProdect(product);

      const stockLog = new StockLog();
      stockLog.productBarcode = product.barcode;
      stockLog.type = '入库';
      stockLog.change = change;
      stockLog.sum = product.stock;
      stockLog.time = new Date();
      stockLog.remark = remark;
      this.stockService.insertSrockLog(stockLog);

      return new AjaxResult(true, product);
    }

  }

}

