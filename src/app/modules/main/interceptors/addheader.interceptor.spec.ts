import { TestBed } from '@angular/core/testing';

import { AddheaderInterceptor } from './addheader.interceptor';

describe('AddheaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddheaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddheaderInterceptor = TestBed.inject(AddheaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
