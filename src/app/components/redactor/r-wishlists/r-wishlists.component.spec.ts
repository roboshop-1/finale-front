import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RWishlistsComponent } from './r-wishlists.component';

describe('RWishlistsComponent', () => {
  let component: RWishlistsComponent;
  let fixture: ComponentFixture<RWishlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RWishlistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RWishlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
