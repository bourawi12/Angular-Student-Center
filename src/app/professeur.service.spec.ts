import { TestBed } from '@angular/core/testing';

import { ProfesseurService } from '../Service/professeur.service';

describe('ProfesseurService', () => {
  let service: ProfesseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
