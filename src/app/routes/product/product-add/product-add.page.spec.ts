import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductAddPage } from './product-add.page';

describe('ProductAddPage', () => {
  let component: ProductAddPage;
  let fixture: ComponentFixture<ProductAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
