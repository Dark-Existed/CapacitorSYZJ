import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StockLog } from 'src/app/shared/class/stock-log';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { StockService } from './stock.service';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.page.html',
  styleUrls: ['./product-stock.page.scss'],
})
export class ProductStockPage implements OnInit {

  private increOrDecre = 'IncreaseStock';
  private product: Product;
  private change: number;
  private remark: string;
  private inputDescribe = {
    IncreaseStock: '入库数量',
    DecreaseStock: '出库数量',
  };
  private buttonDescribe = {
    IncreaseStock: '确定入库',
    DecreaseStock: '确定出库',
  };


  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private stockService: StockService,
    private productService: ProductService,
  ) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.product = this.productService.getProductByBarcode(queryParams.barcode);
    });
  }

  ngOnInit() {
  }

  async onConfirm() {

    const stockLog = new StockLog();
    const toast = await this.toastController.create({
      duration: 2000,
    });

    if (this.increOrDecre === 'IncreaseStock') {
      stockLog.type = '入库';

    } else {
      stockLog.type = '出库';
      this.change = -this.change;

    }
  }

}
