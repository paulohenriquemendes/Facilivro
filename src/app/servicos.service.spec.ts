import { TestBed } from '@angular/core/testing';

import { ServicosService } from './servicos.service';

describe('ServicosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicosService = TestBed.get(ServicosService);
    expect(service).toBeTruthy();
  });
});
