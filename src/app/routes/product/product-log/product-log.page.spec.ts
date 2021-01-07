import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductLogPage } from './product-log.page';

describe('ProductLogPage', () => {
  let component: ProductLogPage;
  let fixture: ComponentFixture<ProductLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
