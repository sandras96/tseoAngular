import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPeriodViewComponent } from './exam-period-view.component';

describe('ExamPeriodViewComponent', () => {
  let component: ExamPeriodViewComponent;
  let fixture: ComponentFixture<ExamPeriodViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPeriodViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPeriodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
