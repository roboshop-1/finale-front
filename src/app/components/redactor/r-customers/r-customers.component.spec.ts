import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCustomersComponent } from './r-customers.component';

describe('RCustomersComponent', () => {
  let component: RCustomersComponent;
  let fixture: ComponentFixture<RCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
