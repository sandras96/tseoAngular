import { TestBed } from '@angular/core/testing';

import { CourseGuardService } from './course-guard.service';

describe('CourseGuardService', () => {
  let service: CourseGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
