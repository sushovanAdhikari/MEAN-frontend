import { TestBed } from '@angular/core/testing';

import { JWTService } from './jwt.service';

describe('JWTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JWTService = TestBed.get(JWTService);
    expect(service).toBeTruthy();
  });
});
