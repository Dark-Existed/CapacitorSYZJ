import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockLog } from 'src/app/shared/class/stock-log';
import { Product } from '../product';
import { StockService } from '../product-stock/stock.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-log',
  templateUrl: './product-log.page.html',
  styleUrls: ['./product-log.page.scss'],
})
export class ProductLogPage implements OnInit {

  private product: Product;
  private stockLogs: StockLog[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockService: StockService,
    private productService: ProductService,
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.stockLogs = this.stockService.getStockLogsByBarcode(queryParams.barcode);
      this.product = this.productService.getProductByBarcode(queryParams.barcode);
    });
  }

  ngOnInit() {
  }

}
