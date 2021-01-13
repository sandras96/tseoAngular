import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUnitComponent } from './exam-unit.component';

describe('ExamUnitComponent', () => {
  let component: ExamUnitComponent;
  let fixture: ComponentFixture<ExamUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
