import { TestBed } from '@angular/core/testing';

import { ResultGuardGuard } from './result-guard.guard';

describe('ResultGuardGuard', () => {
  let guard: ResultGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResultGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
