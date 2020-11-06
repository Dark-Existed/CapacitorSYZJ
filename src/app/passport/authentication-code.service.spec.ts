import { TestBed } from '@angular/core/testing';

import { AuthenticationCodeService } from './authentication-code.service';

describe('AuthenticationCodeService', () => {
  let service: AuthenticationCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
