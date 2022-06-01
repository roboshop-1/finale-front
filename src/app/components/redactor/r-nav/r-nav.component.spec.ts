import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RNavComponent } from './r-nav.component';

describe('RNavComponent', () => {
  let component: RNavComponent;
  let fixture: ComponentFixture<RNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
