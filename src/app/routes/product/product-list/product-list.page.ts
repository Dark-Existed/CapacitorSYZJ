import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  private currentIndex: number;   // 当前页码，显示哪一页的商品数据
  private products: Product[];    // 存放商品数据
  private currentProduct: Product[];
  private total: number;          // 商品总记录数
  private queryTerm: string;      // 查询条件
  private categoryId: number;     // 类别编号，用于保存用户选择的类别，初始值为-1
  private totalStorageNum: number;  // 总库存数
  private totalPrice: number;       // 总成本
  private isAddProduct: boolean;    // 是否在当前页面点击新增商品
  private productCount: number;
  private isBackFromCategoryList: boolean;

  subscription: Subscription;


  constructor(
    private loadingController: LoadingController,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastController: ToastController,
    private router: Router,
  ) {
    this.categoryId = -1;
    this.currentIndex = 0;
    this.productCount = 0;
    this.isBackFromCategoryList = false;
    this.isAddProduct = false;
    this.subscription = this.categoryService.watchCategory().subscribe(
      (activateCategory) => {
        this.categoryId = activateCategory.id;
      }, (error) => {
        console.log(error);
      }
    );
  }

  ionViewWillEnter() {
    if (!this.isBackFromCategoryList) {
      this.isBackFromCategoryList = false;
      this.loadData();
    }
  }

  ngOnInit() {
  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: '数据加载中',
      spinner: 'bubbles'
    });
    loading.present();
    this.products = this.productService.getProducts();
    this.total = this.products.length;
    this.currentIndex = 0;
    this.productService.getList(this.products, this.currentIndex, 10).then((res) => {
      if (res.success) {
        this.productCount = res.result.total;
        this.currentProduct = res.result.currentProductList;
        this.totalPrice = this.productService.getTotalPrice(this.products);
        this.totalStorageNum = this.productService.getTotalStorageNum(this.products);
      }
    });
    loading.dismiss();
  }

  async onInput(event) {
    const condition = event.target.value;
    if (condition === '') {
      this.ionViewWillEnter();
    } else {
      this.currentIndex = 0;
      this.productService.getListByCondition(condition).then((res) => {
        if (res.success) {
          this.products = res.result;
        }
      });
    }

    this.productService.getList(this.products, this.currentIndex, 10).then((res) => {
      if (res.success) {
        this.productCount = res.result.total;
        this.currentProduct = res.result.currentProductList;
        this.totalPrice = this.productService.getTotalPrice(this.products);
        this.totalStorageNum = this.productService.getTotalStorageNum(this.products);
      }
    });

  }

  async onRefresh(event) {
    this.currentIndex = 0;
    this.productService.getList(this.products, this.currentIndex, 10).then((res) => {
      if (res.success) {
        this.productCount = res.result.total;
        this.currentProduct = res.result.currentProductList;
        this.totalPrice = this.productService.getTotalPrice(this.products);
        this.totalStorageNum = this.productService.getTotalStorageNum(this.products);
      }
    });
    event.target.complete();
  }

  async onInfinite(event) {
    const infiniteScroll = event.target;
    this.currentIndex++;
    setTimeout(async () => {
      if (this.productCount !== this.products.length) {
        this.productService.getList(this.products, this.currentIndex, 10).then((res) => {
          if (res.success) {
            this.currentProduct = this.currentProduct.concat(res.result.currentProductList);
            this.totalPrice = this.productService.getTotalPrice(this.products);
            this.totalStorageNum = this.productService.getTotalStorageNum(this.products);
            this.productCount += res.result.total;
          }
        });
      }
    });
  }


  getListByCategoryId() {
    this.currentIndex = 0;
    this.productService.getListByCategoryId(this.categoryId).then((getListByCategoryIdResult) => {
      if (getListByCategoryIdResult.success) {
        this.products = getListByCategoryIdResult.result;
        this.productService.getList(this.products, this.currentIndex, 10).then((res) => {
          if (res.success) {
            this.productCount = res.result.total;
            this.currentProduct = res.result.currentProductList;
            this.totalPrice = this.productService.getTotalPrice(this.products);
            this.totalStorageNum = this.productService.getTotalStorageNum(this.products);
          }
        });
      }
    });
  }

  onAddProduct() {
    this.isAddProduct = true;
    this.router.navigateByUrl('/product-add');
  }

  searchByCategory() {
    this.isAddProduct = false;
    this.router.navigate(['/category/category-list'], {
      queryParams: {
        id: 0
      }
    });
  }

}
