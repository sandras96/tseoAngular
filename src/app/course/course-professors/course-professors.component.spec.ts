import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProfessorsComponent } from './course-professors.component';

describe('CourseProfessorsComponent', () => {
  let component: CourseProfessorsComponent;
  let fixture: ComponentFixture<CourseProfessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseProfessorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProfessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
