import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorybooklistComponent } from './categorybooklist.component';

describe('CategorybooklistComponent', () => {
  let component: CategorybooklistComponent;
  let fixture: ComponentFixture<CategorybooklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorybooklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorybooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
