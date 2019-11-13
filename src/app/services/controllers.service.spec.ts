import { TestBed } from '@angular/core/testing';

import { ControllersService } from './controllers.service';

describe('ControllersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControllersService = TestBed.get(ControllersService);
    expect(service).toBeTruthy();
  });
});
