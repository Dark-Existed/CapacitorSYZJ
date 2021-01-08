import { Injectable } from '@angular/core';
import { StockLog } from 'src/app/shared/class/stock-log';
import { LocalStorageService, STOCKLOG_KEY } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private localStorageService: LocalStorageService,
  ) { }


  insertSrockLog(stockLog: StockLog) {
    const stockLogs: StockLog[] = this.localStorageService.get(STOCKLOG_KEY, []);
    stockLogs.push(stockLog);
    this.localStorageService.set(STOCKLOG_KEY, stockLogs);
  }

  getStockLogsByBarcode(barcode: string): StockLog[] {
    let stockLogs: StockLog[] = this.localStorageService.get(STOCKLOG_KEY, []);
    stockLogs = stockLogs.filter((item) => item.productBarcode === barcode);
    return stockLogs;
  }

}
