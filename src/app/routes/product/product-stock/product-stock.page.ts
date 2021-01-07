import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.page.html',
  styleUrls: ['./product-stock.page.scss'],
})
export class ProductStockPage implements OnInit {

  private increOrDecre = 'IncreaseStorage';
  private product: Product;
  private num: number;
  private remark: string;
  private inputDescribe = {
    IncreaseStorage: '入库数量',
    DecreaseStorage: '出库数量',
  };
  private buttonDescribe = {
    IncreaseStorage: '确定入库',
    DecreaseStorage: '确定出库',
  };


  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.product = this.productService.getProductByBarcode(queryParams.barcode);
    });
  }

  ngOnInit() {
  }

  async onConfirm() {

  }

}
