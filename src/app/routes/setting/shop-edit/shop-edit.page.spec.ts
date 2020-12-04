import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopEditPage } from './shop-edit.page';

describe('ShopEditPage', () => {
  let component: ShopEditPage;
  let fixture: ComponentFixture<ShopEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
