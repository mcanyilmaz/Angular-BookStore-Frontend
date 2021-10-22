import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookCommentsComponent } from './user-book-comments.component';

describe('UserBookCommentsComponent', () => {
  let component: UserBookCommentsComponent;
  let fixture: ComponentFixture<UserBookCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
