import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPeriodExamsComponent } from './exam-period-exams.component';

describe('ExamPeriodExamsComponent', () => {
  let component: ExamPeriodExamsComponent;
  let fixture: ComponentFixture<ExamPeriodExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPeriodExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPeriodExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
