import { TestBed } from '@angular/core/testing';

import { CourseAttendanceService } from './course-attendance.service';

describe('CourseAttendanceService', () => {
  let service: CourseAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
