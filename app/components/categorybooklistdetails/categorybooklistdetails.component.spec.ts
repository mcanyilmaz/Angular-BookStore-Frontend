import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorybooklistdetailsComponent } from './categorybooklistdetails.component';

describe('CategorybooklistdetailsComponent', () => {
  let component: CategorybooklistdetailsComponent;
  let fixture: ComponentFixture<CategorybooklistdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorybooklistdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorybooklistdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
