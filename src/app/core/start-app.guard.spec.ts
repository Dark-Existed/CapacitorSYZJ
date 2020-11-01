import { TestBed } from '@angular/core/testing';

import { StartAppGuard } from './start-app.guard';

describe('StartAppGuard', () => {
  let guard: StartAppGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StartAppGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
