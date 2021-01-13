import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCourseComponent } from './exam-course.component';

describe('ExamCourseComponent', () => {
  let component: ExamCourseComponent;
  let fixture: ComponentFixture<ExamCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
