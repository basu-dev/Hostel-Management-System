/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessService } from './mess.service';

describe('Service: Mess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessService]
    });
  });

  it('should ...', inject([MessService], (service: MessService) => {
    expect(service).toBeTruthy();
  }));
});
