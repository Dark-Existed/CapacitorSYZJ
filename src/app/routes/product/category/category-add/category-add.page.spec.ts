import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryAddPage } from './category-add.page';

describe('CategoryAddPage', () => {
  let component: CategoryAddPage;
  let fixture: ComponentFixture<CategoryAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
