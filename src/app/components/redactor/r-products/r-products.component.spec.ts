import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RProductsComponent } from './r-products.component';

describe('RProductsComponent', () => {
  let component: RProductsComponent;
  let fixture: ComponentFixture<RProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
