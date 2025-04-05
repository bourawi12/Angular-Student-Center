import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeFormComponent } from './groupe-form.component';

describe('GroupeFormComponent', () => {
  let component: GroupeFormComponent;
  let fixture: ComponentFixture<GroupeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupeFormComponent]
    });
    fixture = TestBed.createComponent(GroupeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
