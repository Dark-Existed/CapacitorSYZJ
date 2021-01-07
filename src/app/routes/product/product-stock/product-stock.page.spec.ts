import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductStockPage } from './product-stock.page';

describe('ProductStockPage', () => {
  let component: ProductStockPage;
  let fixture: ComponentFixture<ProductStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
