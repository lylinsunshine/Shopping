import { TestBed } from '@angular/core/testing';

import { ClientCategoryService } from './client-category.service';

describe('ClientCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientCategoryService = TestBed.get(ClientCategoryService);
    expect(service).toBeTruthy();
  });
});
