import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFeedbacksComponent } from './r-feedbacks.component';

describe('RFeedbacksComponent', () => {
  let component: RFeedbacksComponent;
  let fixture: ComponentFixture<RFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RFeedbacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
