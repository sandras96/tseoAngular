import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRegisteredComponent } from './exam-registered.component';

describe('ExamRegisteredComponent', () => {
  let component: ExamRegisteredComponent;
  let fixture: ComponentFixture<ExamRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamRegisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
