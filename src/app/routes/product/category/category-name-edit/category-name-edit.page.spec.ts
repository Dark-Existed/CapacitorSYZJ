import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryNameEditPage } from './category-name-edit.page';

describe('CategoryNameEditPage', () => {
  let component: CategoryNameEditPage;
  let fixture: ComponentFixture<CategoryNameEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryNameEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryNameEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
