/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UiServiceService } from './ui-service.service';

describe('Service: UiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiServiceService]
    });
  });

  it('should ...', inject([UiServiceService], (service: UiServiceService) => {
    expect(service).toBeTruthy();
  }));
});
