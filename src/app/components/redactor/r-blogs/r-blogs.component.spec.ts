import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RBlogsComponent } from './r-blogs.component';

describe('RBlogsComponent', () => {
  let component: RBlogsComponent;
  let fixture: ComponentFixture<RBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
