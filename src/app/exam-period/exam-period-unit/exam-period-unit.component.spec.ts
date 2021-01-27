import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPeriodUnitComponent } from './exam-period-unit.component';

describe('ExamPeriodUnitComponent', () => {
  let component: ExamPeriodUnitComponent;
  let fixture: ComponentFixture<ExamPeriodUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamPeriodUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamPeriodUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
