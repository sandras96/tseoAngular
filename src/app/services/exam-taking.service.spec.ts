import { TestBed } from '@angular/core/testing';

import { ExamTakingService } from './exam-taking.service';

describe('ExamTakingService', () => {
  let service: ExamTakingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamTakingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
